import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/api', (req: Request, res: Response) => {
  res.send('Hello from Express!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});