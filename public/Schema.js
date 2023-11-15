let mongoose=require('mongoose');
let Schema=mongoose.Schema;

const userSchema=new Schema({
    email:{type: String},
    title:{type: String},
    maintext:{type: String}
})
module.exports=mongoose.model('User',userSchema);