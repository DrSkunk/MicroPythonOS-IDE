import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

/** The three device "workspaces" the IDE can target:
 *  - `generic-micropython`: plain MicroPython, no `mpos` module (real
 *    devices only — the virtual device always runs the MicroPythonOS build).
 *  - `micropythonos`: MicroPythonOS without a recognized hardware id.
 *  - `fri3d-badge-2026`: MicroPythonOS on the Fri3d Camp 2026 badge,
 *    identified via `mpos.DeviceInfo.get_hardware_id() === 'fri3d_2026'`. */
export type DeviceKind = 'generic-micropython' | 'micropythonos' | 'fri3d-badge-2026'

/** Kinds the virtual device picker can offer (it never runs plain
 *  MicroPython — the wasm build is always MicroPythonOS). */
export type VirtualDeviceKind = Extract<DeviceKind, 'micropythonos' | 'fri3d-badge-2026'>

/** Map a `mpos.DeviceInfo.get_hardware_id()` probe result to a `DeviceKind`.
 *  `hardwareId === null` means `mpos` isn't importable (plain MicroPython);
 *  `''`/unrecognized ids fall back to the generic MicroPythonOS kind. */
export function deviceKindFromHardwareId(hardwareId: string | null): DeviceKind {
    if (hardwareId === null) return 'generic-micropython'
    if (hardwareId === 'fri3d_2026') return 'fri3d-badge-2026'
    return 'micropythonos'
}

interface DeviceKindStore {
    /** User's choice of virtual device skin, persisted across sessions. */
    virtualKind: VirtualDeviceKind
    /** Kind detected on the currently connected real device, or `null` when
     *  no real device is connected (or detection hasn't completed yet). */
    detectedRealKind: DeviceKind | null
    setVirtualKind(kind: VirtualDeviceKind): void
    setDetectedRealKind(kind: DeviceKind | null): void
}

export const useDeviceKindStore = create<DeviceKindStore>()(
    persist(
        (set) => ({
            virtualKind: 'fri3d-badge-2026',
            detectedRealKind: null,
            setVirtualKind: (virtualKind) => set({ virtualKind }),
            setDetectedRealKind: (detectedRealKind) => set({ detectedRealKind }),
        }),
        {
            name: 'mpos-ide-device-kind',
            storage: createJSONStorage(() => localStorage),
            partialize: (s) => ({ virtualKind: s.virtualKind }),
        },
    ),
)

/** The device kind that should drive kind-scoped UI (templates, doc links,
 *  labels): the detected real device kind while one is connected, otherwise
 *  the user's persisted virtual device choice. */
export function getActiveDeviceKind(): DeviceKind {
    const { detectedRealKind, virtualKind } = useDeviceKindStore.getState()
    return detectedRealKind ?? virtualKind
}

/** Reactive hook version of {@link getActiveDeviceKind} for components. */
export function useActiveDeviceKind(): DeviceKind {
    return useDeviceKindStore((s) => s.detectedRealKind ?? s.virtualKind)
}
