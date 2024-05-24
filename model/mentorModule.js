const mongoose = require('mongoose')

const mentorSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        students: [{
            type: String,
            ref: 'Student'
        }]
    }, {
    timestamps: true
}
)



const mentorModel = mongoose.model("mentors", mentorSchema)

module.exports = mentorModel