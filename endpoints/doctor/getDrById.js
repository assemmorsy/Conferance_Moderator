const handler = async (req, res, next) => {
  return res.status(200).json({ message: "Done!" });
}

module.exports = handler;