// You will create a script that gathers data, processes it, and then outputs a consistent result as described by a specification.


// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
        {
            id: 1,
            name: "Declare a Variable",
            due_at: "2023-01-25",
            points_possible: 50
        },
        {
            id: 2,
            name: "Write a Function",
            due_at: "2023-02-27",
            points_possible: 150
        },
        {
            id: 3,
            name: "Code the World",
            due_at: "3156-11-15",
            points_possible: 500
        }
    ]
};

// The provided learner submission data.
const LearnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-25",
            score: 47
        }
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-02-12",
            score: 150
        }
    },
    {
        learner_id: 125,
        assignment_id: 3,
        submission: {
            submitted_at: "2023-01-25",
            score: 400
        }
    },
    {
        learner_id: 132,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-24",
            score: 39
        }
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-03-07",
            score: 140
        }
    }
];




// Your goal is to analyze and transform this data such that the output of your program is an array of objects, each containing the following information in the following format:


// Get the ID of the learner for which this data has been collected
//Figure out how to remove duplicates******

function getLearnerID(submissions) {
    let student_id = []
    for (let i = 0; i < submissions.length; i++) {
        if (typeof (submissions[i].learner_id) === 'number') {
            student_id.push(submissions[i].learner_id)
        }
    }
    // Remove duplicates
    let uniqueLearnerID = []
        for (i = 0; i < student_id.length; i++) {
            if (uniqueLearnerID.indexOf(student_id[i]) === -1) {
                uniqueLearnerID.push(student_id[i]);
            }
        }
        return uniqueLearnerID;

}

let eachLearnerID = getLearnerID(LearnerSubmissions)
// console.log(eachLearnerID) 

// Get the learner’s total, weighted average, in which assignments with more points_possible should be counted for more e.g. a learner with 50/100 on one assignment and 190/200 on another would have a weighted average score of 240/300 = 80%. Each assignment should have a key with its ID and the value associated with it should be the percentage that the learner scored on the assignment (submission.score / points_possible)

function getWeightedAvg(submissions, assignmentGroup) {
    // Total points
    // This intializes totalPointsPossible to store the total points possible for all assignments in the group. reduce() is used to sum the points_possible values from all assignments in this assignmentGroup, 

    let totalPointsPossible = assignmentGroup.reduce((sum, assignment) => sum + assignment.points_possible, 0)

    // Group submissions by learner ID
    // This section creates an empty object (learnerSubmissionIDs) to store the submissions and is groupd by learner ID. This step creates a structure where learnerSubmissionIDs becomes and object containing the learner IDs as keys, and their respective submission array is values

    // This uses the reduce method to iterate over each submission in submissions (LearnerSubmissions in this case)
    let learnerSubmissionIDs = submissions.reduce((accumulator, submission) => {
        // If the learner_id is not already a key in LearnerSubmissionIDs, a new empty array is created for that learner_id 
        if (!accumulator[submission.learner_id]) {
            accumulator[submission.learner_id] = []
        }
        //The current submission is then pushed into the array associated with its learner_id
        accumulator[submission.learner_id].push(submission)
        return accumulator
    }, {})

    let results = {}

    // Get weighted average for each user
    for (let learnerID in learnerSubmissionIDs) {
        let learnerSubmissions = learnerSubmissionIDs[learnerID]
        let totalWeightedScore = 0

        learnerSubmissions.forEach(sub => {
            let assignment = assignmentGroup.find(a => a.id === sub.assignment_id)
            if (assignment) {
                totalWeightedScore += sub.submission.score
            }
        })
        // Turns weighted average into a percentage
        let weightedAvg = (totalWeightedScore / totalPointsPossible) * 100
        results[learnerID] = weightedAvg
    }
    return results
}

let weightedAvgs = getWeightedAvg(LearnerSubmissions, AssignmentGroup.assignments)
// console.log(weightedAvgs)

// *****************************COME BACK********************************************
// I couldn't figure out how to divide the scores by the points possible 
function assignmentScores(submissions, assignmentGroup) {
    // let keys = Object.keys(submissions)
    // let values = Object.values(submissions)
    let collectData = []

    // Get the grades of each learner
    let learnerSubmissionScores = submissions.reduce((acc, sub) => {
        if (!acc[sub.learner_id]) {
            acc[sub.learner_id] = []
        }
        acc[sub.learner_id].push(sub.submission.score)
        return acc
    }, {})
    console.log(learnerSubmissionScores) // { '125': [ 47, 150, 400 ], '132': [ 39, 140 ] }

    let results = {}
    // Get scores - sub score / points_possible
    for (let learnerID in learnerSubmissionScores) {
        let learnerScores = learnerSubmissionScores[learnerID]

        console.log(learnerScores)

    }
    return results

}
assignmentScores(LearnerSubmissions, AssignmentGroup.assignments)
// *************************************************************************


// Each assignment should have a key with its ID (1, 2, or 3) and the value of the learner's score on that particular assignment = 1: .90, 2: .87



// getLearnerAvg(LearnerSubmissions, getLearnerID(LearnerSubmissions, 132), AssignmentGroup)

//     <assignment_id>: number,
// if an assignment is not yet due, it should not be included in either
// the average or the keyed dictionary of scores
// }





//            ***** Error Check Functions *****
// If an AssignmentGroup does not belong to its course (mismatching course_id), your program should throw an error, letting the user know that the input was invalid. Similar data validation should occur elsewhere within the program.

//You should also account for potential errors in the data that your program receives. What if points_possible is 0? You cannot divide by zero. What if a value that you are expecting to be a number is instead a string? Use try/catch and other logic to handle these types of errors gracefully.


function matchIds(course, assignment) {
    try {
        if (course.id === assignment.course_id) {
            console.log('Valid')
        } else {
            throw "The assignment ID does not match the course ID."
        }
    } catch (error) {
        console.log(error)
    }
}
// matchIds(CourseInfo, AssignmentGroup)


//            ***** Error Check Functions Section End *****

/* Create a function named getLearnerData() that accepts these values as parameters, in the order listed: (CourseInfo, AssignmentGroup, [LearnerSubmission]), and returns the formatted result, which should be an array of objects as described above. You may use as many helper functions as you see fit.*/

function getLearnerData(courseInfo, assignmentGroup, [learnerSubmission]) {
    const result = []

    
    return {
        id: id,
        avg: number,
        assignment_id: number
    }
}