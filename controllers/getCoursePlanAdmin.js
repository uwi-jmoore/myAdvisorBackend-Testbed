
const { getEligibleCourses } = require("../controllers/getEligibleCourses");
const { getDegreeProgress } = require("../controllers/getDegreeProgress");
const { getPlannedCourses } = require("../controllers/getPlannedCourses");

async function getCoursePlanAdmin(programmeId, studentCourseCodes, programmeCourses, semCourses, prereqs, antireqs, coursegroups, courses, programmeCreditRequirements, types, studentId, semesterId) {

    let plannedCoursesObjs = [];
    let coursePlan ;
    let plannedCourseCodes =[];

    // -----------------CALL THE FUNCTIONS-------------------------


    eligibleCourses = getEligibleCourses(programmeId, studentCourseCodes, programmeCourses, semCourses, prereqs, antireqs, coursegroups);
    // console.log("eligibleCourses:  ", eligibleCourses);

    degreeProgress = getDegreeProgress(programmeId, studentCourseCodes, programmeCourses, courses, programmeCreditRequirements, types);
    // console.log("Degree Progress: ", degreeProgress);

    plannedCourses = await getPlannedCourses(studentId, semesterId);
    // console.log("Planned Courses: ", plannedCourses);




    // -----------------FORMAT OUTPUT-------------------------



    // // get planned courses
    // for (let course of plannedCourses) {
    //     const progCourse = programmeCourses.find(progCourse => progCourse.courseCode === course && progCourse.programmeId === programmeId);
    //     let typeId = progCourse ? progCourse.typeId : null;
    //     const typeObj = types.find(type => type.id === typeId);
    //     let typeName = typeObj ? typeObj.type : null;
    //     // console.log("typeName: ",typeName);
    //     const courseObj = courses.find(c => c.courseCode === course);
    //     let courseName = courseObj ? courseObj.courseTitle : null;
    //     let credits = courseObj ? courseObj.credits : null;
    //     // console.log("credits:: ", credits);

    //     plannedCoursesObjs.push({
    //         "courseCode": progCourse.courseCode,
    //         "courseTitle": courseName,
    //         "type": typeName,
    //         "credits": credits
    //     })

    // }
    

    // console.log("degreeprogress Requiremtns: ", degreeProgress.Requirements);

     if(plannedCoursesObjs){
        
        
        
        

     }


    // for (type in degreeProgress.Requirements) {
    //     let planData = {};
    //     let plancourses =[];
    //     planData["creditType"] = type;
    //     planData["creditsRemaining"] = degreeProgress.Requirements[type][0];
    //     // console.log(type);
    //     // console.log(degreeProgress.Requirements[type][0]);
    //     for (let plannedCoursesObj of plannedCoursesObjs) {
    //         if (plannedCoursesObj.type === type) {
    //             // console.log(plannedCoursesObj);

    //             planData["creditsRemaining"] -= plannedCoursesObj.credits;
    //             // console.log("planData.creditsRemaining",planData.creditsRemaining);
    //             // console.log("remaining credits",planData["creditsRemaining"]);
    //             plancourses.push(plannedCoursesObj);
    //         }
    //     }
    //     planData["creditsRemaining"] = [planData.creditsRemaining, degreeProgress.Requirements[type][1]];
    //     planData["selectedCourses"] = plancourses;
    //     coursePlan.push(planData);

    // }

    

    // console.log("COURSEPLAN:::> ",coursePlan);

    return coursePlan;

}


module.exports = { getCoursePlanAdmin };



