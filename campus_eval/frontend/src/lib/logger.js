const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzYWluaWFzaG1pdDY0QGdtYWlsLmNvbSIsImV4cCI6MTc4MDQ3ODY5NCwiaWF0IjoxNzgwNDc3Nzk0LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYzRlNDA5NTYtYjBlYS00MzQ0LWFkMDMtM2RjNmIwYzc4MzI3IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYXNobWl0IHNhaW5pIiwic3ViIjoiYzFiZGZmYTYtY2QzYi00YTFiLThhMmMtZmNmMzA2OGM2N2RkIn0sImVtYWlsIjoic2Fpbmlhc2htaXQ2NEBnbWFpbC5jb20iLCJuYW1lIjoiYXNobWl0IHNhaW5pIiwicm9sbE5vIjoiMjMzMDA4MiIsImFjY2Vzc0NvZGUiOiJud3dzS3giLCJjbGllbnRJRCI6ImMxYmRmZmE2LWNkM2ItNGExYi04YTJjLWZjZjMwNjhjNjdkZCIsImNsaWVudFNlY3JldCI6IlhjcVV6TmJVZnhDbVdrcEgifQ.R5XkkXwWMlHGqvTDMzGMdcFfG0MVmPDzVs55Hl5A-GI';
const logUrl = 'http://4.224.186.213/evaluation-service/logs';

export const Log = async (stack, level, pkg, message) => {
  try {
    await fetch(logUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        stack,
        level,
        package: pkg,
        message
      })
    });
  } catch (err) {
    console.error('Logging failed:', err);
  }
};
