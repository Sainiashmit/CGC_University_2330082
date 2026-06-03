'use client';
import { useEffect, useState } from 'react';
import { Typography, Box, CircularProgress, Button } from '@mui/material';
import { fetchNotifications } from '@/lib/api';
import NotificationCard from '@/components/NotificationCard';

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [readIds, setReadIds] = useState(new Set());
  const [currPage, setCurrPage] = useState(1);
  const [more, setMore] = useState(true);

  useEffect(() => {
    let saved = localStorage.getItem('readNotifs');
    if (saved) {
      setReadIds(new Set(JSON.parse(saved)));
    }
  }, []);

  const fetchItems = async (p) => {
    setLoading(true);
    let res = await fetchNotifications({ limit: 10, page: p });
    
    if (res.length < 10) setMore(false);
    
    if (p === 1) {
      setData(res);
    } else {
      setData(old => [...old, ...res]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems(currPage);
  }, [currPage]);

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
        All Notifications
      </Typography>
      
      {data.map(item => (
        <NotificationCard 
          key={item.ID} 
          notification={item} 
          isRead={readIds.has(item.ID)}
          onMarkRead={handleReadToggle}
        />
      ))}
      
      {loading && <CircularProgress sx={{ display: 'block', m: '20px auto' }} />}
      
      {!loading && more && (
        <Button variant="outlined" onClick={() => setCurrPage(p => p + 1)} fullWidth sx={{ mt: 2, mb: 4 }}>
          Load More
        </Button>
      )}

      {!more && !loading && (
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2, mb: 4 }}>
          No more notifications.
        </Typography>
      )}
    </Box>
  );
}
