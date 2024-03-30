import express from "express";
import { PORT } from "./config.js";
import { connectDB } from "./db.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();  
app.use(express.json());

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Algo está roto");
});

// Conexión a la base de datos y escucha del puerto
try {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Escuchando el puerto http://localhost:${PORT}`);
    console.log(`Ambiente: ${process.env.NODE_ENV}`);
  });
} catch (error) {
  console.error("Error al conectar a la base de datos:", error);
}


app.get("/", (req, res) => {
  res.send({ status: "Iniciado" });
});

// Middleware para manejar las rutas de autenticación
app.use("/auth", authRoutes);

export default app;
