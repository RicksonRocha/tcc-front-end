import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import { useSelector } from 'react-redux';
import {
  useGetUserNotificationsQuery,
  useDeleteNotificationMutation,
  useMarkAllNotificationsAsReadMutation,
  useGetUnreadNotificationCountQuery,
} from 'src/api/notifications';
import { fToNow } from 'src/utils/format-time';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

export default function NotificationsPopover() {
  const currentUser = useSelector((state) => state.auth?.auth?.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const [localNotifications, setLocalNotifications] = useState([]);
  const [markAllAsReadBackend] = useMarkAllNotificationsAsReadMutation();

  const { data: fetchedNotifications = [], refetch: refetchNotifications } =
    useGetUserNotificationsQuery(currentUser?.id, {
      skip: !currentUser,
    });

  const {
    data: unreadCount,
    isFetching: loadingUnread,
    refetch: refetchUnreadCount,
  } = useGetUnreadNotificationCountQuery(currentUser?.id, {
    skip: !currentUser,
  });

  useEffect(() => {
    if (fetchedNotifications.length) {
      setLocalNotifications(fetchedNotifications);
    }
  }, [fetchedNotifications]);

  useEffect(() => {
    if (currentUser) {
      refetchUnreadCount();
    }
  }, [currentUser, refetchUnreadCount]);

  const handleOpen = async (event) => {
    setAnchorEl(event.currentTarget);

    try {
      await markAllAsReadBackend(currentUser.id).unwrap();
      setLocalNotifications((prev) => prev.map((n) => ({ ...n, isUnRead: false })));
      await refetchUnreadCount();
      await refetchNotifications();
    } catch (error) {
      console.error('Erro ao marcar todas como lidas:', error);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLocalDelete = (id) => {
    setLocalNotifications((prev) => prev.filter((n) => n.id !== id));
    refetchUnreadCount();
  };

  return (
    <>
      <IconButton color={anchorEl ? 'primary' : 'default'} onClick={handleOpen}>
        <Badge
          badgeContent={
            loadingUnread || unreadCount === undefined || unreadCount === 0 ? null : unreadCount
          }
          color="error"
        >
          <Iconify width={24} icon="solar:bell-bing-bold-duotone" />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ sx: { mt: 1.5, ml: 0.75, width: 360 } }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notificações</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Você tem {unreadCount || 0} notificações não lidas
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                Novas
              </ListSubheader>
            }
          >
            {localNotifications.length > 0 ? (
              localNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onDelete={handleLocalDelete}
                />
              ))
            ) : (
              <Typography variant="body2" sx={{ p: 2, textAlign: 'center' }}>
                Nenhuma notificação encontrada.
              </Typography>
            )}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />
      </Popover>
    </>
  );
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    id: PropTypes.number,
    createdAt: PropTypes.string,
    message: PropTypes.string,
    nomeRemetente: PropTypes.string,
    isUnRead: PropTypes.bool,
  }).isRequired,
  onDelete: PropTypes.func,
};

function NotificationItem({ notification, onDelete }) {
  const [deleteNotification] = useDeleteNotificationMutation();

  const handleDelete = async () => {
    try {
      await deleteNotification(notification.id).unwrap();
      onDelete(notification.id);
    } catch (error) {
      console.error('Erro ao deletar notificação:', error);
    }
  };

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        ...(notification.isUnRead && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: '#1877F2', color: '#fff' }}>
            {notification.nomeRemetente?.charAt(0).toUpperCase() || '?'}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography component="span" variant="body2" sx={{ color: 'text.secondary', ml: 0 }}>
              {notification.message}
            </Typography>
          }
          secondary={
            <Typography
              variant="caption"
              sx={{
                mt: 0.5,
                display: 'flex',
                alignItems: 'center',
                color: 'text.disabled',
              }}
            >
              <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
              {fToNow(new Date(notification.createdAt))}
            </Typography>
          }
        />
      </Box>

      <Tooltip title="Excluir notificação">
        <IconButton edge="end" onClick={handleDelete} size="small">
          <Iconify icon="eva:close-fill" width={18} />
        </IconButton>
      </Tooltip>
    </ListItemButton>
  );
}
