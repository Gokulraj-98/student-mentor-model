const mongoose = require('mongoose')

const studentSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        emailid: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        batch: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            default: "student",
        },
        mentor: {
            type: String,
            ref: 'Mentor',
            default: null
        },
        previousMentors: [{
            type: String,
            ref: 'Mentor'
        }]
    }, {
    timestamps: true
}
)

const studentModel = mongoose.model("students", studentSchema)

module.exports = studentModel