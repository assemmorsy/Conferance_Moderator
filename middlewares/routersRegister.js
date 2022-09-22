const drRouter = require('../routers/doctor.router');
const authRouter = require('../routers/auth.router');


module.exports = (app) => {
  app.use(authRouter);
  app.use(drRouter);
}
