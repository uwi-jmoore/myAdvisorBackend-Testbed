const router = require("express").Router();
const db = require("../db");

// import models
const Career = require("../models/Career");
const Course = require("../models/Course");
const CareerCourse = require("../models/CareerCourse");

// ---Routes---

// Create A Career
router.post("/add", async (req, res) => {
    try {
        // destructure data entered
        const { careerName, field, description } = req.body;

        // check if courses is already added
        const career = await Career.findOne({ where: { careerName } });
        if (career) {
            return res.status(401).send("Career Already Exist!");
        }
        else {
            await Career.create({
                careerName,
                field,
                description,
            })
                .then(() => {
                    return res.status(200).send("Career Created!");
                })
                .catch(err => {
                    console.log("Error: ", err.message);
                });
        }
    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

// Get All Careers
router.get("/all", async (req, res) => {
    try {
        const careers = await Career.findAll();
        res.status(200).json(careers);
    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

// Update Career By ID
router.put("/edit/:id", async (req, res) => {
    try {
        const { careerName, field, description } = req.body;

        const career = await Career.findOne({ where: { id: req.params.id } });
        if (!career) {
            return res.status(401).send("Career Not Found!");
        }
        else {
            // updates course with new information
            if (careerName) {
                career.careeName = careerName;
            }
            if (field) {
                career.field = field;
            }
            if (description) {
                career.description = description;
            }

            await career.save();
            res.status(200).send("Career Updated!");
        }
    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

// Delete Career By ID
router.delete("/delete/:id", async (req, res) => {
    try {
        const career = await Career.findOne({ where: { id: req.params.id } });
        if (!career) {
            return res.status(401).send("Career Not Found!");
        }
        else {

            await career.destroy();
            res.status(200).send("Career Deleted!");
        }
    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

//Add a careerCourse
router.post("/courses/add/:careerId/:courseCode", async (req, res) => {
    try {
        // destructure data entered
        //const { careerID, courseID } = req.body;
        const{careerId, courseCode} = req.params;

        //check if course is already added to a career
        const careercourse = await CareerCourse.findOne({ 
            where: { careerId, courseCode } 
        });

        if (careercourse) {
            return res.status(401).send("Course already added to this Career.");
        }
        else {
            await CareerCourse.create({
                courseCode,
                careerId
                
            })
                .then(() => {
                    return res.status(200).send("Course added to Career!");
                })
                .catch(err => {
                    console.log("Error: ", err.message);
                });
        }

    } catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

// get all career courses (all the course options for a future career)
router.get("/courses/:id", async (req, res) => {
    try {
        const careerId = req.params.id;
        //console.log("LOG::> careerId: ", careerId);

        const career = await Career.findOne({
            where: {id: careerId}
        });
        //console.log(career);

        const careerCourses = await CareerCourse.findAll({ 
            where: { careerId }
        });
        console.log(careerCourses);
        if (careerCourses.length === 0) {
            return res.status(401).send("Career doesn't exist or has no courses!");
        }
        else {
            var i;
            let courseCodes = [];

            for (i = 0; i < careerCourses.length; i++) {
                courseCodes.push(careerCourses[i].courseCode)
            }

            let courses = [];
            for (i = 0; i < careerCourses.length; i++) {
                const course = await Course.findOne({ where: { courseCode: courseCodes[i] } });
                courses.push(course);
            }

            res.status(202).json({
                data: {career, courses}
            });
        }
    }
    catch (err) {
        console.log("Error: ", err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
