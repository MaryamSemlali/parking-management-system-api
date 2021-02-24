const { ExtractJwt, Strategy } = require('passport-jwt');
const models = require("../models"),
    User = models.users;

module.exports = (passport) => {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.JWT_ENCRYPTION_KEY;

    passport.use(new Strategy(opts, async function(jwt_payload, done) {
        try {
            let user = await User.findByPk(jwt_payload.user_id);

            if (user) {
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
