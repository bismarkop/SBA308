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

function getLearnerID(submissions, id) {
    for (let i = 0; i < submissions.length; i++) {
        if (submissions[i].learner_id === id) {
            return id
        }
    }
}
getLearnerID(LearnerSubmissions, 132)


// Get the learner’s total, weighted average, in which assignments with more points_possible should be counted for more e.g. a learner with 50/100 on one assignment and 190/200 on another would have a weighted average score of 240/300 = 80%. Each assignment should have a key with its ID and the value associated with it should be the percentage that the learner scored on the assignment (submission.score / points_possible)

function getWeightedAvg(submissions, assignmentGroup) {
    // Total points
    let totalPointsPossible = assignmentGroup.reduce((sum, assignment) => sum + assignment.points_possible, 0)

    // Group submissions by learner ID
    let learnerSubmissionIDs = submissions.reduce((accumulator, submission) => {
        if (!accumulator[submission.learner_id]) {
            accumulator[submission.learner_id] = []
        }
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
        let weightedAvg = (totalWeightedScore / totalPointsPossible) * 100
        results[learnerID] = weightedAvg
    }
    return results
}

let weightedAvgs = getWeightedAvg(LearnerSubmissions, AssignmentGroup.assignments)
console.log(weightedAvgs)

// Total weigted average = actual score totals / total points possible

// Each assignment should have a key with its ID (1, 2, or 3) and the value of the learner's score on that particular assignment = 1: .90, 2: .87



// getLearnerAvg(LearnerSubmissions, getLearnerID(LearnerSubmissions, 132), AssignmentGroup)

//     <assignment_id>: number,
// if an assignment is not yet due, it should not be included in either
// the average or the keyed dictionary of scores
// }



// If an AssignmentGroup does not belong to its course (mismatching course_id), your program should throw an error, letting the user know that the input was invalid. Similar data validation should occur elsewhere within the program.


//            ***** Error Check Functions *****
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

function checkPoints() {

}
//            ***** Error Check Functions End *****

/* Create a function named getLearnerData() that accepts these values as parameters, in the order listed: (CourseInfo, AssignmentGroup, [LearnerSubmission]), and returns the formatted result, which should be an array of objects as described above. You may use as many helper functions as you see fit.*/

function getLearnerData(courseInfo, assignmentGroup, [learnerSubmission]) {
    return {
        id: id,
        avg: number,
        assignment_id: number
    }
}