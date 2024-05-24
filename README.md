1.To add students use this api in postman and use POST method to add student 
POST - https://student-mentor-model.onrender.com/students/register
input json data format:
{
    "name" : "sridhar",
    "emailid":"sridhar@gmail.com",
    "password":"sridhar@12",
    "batch":"B53 WE"
}


2.To add Mentor use this API
Post - https://student-mentor-model.onrender.com/mentors/add-mentor
input:
{
    "name":"Arun kumar"
}

3.API to assign multiple students to a mentor using mentor and student names
https://student-mentor-model.onrender.com/mentors/add-student/:mentorName/students
example:
POST - https://student-mentor-model.onrender.com/mentors/add-student/suresh/students
input:
{
    "studentNames": ["gokulraj","udhaya","sridhar"]
}

4.API to show all students for a particular mentor using mentor name
https://student-mentor-model.onrender.com/mentors/show-students/:mentorName/students
example:
GET - https://student-mentor-model.onrender.com/students/show-students/balu/students

5.API to assign/change mentor for a particular student using names
https://student-mentor-model.onrender.com/change-mentor/:studentName/mentor/:mentorName
example:
PUT - https://student-mentor-model.onrender.com/students/change-mentor/gokulraj/mentor/suresh

6.API to show previously assigned mentors for a particular student using student name
https://student-mentor-model.onrender.com/students/:studentName/previous-mentors
example :
GET - https://student-mentor-model.onrender.com/students/gokulraj/previous-mentors

7.API to see students without mentor
https://student-mentor-model.onrender.com/students/without-mentor
example:
GET- https://student-mentor-model.onrender.com/students/without-mentor
