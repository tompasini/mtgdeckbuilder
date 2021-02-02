import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Card = new Schema(
  {
    name: { type: String, required: true },
    creatorId: { type: String, required: true },
    count: { type: Number, default: 1 }
  },
  { timestamps: true, _id: true, toJSON: { virtuals: true } }
)

Card.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Card
