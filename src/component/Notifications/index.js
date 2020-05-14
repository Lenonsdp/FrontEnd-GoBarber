import React, { useState, useEffect, useMemo } from 'react';
import { MdNotifications } from 'react-icons/md';
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';
import api from '../../services/api';

import {
    Container,
    Badge,
    NotificationList,
    Scroll,
    Notification,
} from './styles';

export default function Notifications() {
    const [visible, setVisible] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const hasUnread = useMemo(
        () => !!notifications.find(notification => notification.read === false),
        [notifications]
    )

    useEffect(() => {
        async function loadNotifications() {
            const response = await api.get('notifications');

            const data = response.data.map((notificationsMap) => ({
                ...notificationsMap,
                timeDistance: formatDistance(
                    parseISO(notificationsMap.createdAt),
                    new Date(),
                    { addSuffix: true, locale: pt }
                ),
            }));
            setNotifications(data);
        }

        loadNotifications();
    }, []);

    function handleToggleVisible() {
        setVisible(!visible);
    }

    async function updateNotification(id) {
        await api.put(`notifications/${id}`);

        setNotifications(
            notifications.map(notifications =>             
                notifications._id == id ? { ...notifications, read: true } : notifications
            )
        );
    }

    return (
        <Container>
            <Badge onClick={handleToggleVisible} hasUnread={hasUnread}>
                <MdNotifications color="#7159c1" size={20} />
            </Badge>

            <NotificationList visible={visible}>
                <Scroll>
                    { notifications.map(notifications => (
                        <Notification key={notifications._id} unread={!notifications.read}>
                            <p>{notifications.content}</p>
                            <time>{notifications.timeDistance}</time>
                            {!notifications.read && (
                                <button onClick={() => updateNotification(notifications._id)} type="button">Marcar como lida</button>
                            )}
                        </Notification>
                    )) }
                </Scroll>
            </NotificationList>
        </Container>
    );
}
