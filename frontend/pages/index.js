import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/query', { question });
      setResponse(res.data.data);
    } catch (err) {
      setResponse("Error en la consulta");
    }
  };

  return (
    <div>
      <h1>Pregúntale a la Base de Datos</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={question} 
          onChange={(e) => setQuestion(e.target.value)} 
          placeholder="Escribe tu pregunta" 
        />
        <button type="submit">Consultar</button>
      </form>
      <div>
        <h3>Respuesta:</h3>
        <p>{response}</p>
      </div>
    </div>
  );
}
