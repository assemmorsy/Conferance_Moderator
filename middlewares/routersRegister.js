const drRouter = require('../routers/user.router');
const authRouter = require('../routers/auth.router');


module.exports = (app) => {
  app.use(authRouter);
  app.use(drRouter);
}
