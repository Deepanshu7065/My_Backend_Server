
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        wathHistory: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubTodo"
        }]
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordMatched = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
      jwt.sign({ _id: this._id,
        username: this.username,
        email: this.email
       }, process.env.ACCESSTOKEN_SECRET, { expiresIn: process.env.ACCESSTOKEN_EXPIRE })
}

userSchema.methods.refreshToken = function () {
    jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRE })

}
export const UserModal = mongoose.model("User", userSchema) 
