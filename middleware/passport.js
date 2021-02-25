const { ExtractJwt, Strategy } = require('passport-jwt');
const models = require("../models"),
    User = models.users;
/**
 * Validate JWT
 * @param passport
 */
module.exports = (passport) => {
    var opts = {};

    // Get token from authorization header
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

    opts.secretOrKey = process.env.JWT_ENCRYPTION_KEY;

    passport.use(new Strategy(opts, async function(jwt_payload, done) {
        try {
            // Get ID and search for user in database
            let user = await User.findByPk(jwt_payload.user_id);

            if (user) { // if user exists

                // Update user last login field
                user.lastLogin = new Date();
                await user.save();

                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (err) {
            return done(err, false);
        }
    }));
};
