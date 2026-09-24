import { describe, expect, it, vi } from 'vitest'
import { VirtualBadgeTransport } from '../src/domain/virtualBadge'

describe('VirtualBadgeTransport display controls', () => {
    it('requests an inline badge to expand', () => {
        const transport = new VirtualBadgeTransport('/vbadge/')
        const container = document.createElement('div')
        const shown = vi.fn()
        container.addEventListener('mpos-ide:vdevice:show', shown)
        transport.container = container

        transport.showBadge()

        expect(shown).toHaveBeenCalledOnce()
    })

    it('focuses a popped-out badge', () => {
        const transport = new VirtualBadgeTransport('/vbadge/')
        const focus = vi.fn()
        transport.popWindow = { focus } as unknown as Window

        transport.showBadge()

        expect(focus).toHaveBeenCalledOnce()
    })
})

describe('VirtualBadgeTransport skin selection', () => {
    it('defaults to the Fri3d Badge 2026 skin', () => {
        const transport = new VirtualBadgeTransport('/vbadge/index.html') as unknown as {
            skinnedUrl(extra?: string): string
        }
        expect(transport.skinnedUrl()).toBe('/vbadge/index.html?skin=fri3d-badge-2026')
    })

    it('passes the generic MicroPythonOS skin through as a query param', () => {
        const transport = new VirtualBadgeTransport('/vbadge/index.html', {
            skin: 'micropythonos',
        }) as unknown as { skinnedUrl(extra?: string): string }
        expect(transport.skinnedUrl()).toBe('/vbadge/index.html?skin=micropythonos')
    })

    it('appends extra params after the skin param', () => {
        const transport = new VirtualBadgeTransport('/vbadge/index.html', {
            skin: 'micropythonos',
        }) as unknown as { skinnedUrl(extra?: string): string }
        expect(transport.skinnedUrl('&popout=1&theme=dark')).toBe(
            '/vbadge/index.html?skin=micropythonos&popout=1&theme=dark',
        )
    })
})

