import passport from 'passport'
import CryptoJS from 'crypto-js'
const JwtStrategy = require('passport-jwt').Strategy  // 用来做requireAuth Middleware
const ExtractJwt = require('passport-jwt').ExtractJwt // 用来做requireAuth Middleware
const LocalStrategy = require('passport-local') // 用来做requireLogin Middleware

import User from '../models/user'
import config from '../config'

export default function(){
  // requireAuth jwtLogin Strategy 的setup
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
  }
  const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
    User.findById(payload.sub, function(err, user){
      if(err){
        return done(err, false)
      }
      if(user){
        done(null, user)
      } else {
        done(null, false)
      }
    })
  })

  // requireLogin localStrategy Strategy 的setup
  const localOptions = {
    usernameField: 'email'
  }
  const localLogin = new LocalStrategy(localOptions, function(email, password, done){
    User.findOne({email: email}, function(err, user){
      if(err){
        return done(err)
      }
      if(!user){
        return done(null, false)
      }

      // compare saved user decoded password and password input here
      const bytes = CryptoJS.AES.decrypt(user.password, config.secret)
      const decrypted = bytes.toString(CryptoJS.enc.Utf8)
      if(decrypted && decrypted.length > 0){
        if(decrypted !== password){
          return done(null, false)
        } else {
          return done(null, user)
        }
      }
    })
  })

  // user this set up in index.js
  passport.use(jwtLogin)
  passport.use(localLogin)
}
