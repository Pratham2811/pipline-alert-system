import 'dotenv/config';
import connectDB from './src/config/db.js';
import seedDatabase from './src/seed/seedData.js';
import app from './src/app.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  await seedDatabase();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
