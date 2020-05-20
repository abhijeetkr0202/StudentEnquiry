const LocalStrategy = require('passport-local').Strategy

function initialize(passport, getUserByUsername) {
  const authenticateUser = async (username, password, done) => {
    const user = getUserByUsername(username)
    if (user == null) {
      return done(null, false, { message: 'No database with that Username' })
    }

    try {
      if (password==user.password) {
        return done(null, user,{message:'Logged in successfully !'})
      } else {
        return done(null, false,{type:'success',message:'Incorrect Password !' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.username))
  passport.deserializeUser((user, done) => {
    return done(null, getUserByUsername(user))
  })
}

module.exports = initialize