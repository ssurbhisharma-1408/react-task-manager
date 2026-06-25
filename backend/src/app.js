import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from './routes/taskRoutes.js'
import errorHandler from './middleware/errorHandler.js'

dotenv.config();

const app  = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => res.json({ message: "Task Manager API running " }));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});