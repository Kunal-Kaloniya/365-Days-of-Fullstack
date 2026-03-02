// === OAuth 2.0 and Passport.js ===
// OAuth is not "sharing your password".
// It's a delegated authorization protocol where a third party (Google) gives your app a "Limited Access Token" to identify the user.
// 
// === The OAuth Handshake ===
// 1. Redirection: You send the user to Google's Auth Server.
// 2. Consent: Google asks the user, "Do you want to share your email with [Your App]?".
// 3. The Authorization Code: Google sends the user back to your app with a temporary "Code".
// 4. The Exchange: Your server exchanges that code for an Access Token and Profile Data behind the scenes.
// 5. Session Creation: You find or create the user in your MongoDB and issue your own JWT.


// MICROLAB
// Set up the Google Strategy using passport-google-oauth20.
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
        // 1. Check if user exists in MongoDB
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
            // 2. If not, create them
            user = await User.create({
                googleId: profile.id,
                email: profile.emails[0].value,
                name: profile.displayName,
                avatar: profile.photos[0].value
            });
        }

        return done(null, user);
    }
));