import mongoose from 'mongoose'
import { counter } from './sequence'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const UserSchema = new Schema({
  no: Number,
  email: {type: String, unique: true, lowercase: true},
  password: {type: String, default: ''},
  profile: {
    name: {type: String, default: ''},
    picture: {type: String, default: ''}
  },
  watchList: [
    {type: String}
  ]
})

UserSchema.pre('save', function(next){
  const doc = this

  const name = 'user_counter'

  counter.findByIdAndUpdate({_id: name}, {$inc: {seq: 1}}, function(err, result){
    if(err){
      return next(err)
    }
    doc.no = result.seq
    next()
  })
})

export default mongoose.model('User', UserSchema, 'users')
