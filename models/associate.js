const models = {
  doctor: require('./doctor'),
  specialty: require('./specialty'),
  scientificDegree: require('./scientificDegree')
}

module.exports = async () => {
  for (const key in models) {
    models[key].associate(models);
  }
}
