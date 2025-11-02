import mongoose from "mongoose";
import Mongoose from "mongoose";

const Schema = Mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    },
    blogs:[{type: mongoose.Types.ObjectId,ref:"Blog",required: true}],
});

export default Mongoose.model("User", userSchema);
// users