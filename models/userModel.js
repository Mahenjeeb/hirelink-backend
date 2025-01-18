import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {type: String, require: true, unique: true},
    email : {type: String, require: true, unique: true},
    password : {type: String, require: true, unique: true},
    isAdmin: Boolean
})

const userModel = mongoose.model('user',userSchema);
export default userModel;