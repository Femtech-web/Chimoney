require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import cors from 'cors';
import allRoutes from './src/routes';
import errorHandler from "./src/helpers/errorHandler";

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(bodyParser.json({ limit: '30mb' }));
app.use("/api", allRoutes);

// GLOBAL ERROR HANDLER
app.use(errorHandler);

// START THE SERVER
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
});

export default app;