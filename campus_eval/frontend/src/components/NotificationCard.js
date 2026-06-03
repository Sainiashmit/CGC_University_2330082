'use client';
import { Card, CardContent, Typography, Box, IconButton, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

export default function NotificationCard({ notification, isRead, onMarkRead }) {
  let cColor = 'default';
  if (notification.Type === 'Placement') cColor = 'success';
  else if (notification.Type === 'Result') cColor = 'warning';
  else if (notification.Type === 'Event') cColor = 'info';

  return (
    <Card variant="outlined" sx={{ mb: 2, display: 'flex', alignItems: 'center', opacity: isRead ? 0.6 : 1 }}>
      <Box sx={{ p: 2 }}>
        <IconButton onClick={() => onMarkRead(notification.ID)} color={isRead ? 'success' : 'default'}>
          {isRead ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
        </IconButton>
      </Box>
      <CardContent sx={{ flex: 1, '&:last-child': { pb: 2 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Chip label={notification.Type} color={cColor} size="small" />
          <Typography variant="caption" color="text.secondary">
            {new Date(notification.Timestamp).toLocaleString()}
          </Typography>
        </Box>
        <Typography variant="body1" fontWeight={isRead ? 'normal' : 'bold'}>
          {notification.Message}
        </Typography>
      </CardContent>
    </Card>
  );
}
