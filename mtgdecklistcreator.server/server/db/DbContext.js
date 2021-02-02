import mongoose from 'mongoose'
import ValueSchema from '../models/Value'
import AccountSchema from '../models/Account'
import CardSchema from '../models/Card'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Card = mongoose.model('Card', CardSchema);
}

export const dbContext = new DbContext()
