const models = {
  user: require('./user.model'),
  specialty: require('./specialty.model'),
  scientificDegree: require('./scientificDegree.model'),
  pendedDoctor: require('./pendedUser.model'),
  university: require('./university.model'),
  conference: require('./conference.model'),
  accommodationPlace: require('./accommodationPlace'),
  user_conference: require('./user_conference.model'),
  conference_specialty: require('./conference_specialty'),
  conference_accommodation: require('./conference_accommodation')
}

module.exports = async () => {
  for (const key in models) {
    models[key].associate(models);
  }
}
