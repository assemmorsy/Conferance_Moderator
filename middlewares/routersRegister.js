const drRouter = require('../routers/doctorRouter');

module.exports = (app) => {
  app.use(drRouter);
}