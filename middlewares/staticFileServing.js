const storages = require('./../utils/multerStorage');
const express = require('express');
const path = require('path');

module.exports = (app) => {
app.use(storages.doctorsProfilesStorage.endPoint,
    express.static(path.join(process.cwd(), storages.doctorsProfilesStorage.relativePath)));
}
