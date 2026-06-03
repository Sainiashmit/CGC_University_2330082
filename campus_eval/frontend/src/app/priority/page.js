'use client';
import { useEffect, useState } from 'react';
import { Typography, Box, CircularProgress, Select, MenuItem, FormControl, InputLabel, Stack } from '@mui/material';
import { fetchNotifications } from '@/lib/api';
import NotificationCard from '@/components/NotificationCard';

const weights = { Placement: 3, Result: 2, Event: 1 };

export default function PriorityInbox() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [readIds, setReadIds] = useState(new Set());
  const [limit, setLimit] = useState(10);
  const [type, setType] = useState('All');

  useEffect(() => {
    let saved = localStorage.getItem('readNotifs');
    if (saved) {
      setReadIds(new Set(JSON.parse(saved)));
    }
  }, []);

  useEffect(() => {
    const getPriority = async () => {
      setIsLoading(true);
      let opts = { limit: 100 };
      if (type !== 'All') opts.notification_type = type;
      
      let res = await fetchNotifications(opts);
      
      let unread = res.filter(x => !readIds.has(x.ID));

      unread.sort((a, b) => {
        let wA = weights[a.Type] || 0;
        let wB = weights[b.Type] || 0;
        
        if (wA !== wB) return wB - wA;
        return new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime();
      });

      setItems(unread.slice(0, limit));
      setIsLoading(false);
    };

    getPriority();
  }, [limit, type, readIds]);

  const handleReadToggle = (id) => {
    setReadIds(old => {
      let updated = new Set(old);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      localStorage.setItem('readNotifs', JSON.stringify([...updated]));
      return updated;
    });
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Priority Inbox
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Top N</InputLabel>
          <Select value={limit} label="Top N" onChange={(e) => setLimit(e.target.value)}>
            <MenuItem value={5}>Top 5</MenuItem>
            <MenuItem value={10}>Top 10</MenuItem>
            <MenuItem value={20}>Top 20</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Filter</InputLabel>
          <Select value={type} label="Filter" onChange={(e) => setType(e.target.value)}>
            <MenuItem value="All">All Types</MenuItem>
            <MenuItem value="Placement">Placement</MenuItem>
            <MenuItem value="Result">Result</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      
      {isLoading ? (
        <CircularProgress sx={{ display: 'block', m: '20px auto' }} />
      ) : items.length === 0 ? (
        <Typography>No unread priority notifications found.</Typography>
      ) : (
        items.map(notif => (
          <NotificationCard 
            key={notif.ID} 
            notification={notif} 
            isRead={readIds.has(notif.ID)}
            onMarkRead={handleReadToggle}
          />
        ))
      )}
    </Box>
  );
}
