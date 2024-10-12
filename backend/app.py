from fastapi import FastAPI, HTTPException
import cx_Oracle
from pydantic import BaseModel

# Configurar la conexión a la base de datos Oracle
oracle_dsn = cx_Oracle.makedsn("Laptop-Wilson", "1521", service_name="XE")
connection = cx_Oracle.connect(user="SYSTEM", password="sonwil66", dsn=oracle_dsn)

app = FastAPI()

# Modelo para las consultas
class QueryModel(BaseModel):
    question: str

# Endpoint para realizar la consulta
@app.post("/query")
async def query_database(query: QueryModel):
    try:
        # Implementar lógica de consulta
        cursor = connection.cursor()
        cursor.execute(f"SELECT * FROM cbr_clientes")  # Cambiar con base en la lógica de tu pregunta
        result = cursor.fetchall()
        cursor.close()
        return {"data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Endpoint para probar conexión
@app.get("/healthcheck")
async def healthcheck():
    return {"status": "OK"}
