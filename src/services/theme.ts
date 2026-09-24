import { create } from 'zustand'
import { useSettingsStore } from '../stores/settings'

/*
 * Theme resolution: settings.colorTheme (system|light|dark) + OS preference
 * → single boolean, mirrored to <html data-theme> for Tailwind/CSS tokens.
 *
 * settings.uiStyle (fri3d|micropythonos) is a separate, user-chosen visual
 * skin (colors/borders/shadows/radius) mirrored to <html data-ui-style>. It
 * is independent from colorTheme and from the connected/selected device kind.
 */

interface ThemeStore {
    dark: boolean
}

const darkMQ = window.matchMedia('(prefers-color-scheme: dark)')

function resolveDark(pref: 'system' | 'light' | 'dark'): boolean {
    return pref === 'dark' || (pref === 'system' && darkMQ.matches)
}

export const useThemeStore = create<ThemeStore>(() => ({
    dark: resolveDark(useSettingsStore.getState().colorTheme),
}))

function apply(dark: boolean): void {
    useThemeStore.setState({ dark })
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
}

function applyUiStyle(uiStyle: 'fri3d' | 'micropythonos'): void {
    document.documentElement.setAttribute('data-ui-style', uiStyle)
}

/** Call once at bootstrap. */
export function initTheme(): void {
    apply(resolveDark(useSettingsStore.getState().colorTheme))
    applyUiStyle(useSettingsStore.getState().uiStyle)

    useSettingsStore.subscribe((state, prev) => {
        if (state.colorTheme !== prev.colorTheme) apply(resolveDark(state.colorTheme))
        if (state.uiStyle !== prev.uiStyle) applyUiStyle(state.uiStyle)
    })
    darkMQ.addEventListener('change', () => {
        if (useSettingsStore.getState().colorTheme === 'system') apply(darkMQ.matches)
    })
}

export function useThemeIsDark(): boolean {
    return useThemeStore((s) => s.dark)
}
