import app from './app';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📋 Tasks API: http://localhost:${PORT}/api/tasks`);
  console.log(`❤️  Health check: http://localhost:${PORT}/health`);
});
