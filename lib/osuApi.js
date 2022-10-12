const { osuClientID, osuClientSecret, callbackURL } = require('../config.json');

var { v2, auth } = require('osu-api-extended');

const login = auth.authorize(
	osuClientID,
	osuClientSecret,
	callbackURL
)

module.exports = { login, v2 };