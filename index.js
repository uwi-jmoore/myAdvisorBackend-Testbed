// constants for express routes, paths and db connection
const dotenv = require('dotenv').config();

const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const pool = require("./db");
const passport = require("passport");
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })
const { parse } = require('./utilities/parser');
const bcrypt = require("bcrypt");

const port = process.env.PORT || 3000;

// app connection and resources
app.use(cors());
app.use(express.json());

// models
const Admin = require("./models/Admin");
const AdvisedCourse = require("./models/AdvisedCourse");
const AdvisingSesssion = require("./models/AdvisingSession")
//const AdvisingWindow = require("./models/AdvisingWindow");
const Antirequisite = require("./models/Antirequisite");
const AwardedDegree = require("./models/AwardedDegree");
const Career = require("./models/Career");
const CareerCourse = require("./models/CareerCourse");
const Course = require("./models/Course");
const ElectiveRequirement = require("./models/ElectiveRequirement");
//const PotentialGraduate = require("./models/PotentialGraduate");
const Prerequisite = require("./models/Prerequisite");
const Programme = require("./models/Programme");
const ProgrammeCourse = require("./models/ProgrammeCourse");
const Semester = require("./models/Semester");
const Student = require("./models/Student");
const StudentCourse = require("./models/StudentCourse");
const Transcript = require("./models/Transcript");
const Type = require("./models/Type");
const Group = require("./models/Group");
const CourseGroup = require("./models/CourseGroup");
const SemesterCourse = require("./models/semesterCourse");

//import associations
require("./models/Associations");

const { ppid } = require("process");

// async function initializeDatabase() {
//   try {
//     await AdvisingSesssion.sync();
//     await AdvisingWindow.sync();
//     await Career.sync();
//     await CareerCourse.sync();
//     await Course.sync();
//     await PotentialGraduate.sync();
//     await Programme.sync();
//     await ProgrammeCourse.sync();
//     await Staff.sync();
//     await Student.sync();
//     await StudentCourses.sync();
//     await Transcript.sync();

//     console.log("Tables created successfully.");
//   } catch (error) {
//     console.error("Error creating tables:", error);
//   }
// }
async function newinitializeDatabase() {
  (async () => {
    try {
      if (!process.env.SYNCED) {
        // Create tables if they do not exist
        await pool.sync()
        // await Admin.sync();
        // await Semester.sync();
        // await Career.sync();
        // await Course.sync();
        // await Programme.sync();
        // await Student.sync();
        // await Transcript.sync();
        // await Type.sync();
        // await StudentCourse.sync();
        // await AdvisingSesssion.sync();
        // await Antirequisite.sync();
        // await AdvisedCourse.sync();
        // await AwardedDegree.sync();
        // await CareerCourse.sync();
        // await ElectiveRequirement.sync();
        // await ProgrammeCourse.sync();
        // await Group.sync();
        // await CourseGroup.sync();
        // await Prerequisite.sync();
        // await SemesterCourse.sync();
       
        // Creates Admin Account
        const adminID = "816020000";
        const user = await Admin.findOne({ where: { adminID : 816020000} });//this is essentially return 1st admin object where adminID exists
        if (!user) {
          const saltRounds = 10;
          const salt = await bcrypt.genSalt(saltRounds);
          const passEncrypt = await bcrypt.hash("adminpass", salt);

          await Admin.create({
            adminID: "816020000",
            firstName: "Admin",
            lastName: "istrator",
            email: "administratorEmail@mail.com",
            password: passEncrypt,
          });
          console.log('Admin account created.');
        }else{
          if(user){
            console.log("Admin Already Exist.");
          }else{
            console.log("Error");
          }
        }

        process.env.SYNCED = "TRUE";
        console.log('Database tables synchronized.');
      } else {
        console.log('Database tables are already synchronized.');
      }
    } catch (error) {
      console.error('Unable to synchronize the database:', error);
    } finally {
      // Close the database connection when done
      // await db.close();
    }
  })();


}

// async function initializeDatabase() {
//   (async () => {
//     try {
//       if (!process.env.SYNCED) {
//         // Create tables if they do not exist

//         await Admin.sync();
//         await Semester.sync();
//         await Career.sync();
//         await Course.sync();
//         await Programme.sync();
//         await Student.sync();
//         await Transcript.sync();
//         await Type.sync();
//         await StudentCourse.sync();
//         await AdvisingSesssion.sync();
//         await Antirequisite.sync();
//         await AdvisedCourse.sync();
//         await AwardedDegree.sync();
//         await CareerCourse.sync();
//         await ElectiveRequirement.sync();
//         await ProgrammeCourse.sync();
//         await Group.sync();
//         await CourseGroup.sync();
//         await Prerequisite.sync();
//         await SemesterCourse.sync();
        
//         // Creates Admin Account
//         const adminID = "816020000";
//         const user = await Admin.findOne({ where: { adminID } });
//         if (!user) {
//           const saltRounds = 10;
//           const salt = await bcrypt.genSalt(saltRounds);
//           const passEncrypt = await bcrypt.hash("adminpass", salt);

//           await Admin.create({
//             adminID: "816020000",
//             firstName: "Admin",
//             lastName: "istrator",
//             email: "administratorEmail@mail.com",
//             password: passEncrypt,
//           });
//           console.log('Admin account created.');
//         }else{
//           if(user){
//             console.log("Admin Already Exist.");
//           }else{
//             console.log("Error");
//           }
//         }

//         process.env.SYNCED = "TRUE";
//         console.log('Database tables synchronized.');
//       } else {
//         console.log('Database tables are already synchronized.');
//       }
//     } catch (error) {
//       console.error('Unable to synchronize the database:', error);
//     } finally {
//       // Close the database connection when done
//       // await db.close();
//     }
//   })();


// }

newinitializeDatabase();

// // if in production (deployment), changes main client path to build
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "myadvisor/build")));
//   }

// routes
app.get("/", (req, res) => {
  res.status(200).send("Server running...");
});

app.use("/admin", require("./routes/admin"));

app.use("/student", require("./routes/student"));

app.use("/courses", require("./routes/courses"));

app.use("/careers", require("./routes/careers"));

app.use("/programmes", require("./routes/programmes"));

app.use("/transcript", require("./routes/transcript"));

app.use("/accounts", require("./routes/authorization"));

app.use("/semester", require("./routes/semester"));

// // if a bad route is entered
// if (process.env.NODE_ENV === "production") {
//     app.get("*", (req, res) => {
//       console.log(" load home ");
//       //res.sendFile(path.join(__dirname, "myadvisor/build/index.html"));
//     });
//   } else {
//     app.get("*", (req, res) => {
//       console.log(" load home 2 ");
//       //res.sendFile(path.join(__dirname, "myadvisor/public/index.html"));
//     });
//   }

app.listen(port, () => {
  console.log(`Server is starting on port ${port}`);
});
