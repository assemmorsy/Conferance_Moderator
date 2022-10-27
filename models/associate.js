const models = {
  user: require('./user.model'),
  specialty: require('./specialty.model'),
  scientificDegree: require('./scientificDegree.model'),
  pendedDoctor: require('./pendedUser.model'),
	university: require('./university.model'),
	conferance: require('./conference.model'),
	userConference: require('./userConference.model')
}

module.exports = async () => {
  for (const key in models) {
    models[key].associate(models);
  }
}
