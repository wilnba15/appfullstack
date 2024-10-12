import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { question } = req.body;

    try {
      const response = await axios.post('https://your-vercel-backend-url/query', { question });
      res.status(200).json({ data: response.data });
    } catch (error) {
      res.status(500).json({ error: 'Error en la consulta a FastAPI' });
    }
  } else {
    res.status(405).end(); // Método no permitido
  }
}

