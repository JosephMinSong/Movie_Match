import mongoose from 'mongoose'

const MovieSchema = new mongoose.Schema({
    id : {
        type: Number,
    },
    
    categories : [{
        type: Number
    }],

    posterPath : {
        type: String
    },

    title: {
        type: String
    },

    description: {
        type: String
    },
})

const Movie = mongoose.models.Movie || mongoose.model("Movie", MovieSchema)

export default Movie