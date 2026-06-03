const apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzYWluaWFzaG1pdDY0QGdtYWlsLmNvbSIsImV4cCI6MTc4MDQ3ODY5NCwiaWF0IjoxNzgwNDc3Nzk0LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYzRlNDA5NTYtYjBlYS00MzQ0LWFkMDMtM2RjNmIwYzc4MzI3IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYXNobWl0IHNhaW5pIiwic3ViIjoiYzFiZGZmYTYtY2QzYi00YTFiLThhMmMtZmNmMzA2OGM2N2RkIn0sImVtYWlsIjoic2Fpbmlhc2htaXQ2NEBnbWFpbC5jb20iLCJuYW1lIjoiYXNobWl0IHNhaW5pIiwicm9sbE5vIjoiMjMzMDA4MiIsImFjY2Vzc0NvZGUiOiJud3dzS3giLCJjbGllbnRJRCI6ImMxYmRmZmE2LWNkM2ItNGExYi04YTJjLWZjZjMwNjhjNjdkZCIsImNsaWVudFNlY3JldCI6IlhjcVV6TmJVZnhDbVdrcEgifQ.R5XkkXwWMlHGqvTDMzGMdcFfG0MVmPDzVs55Hl5A-GI';
const url = 'http://4.224.186.213/evaluation-service/notifications';
const logUrl = 'http://4.224.186.213/evaluation-service/logs';

const Log = async (stack, level, pkg, message) => {
  try {
    await fetch(logUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiToken}`
      },
      body: JSON.stringify({ stack, level, package: pkg, message })
    });
  } catch (err) {}
};

const weights = { Placement: 3, Result: 2, Event: 1 };

const fetchTopNotifs = async (limit = 10) => {
  try {
    await Log('backend', 'info', 'service', `Starting priority notifications fetch for top ${limit}`);
    
    let res = await fetch(url, {
      headers: { Authorization: `Bearer ${apiToken}` }
    });

    if (!res.ok) {
      let text = await res.text();
      await Log('backend', 'error', 'service', `Fetch failed with status ${res.status}`);
      throw new Error(`Failed to fetch: ${res.status} ${res.statusText} - ${text}`);
    }

    let json = await res.json();
    let items = json.notifications;

    items.sort((a, b) => {
      let w1 = weights[a.Type] || 0;
      let w2 = weights[b.Type] || 0;

      if (w1 !== w2) return w2 - w1;
      
      return new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime();
    });

    let topItems = items.slice(0, limit);
    await Log('backend', 'info', 'service', `Successfully computed top ${limit} notifications`);
    
    console.log(`--- TOP ${limit} PRIORITY NOTIFICATIONS ---`);
    console.table(topItems);
    return topItems;
  } catch (err) {
    await Log('backend', 'fatal', 'service', `Fatal error during notification fetch: ${err.message}`);
    console.error('error fetching:', err);
  }
};

fetchTopNotifs(10);
