require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import http from 'http';
import cors from 'cors';
import allRoutes from './src/routes';
import errorHandler from "./src/helpers/errorHandler";

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(bodyParser.json({ limit: '30mb' }));

// SECURITY SETUP
app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan('dev'));
app.use(xss());
app.use(hpp());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  message: 'Too many request from this IP, Please try again in 15 mins.',
});
app.use('/api', limiter);
app.use("/api", allRoutes);

// GLOBAL ERROR HANDLER
app.use(errorHandler);

// START THE SERVER
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
});

export default app;