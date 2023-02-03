import mongoose from "mongoose"

const currencySchema = mongoose.Schema({
    name:{type: String, required:  true},
    currency:{type:String,required:true},
    symbol:{type:String,required:true}

  });
  
  
  
  export default mongoose.model("Currency", currencySchema);