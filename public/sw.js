self.addEventListener('push', function (event) {
    let data = { title: 'New application', body: '', url: '/admin' }
    try {
        if (event.data) data = event.data.json()
    } catch (e) {
        // ignore malformed payloads
    }

    event.waitUntil(
        self.registration.showNotification(data.title || 'New application', {
            body: data.body || '',
            icon: '/icon-192.png',
            badge: '/icon-192.png',
            data: { url: data.url || '/admin' },
            tag: data.applicationId || undefined,
        })
    )
})

self.addEventListener('notificationclick', function (event) {
    event.notification.close()
    const targetUrl = event.notification.data?.url || '/admin'

    event.waitUntil(
        self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            for (const client of clientList) {
                if (client.url.includes(targetUrl) && 'focus' in client) {
                    return client.focus()
                }
            }
            if (self.clients.openWindow) {
                return self.clients.openWindow(targetUrl)
            }
        })
    )
})
