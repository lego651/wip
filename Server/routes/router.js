import fs from 'fs';
import path from 'path';
import passport from 'passport'
import passportInitialize from '../services/passportInitialize'

import * as Authentication from '../controllers/authentication';
// import { signup } from '../controllers/authentication';
// import * as Authentication from '../controllers/authentication';



// run passportInitialize function
passportInitialize()
// initialize middleware by passport package
const requireAuth = passport.authenticate('jwt', { session: false })
const requirSignin = passport.authenticate('local', { session: false })

export default function(app){
  // test Routerss
  app.get('/test', function(req, res){
    res.send({ message: 'Test Route'})
  })

  // Auth
  // sign up
  app.post('/signup', Authentication.signup)
  app.post('/signin', Authentication.signin)
  app.get('/token', requireAuth, Authentication.userinfo)
}
