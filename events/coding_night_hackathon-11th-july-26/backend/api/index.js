import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// Dummy endpoint for verification
app.get('/', (req, res) => {
    res.json({ message: 'ServiceWala API is running' });
});

// Export for Vercel
export default app;

// Fallback for CommonJS environments (like older Vercel setups)
module.exports = app;
