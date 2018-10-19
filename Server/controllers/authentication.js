import path from 'path'
import AES from 'crypto-js/aes'
import CryptoJS from 'crypto-js'

import User from '../models/user'
import generateToken from '../services/token-jwt'
import config, { hostUrl } from '../config'

export const userinfo = function(req, res, next) {
  const email = req.user.email

  if(!email || email.length < 0){
    return res.status(400).send({error: 'invalid email'})
  }

  User.findOne({email: email})
      .exec(function(err, user){
        if(err){
          console.log(err)
        } else {
          if(user){
            return res.json(user)
          }
        }
      })
}

// export const signin = function(req, res, next){
//   res.send({token: generateToken(req.user)})
// }

export const signout = function(req, res, next){
  req.session.destroy(function(err){
    if(err){
      return res.status(400).send(err)
    }
    req.logout()
    res.send('logout success.')
  })
}

export const signup = function(req, res, next){
  const email = req.body.email
  const password = req.body.password
  const name = req.body.name

  if(!email || !password || !name){
    return res.status(400).send({
      confirmation: 'fail',
      message: 'Empty information is not allowed.'})
  }
  if(password.length < 6){
    return res.status(400).send({
      confirmation: 'fail',
      message: 'Password length should contain >= 6'
    })
  }
  if(name.length < 4){
    return res.status(400).send({
      confirmation: 'fail',
      message: 'Username length should contain >= 4'
    })
  }

  User.findOne({email: email}, function(err, exists){
    if(err){
      return next(err)
    }
    if(exists){
      return res.status(400).send({
        confirmation: 'fail',
        message: 'Email is already  in use'
      })
    }

    const encrypted = AES.encrypt(password, config.secret).toString()
    if(encrypted && encrypted.length > 0){
      const user = new User({
        email: email,
        password: encrypted,
        profile: {
          name: name
        }
      })

      user.save(function(err){
        if(err){
          return next(err)
        } else {
          console.log('user created')
          return res.json({ token: generateToken(user)})
        }
      })
    }
  })
}

export const signin = function(req, res, next){
  const email = req.body.email
  const password = req.body.password

  if(!email || !password){
    return res.status(400).send({
      confirmation: 'fail',
      message: 'Empty information is not allowed.'
    })
  }

  User.findOne({email: email}, function(err, user){
    if(err){
      return next(err)
    }
    if(!user){
      return res.status(409).send({
        confirmation: 'fail',
        message: 'Email is not registed.'
      })
    }

    const bytes = AES.decrypt(user.password, config.secret)
    const decrypted = bytes.toString(CryptoJS.enc.Utf8)
    if(decrypted && decrypted.length > 0){
      if(decrypted != password){
        return res.status(409).send({
          confirmation: 'fail',
          message: 'Password not match.'
        })
      } else {
        console.log('user signed in')
        res.send({ token: generateToken(user) })
      }
    }
  })
}
