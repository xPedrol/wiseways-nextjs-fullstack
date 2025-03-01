import mongoose, { model, Schema } from 'mongoose'

const TagSchema = new Schema({
  name: String,
  description: String,
  color: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  createdAt: Date,
  updatedAt: Date,
})

const Tag = mongoose.models.Tags || model('Tags', TagSchema)
export default Tag
