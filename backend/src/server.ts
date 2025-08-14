import express, { Request, Response } from "express";
import cors from "cors";
import tasksRouter from "./routes/taskRouter";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/tasks", tasksRouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
