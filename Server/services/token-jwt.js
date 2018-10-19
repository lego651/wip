import jwt from 'jsonwebtoken'
import config from '../config'

const generateToken = (user) => {
  const timestamp = new Date().getTime();

  const token = jwt.sign({sub: user.id, iat: timestamp}, config.secret)

  return token
}

export default function(user) {
  return generateToken(user);
}
