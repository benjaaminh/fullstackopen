import express from 'express';
import calculateBmi from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height: number = Number(req.query.height);
  const weight: number = Number(req.query.weight);
  const bmi = calculateBmi(height, weight);
  if (isNaN(height) || isNaN(weight)) {
    res.json({ error: 'malformatted parameters' });
  } else {
    res.json({ bmi, height, weight });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).send({ error: 'parameters missing' });
  }
  else if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }

  const result = calculateExercises(Number(target), daily_exercises as number[],);
  return res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});