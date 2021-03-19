import {
  Strategy as JwtStrategy,
  ExtractJwt,
  VerifyCallback,
} from 'passport-jwt';
import { prisma } from '../app';

const jwtOptions = {
  secretOrKey: 'sex',
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify: VerifyCallback = async (payload, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: payload.sub,
    });
    if (!user) {
      done(null, false);
    }
    done(null, user);
  } catch (err) {
    done(err, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

export default jwtStrategy;
