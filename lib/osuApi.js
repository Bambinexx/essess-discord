const { osuClientID, osuClientSecret, callbackURL } = require('../config.json');

var { v2, auth } = require('osu-api-extended');

login = auth.authorize(
	osuClientID,
	osuClientSecret,
	callbackURL
)

module.exports = { v2, login } ;