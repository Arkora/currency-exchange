import mongoose from "mongoose"

const exchangeSchema = mongoose.Schema({
    name:{type: String, required: true, unique: true},
    from:{type: String,required: true},
    to:{type: String,required: true},
    ratio:{type: Number,required: true}

  });
  
  
  
  export default mongoose.model("Exchange", exchangeSchema);