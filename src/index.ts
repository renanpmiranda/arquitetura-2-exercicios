import express from 'express';
import cors from 'cors';
import { courseRouter } from './router/courseRouter';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.use("/courses", courseRouter)