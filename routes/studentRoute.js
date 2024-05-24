const express = require('express')

const studentModel = require('../model/studentModel')
const mentorModel = require('../model/mentorModule')

const router = express.Router()

router.post('/register', async (req, res) => {
    try {
        const student = new studentModel({ ...req.body, verified: true })
        await student.save()
        res.send("student registered successfully")
    } catch (e) {
        res.send(e)
    }
})

// API to show all students for a particular mentor using mentor name
router.get('/show-students/:mentorName/students', async (req, res) => {
    const { mentorName } = req.params;

    try {
        const mentor = await mentorModel.findOne({ name: mentorName });
        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found' });
        }

        res.json(mentor.students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// API to assign/change mentor for a particular student using names
router.put('/change-mentor/:studentName/mentor/:mentorName', async (req, res) => {
    const { studentName, mentorName } = req.params;

    try {
        const student = await studentModel.findOne({ name: studentName });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const mentor = await mentorModel.findOne({ name: mentorName });
        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found' });
        }

        if (student.mentor) {
            student.previousMentors.push(student.mentor);
        }
        student.mentor = mentor.name; // Save mentor name
        await student.save();

        mentor.students.push(student.name); // Save student name
        await mentor.save();

        res.json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// API to show previously assigned mentors for a particular student using student name
router.get('/:studentName/previous-mentors', async (req, res) => {
    const { studentName } = req.params;

    try {
        const student = await studentModel.findOne({ name: studentName });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.json(student.previousMentors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/without-mentor', async (req, res) => {
    try {
        const students = await studentModel.find({ mentor: null });
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router