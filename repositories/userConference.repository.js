const UserConference = require("../models/userConference.model");

exports.truncateUserConferenceTable = async () => {
  return await UserConference.truncate();
}