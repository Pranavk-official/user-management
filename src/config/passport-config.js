const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const User = require("../model/userSchema");

const customFields = {
  usernameField: "email",
  passwordField: "password",
};

async function authenticateUser(email, password, done) {
  const user = await User.findOne({ email, isAdmin: false });
  if (!user) {
    return done(null, false, { message: "No user found with that email" });
  }

  const isValid = await bcrypt.compare(password, user.password);

  console.log(isValid);

  if (!isValid) {
    return done(null, false);
  } else {
    return done(null, user);
  }

  // try {
  //   if (await bcrypt.compare(password, user.password)) {
  //     return done(null, user);
  //   } else {
  //     return done(null, false, { message: "Password incorrect" });
  //   }
  // } catch (e) {
  //   return done(e);
  // }
}

async function authenticateAdmin(email, password, done) {
  const user = await User.findOne({ email, isAdmin: true });
  if (!user) {
    return done(null, false, { message: "No admin found with that email" });
  }

  const isValid = await bcrypt.compare(password, user.password);

  console.log(isValid);

  if (!isValid) {
    return done(null, false);
  } else {
    return done(null, user);
  }

  // try {
  //   if (await bcrypt.compare(password, user.password)) {
  //     return done(null, user);
  //   } else {
  //     return done(null, false, { message: "Password incorrect" });
  //   }
  // } catch (e) {
  //   return done(e);
  // }
}

// passport.use(new LocalStrategy(customFields, verifyCallback));
passport.use("user-local", new LocalStrategy(customFields, authenticateUser));
passport.use("admin-local", new LocalStrategy(customFields, authenticateAdmin));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
