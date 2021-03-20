import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser'
import { PrismaClient } from '@prisma/client';
import passport from 'passport';
import jwtStrategy from './config/passport';
import routes from './routes/v1';

const app = express();
export const prisma = new PrismaClient();
app.use(bodyParser.json())
app.use(helmet());
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.use('/api/v1/', routes)
app.get('/', (_req, res) => res.send('pong'))

export default app;
