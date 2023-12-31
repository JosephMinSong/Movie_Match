import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    email : {
        type: String,
        unique: [true, 'Email already exists'],
        required: [true, "Email is required"]
    },

    username: {
        type: String,
        required: [true, "Username is required"],
        match: [/^(?=.{1,100}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanurmeric letters and be unique"]
    },

    image: {
        type: String,
    },

    likedMovies: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Movie'
    }]
})


const User = mongoose.models.User || mongoose.model("User", UserSchema)

export default User