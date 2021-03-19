import express from 'express';
import helmet from 'helmet';
import { PrismaClient } from '@prisma/client';
import passport from 'passport';
import jwtStrategy from './config/passport';
import router from './routes/v1/auth.route';

const app = express();
export const prisma = new PrismaClient();

app.use(helmet());
app.use(passport.initialize());
app.use('api', router)
passport.use('jwt', jwtStrategy);

export default app;
