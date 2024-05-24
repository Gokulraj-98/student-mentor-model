const express = require('express')

const mentorModel = require('../model/mentorModule')
const studentModel = require('../model/studentModel')
const router = express.Router()

router.post('/add-mentor', async (req, res) => {
    try {
        const mentor = new mentorModel({ ...req.body, verified: true })
        await mentor.save()
        res.send("mentor added successfully")
    } catch (e) {
        res.send(e)
    }
})

//// API to assign multiple students to a mentor using mentor and student names
router.post('/add-student/:mentorName/students', async (req, res) => {
    const { mentorName } = req.params;
    const { studentNames } = req.body;
    console.log(mentorName, studentNames);

    try {
        const mentor = await mentorModel.findOne({ name: mentorName });
        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found' });
        }

        const students = await studentModel.find({ name: { $in: studentNames } });
        students.forEach(student => {
            student.previousMentors.push(student.mentor);
            student.mentor = mentor.name;
            student.save();
            console.log(student.name);
            mentor.students.push(student.name);
        });

        await mentor.save();
        res.json(mentor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router