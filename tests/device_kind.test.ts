import { beforeEach, describe, expect, it } from 'vitest'
import { deviceKindFromHardwareId, getActiveDeviceKind, useDeviceKindStore } from '../src/stores/deviceKind'

describe('deviceKindFromHardwareId', () => {
    it('maps a missing mpos module to generic-micropython', () => {
        expect(deviceKindFromHardwareId(null)).toBe('generic-micropython')
    })

    it('maps the Fri3d Camp 2026 hardware id to fri3d-badge-2026', () => {
        expect(deviceKindFromHardwareId('fri3d_2026')).toBe('fri3d-badge-2026')
    })

    it('maps mpos without a recognized hardware id to micropythonos', () => {
        expect(deviceKindFromHardwareId('')).toBe('micropythonos')
        expect(deviceKindFromHardwareId('some_other_board')).toBe('micropythonos')
    })
})

describe('device kind store', () => {
    beforeEach(() => {
        useDeviceKindStore.setState({ virtualKind: 'fri3d-badge-2026', detectedRealKind: null })
    })

    it('defaults the virtual kind to the Fri3d Badge 2026 skin', () => {
        expect(useDeviceKindStore.getState().virtualKind).toBe('fri3d-badge-2026')
    })

    it('derives the active kind from the persisted virtual choice when no real device is connected', () => {
        useDeviceKindStore.getState().setVirtualKind('micropythonos')
        expect(getActiveDeviceKind()).toBe('micropythonos')
    })

    it('prefers the detected real device kind over the virtual choice', () => {
        useDeviceKindStore.getState().setVirtualKind('fri3d-badge-2026')
        useDeviceKindStore.getState().setDetectedRealKind('generic-micropython')
        expect(getActiveDeviceKind()).toBe('generic-micropython')
    })

    it('falls back to the virtual choice once the real device is cleared (e.g. on disconnect)', () => {
        useDeviceKindStore.getState().setDetectedRealKind('micropythonos')
        expect(getActiveDeviceKind()).toBe('micropythonos')

        useDeviceKindStore.getState().setDetectedRealKind(null)
        expect(getActiveDeviceKind()).toBe('fri3d-badge-2026')
    })
})
