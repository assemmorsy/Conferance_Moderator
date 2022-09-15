module.exports = (app) => {
app.use((err, req, res, next) => {
  console.error(err);
  if (err.status) {
    return res.status(err.status).json({ errors: err.message });
	}
  else
    return res.status(500).json({ errors: err.message });
});
} 
