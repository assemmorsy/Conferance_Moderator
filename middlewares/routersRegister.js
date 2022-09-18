const drRouter = require('../routers/doctor.router');

module.exports = (app) => {
  app.use(drRouter);
}