import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser'
import cors from 'cors'
import { PrismaClient } from '@prisma/client';
import passport from 'passport';
import jwtStrategy from './config/passport';
import routes from './routes/v1';
import ApiError from './util/apiError';
import httpStatus from 'http-status';
import { errorConverter, errorHandler } from './middlewares/error';

const app = express();
export const prisma = new PrismaClient();
app.use(cors())
app.use(bodyParser.json())
app.use(helmet());
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.use('/api/v1/', routes)
app.get('/', (_req, res) => res.send('pong'))
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

app.use(errorConverter);
app.use(errorHandler);

export default app;
