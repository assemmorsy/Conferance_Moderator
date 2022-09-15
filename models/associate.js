const models = {
	doctor: require('./doctor'),
	specialty: require('./specialty'),
	scientificDegree: require('./scientificDegree')
}

const associate = async () => {
	for(const key in models) {
		models[key].associate(models);
	}
}

module.exports = associate;
