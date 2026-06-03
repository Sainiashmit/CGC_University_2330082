import { Log } from './logger';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzYWluaWFzaG1pdDY0QGdtYWlsLmNvbSIsImV4cCI6MTc4MDQ3ODY5NCwiaWF0IjoxNzgwNDc3Nzk0LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYzRlNDA5NTYtYjBlYS00MzQ0LWFkMDMtM2RjNmIwYzc4MzI3IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYXNobWl0IHNhaW5pIiwic3ViIjoiYzFiZGZmYTYtY2QzYi00YTFiLThhMmMtZmNmMzA2OGM2N2RkIn0sImVtYWlsIjoic2Fpbmlhc2htaXQ2NEBnbWFpbC5jb20iLCJuYW1lIjoiYXNobWl0IHNhaW5pIiwicm9sbE5vIjoiMjMzMDA4MiIsImFjY2Vzc0NvZGUiOiJud3dzS3giLCJjbGllbnRJRCI6ImMxYmRmZmE2LWNkM2ItNGExYi04YTJjLWZjZjMwNjhjNjdkZCIsImNsaWVudFNlY3JldCI6IlhjcVV6TmJVZnhDbVdrcEgifQ.R5XkkXwWMlHGqvTDMzGMdcFfG0MVmPDzVs55Hl5A-GI';
const base = 'http://4.224.186.213/evaluation-service';

export const fetchNotifications = async (opts = {}) => {
  const { limit, page, notification_type: type } = opts;
  
  let q = new URLSearchParams();
  if (limit) q.append('limit', limit);
  if (page) q.append('page', page);
  if (type) q.append('notification_type', type);

  let endpoint = `${base}/notifications?${q.toString()}`;
  
  Log('frontend', 'info', 'api', `Fetching notifications from ${endpoint}`);

  try {
    let req = await fetch(endpoint, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!req.ok) {
      Log('frontend', 'error', 'api', `request failed with status ${req.status}`);
      throw new Error(`request failed with status ${req.status}`);
    }

    let resData = await req.json();
    Log('frontend', 'info', 'api', `Successfully fetched ${resData.notifications?.length} notifications`);
    
    return resData.notifications || [];
  } catch (e) {
    Log('frontend', 'error', 'api', `Fetch failed: ${e.message}`);
    return [];
  }
};
