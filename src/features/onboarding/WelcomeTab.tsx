import { Cable, Compass, MonitorSmartphone, PackagePlus, Store } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useConfirm, usePrompt } from '../../components/dialogs'
import { openChangelogTab } from '../../services/changelog.service'
import { connectDevice } from '../../services/device.service'
import { isConnectionActive, isConnectionPending, useConnectionStore } from '../../stores/connection'
import { useDeviceKindStore, type VirtualDeviceKind } from '../../stores/deviceKind'
import { AppLogo } from './AppLogo'
import { startOnboardingTask } from './GuidedTour'
import type { OnboardingTask } from './onboardingFlow'

/** VS Code-style Welcome "file": guided tour launchers + direct connect.
 *  Rendered as a closeable editor tab (kind: 'welcome'). */
export function WelcomeTab() {
    const { t } = useTranslation()
    const confirm = useConfirm()
    const prompt = usePrompt()
    const status = useConnectionStore((s) => s.status)
    const busy = isConnectionActive(status) || isConnectionPending(status)
    const virtualKind = useDeviceKindStore((s) => s.virtualKind)
    const setVirtualKind = useDeviceKindStore((s) => s.setVirtualKind)

    const deviceWorkspaces: Array<{ kind: VirtualDeviceKind; label: string }> = [
        { kind: 'micropythonos', label: t('device-kind.micropythonos', 'MicroPythonOS') },
        { kind: 'fri3d-badge-2026', label: t('device-kind.fri3d-badge-2026', 'Fri3d Badge 2026') },
    ]

    const tours: Array<{
        task: OnboardingTask
        icon: typeof Cable
        title: string
        description: string
    }> = [
        {
            task: 'build',
            icon: PackagePlus,
            title: t('onboarding.task-build', 'Build my first app'),
            description: t('onboarding.task-build-detail', 'Create, edit, save, and run a starter app.'),
        },
        {
            task: 'badgehub',
            icon: Store,
            title: t('onboarding.task-badgehub', 'Install an app from BadgeHub'),
            description: t('onboarding.task-badgehub-detail', 'Browse and install a compatible badge app.'),
        },
        {
            task: 'connect',
            icon: Cable,
            title: t('onboarding.task-connect', 'Connect my badge'),
            description: t('onboarding.task-connect-detail', 'Use USB to connect a physical device.'),
        },
        {
            task: 'virtual',
            icon: MonitorSmartphone,
            title: t('onboarding.task-virtual', 'Try the virtual device'),
            description: t('onboarding.task-virtual-detail', 'Explore MicroPythonOS without hardware.'),
        },
    ]

    const connectClass =
        'flex items-center justify-center gap-2 border-2 border-black bg-transparent px-3 py-1.5 text-sm font-semibold text-fg transition-colors hover:bg-black/10 disabled:opacity-60 dark:hover:bg-white/10'

    return (
        <div className="h-full overflow-y-auto bg-edit p-6">
            <div className="mx-auto max-w-2xl">
                <div className="flex items-center gap-4">
                    <AppLogo size={64} />
                    <div>
                        <h1 className="font-heading text-2xl font-black">
                            {t('welcome.title', 'Welcome to MicroPythonOS IDE')}
                        </h1>
                        <p className="mt-1 text-sm opacity-80">
                            {t('welcome.subtitle', 'MicroPython IDE for MicroPythonOS devices, including the Fri3d Camp badge.')}
                        </p>
                    </div>
                </div>

                <div className="mt-8 flex items-center gap-2">
                    <Compass size={18} aria-hidden />
                    <h2 className="font-heading text-lg font-black">
                        {t('welcome.tours-title', 'Guided tours')}
                    </h2>
                </div>
                <p className="mt-1 text-sm opacity-80">
                    {t('welcome.tours-text', 'Step-by-step tours that walk you through the IDE.')}
                </p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {tours.map(({ task, icon: Icon, title, description }, index) => (
                        <button
                            key={task}
                            type="button"
                            onClick={() => startOnboardingTask(task)}
                            className={`flex min-h-24 items-start gap-3 border-2 border-black p-3 text-left shadow-brutal transition-transform hover:brightness-110 active:translate-x-1 active:translate-y-1 active:shadow-none ${
                                index === 0 ? 'bg-(--brand-purple) text-white' : 'bg-menu text-fg'
                            }`}
                        >
                            <Icon size={21} className="mt-0.5 shrink-0" aria-hidden />
                            <span>
                                <span className="block font-semibold">{title}</span>
                                <span className="mt-1 block text-xs opacity-80">{description}</span>
                            </span>
                        </button>
                    ))}
                </div>

                <p className="mt-8 text-sm font-semibold opacity-80">
                    {t('welcome.or-connect', 'Or skip the tours and connect directly:')}
                </p>
                <div className="mt-3 flex flex-wrap gap-3">
                    <button
                        type="button"
                        disabled={busy}
                        onClick={() => void connectDevice('usb', { confirm, prompt })}
                        className={connectClass}
                    >
                        <Cable size={15} aria-hidden />
                        {t('app.connect-device', 'Connect device')}
                    </button>
                    <button
                        type="button"
                        disabled={busy}
                        onClick={() => void connectDevice('vm', { confirm, prompt })}
                        className={connectClass}
                    >
                        <MonitorSmartphone size={15} aria-hidden />
                        {t('tool.conn.vm', 'Connect to virtual device')}
                    </button>
                </div>

                <div className="mt-4">
                    <p className="text-xs font-semibold opacity-70">
                        {t('welcome.device-workspace', 'Device workspace')}
                    </p>
                    <p className="mt-0.5 text-xs opacity-60">
                        {t('welcome.device-workspace-hint', 'Choose which virtual device to run — switch anytime.')}
                    </p>
                    <div
                        role="group"
                        aria-label={t('welcome.device-workspace', 'Device workspace')}
                        className="mt-2 inline-flex overflow-hidden border-2 border-black"
                    >
                        {deviceWorkspaces.map(({ kind, label }) => (
                            <button
                                key={kind}
                                type="button"
                                aria-pressed={virtualKind === kind}
                                onClick={() => setVirtualKind(kind)}
                                className={`px-3 py-1.5 text-sm font-semibold transition-colors ${
                                    virtualKind === kind
                                        ? 'bg-(--brand-purple) text-white'
                                        : 'bg-transparent text-fg hover:bg-black/10 dark:hover:bg-white/10'
                                }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    type="button"
                    className="mt-8 text-sm text-fg-highlight underline opacity-80 hover:opacity-100"
                    onClick={openChangelogTab}
                >
                    {t('welcome.whats-new', "What's new in v{{version}}", { version: VIPER_IDE_VERSION })}
                </button>
            </div>
        </div>
    )
}
