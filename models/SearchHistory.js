import mongoose from 'mongoose'

const SearchHistorySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  username: { type: String, required: true },
  searchedAt: { type: Date, default: Date.now }
},
  {timestamps:true},)

export default mongoose.models.SearchHistory ||
  mongoose.model('SearchHistory', SearchHistorySchema)