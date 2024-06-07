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

// Get the learner’s total, weighted average, in which assignments with more points_possible should be counted for more e.g. a learner with 50/100 on one assignment and 190/200 on another would have a weighted average score of 240/300 = 80%. Each assignment should have a key with its ID and the value associated with it should be the percentage that the learner scored on the assignment (submission.score / points_possible)

// Each assignment should have a key with its ID (1, 2, or 3) and the value of the learner's score on that particular assignment = 1: .90, 2: .87

// if an assignment is not yet due, it should not be included in either
// the average or the keyed dictionary of scores
// } ---?? Come back to this

/* Create a function named getLearnerData() that accepts these values as parameters, in the order listed: (CourseInfo, AssignmentGroup, [LearnerSubmission]), and returns the formatted result, which should be an array of objects as described above. You may use as many helper functions as you see fit.*/



function getLearnerData (courseInfo, assignmentGroup, learnerSubmissions) {
    matchIds(CourseInfo, AssignmentGroup)
    // Make points possible more easily accessible
    const findPointsPossible = assignmentGroup.assignments.reduce ((map, assignment) => {
        map[assignment.id] = assignment.points_possible
        return map
    }, {})

    let finalGrades = {}

    learnerSubmissions.forEach(submission => {
        //Destructured code to get the information to show similar to the example
        const {learner_id, assignment_id, submission: {score}} = submission
        const pointsPossible = findPointsPossible[assignment_id]
        const percentageScore = (score / pointsPossible) * 100
        
        if (!finalGrades[learner_id]) {
            finalGrades[learner_id] = {}
        }

        finalGrades[learner_id][assignment_id] = percentageScore
    })
    return finalGrades
}

let finalGrades = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions)
console.log(finalGrades)




//            ***** Error Check Function *****
// If an AssignmentGroup does not belong to its course (mismatching course_id), your program should throw an error, letting the user know that the input was invalid. Similar data validation should occur elsewhere within the program.

//You should also account for potential errors in the data that your program receives. What if points_possible is 0? You cannot divide by zero. What if a value that you are expecting to be a number is instead a string? Use try/catch and other logic to handle these types of errors gracefully.


function matchIds(course, assignment) {
    try {
        if (course.id === assignment.course_id) {
            return
        } else {
            throw "The assignment ID does not match the course ID."
        }
    } catch (error) {
        console.log(error)
    }
}
// matchIds(CourseInfo, AssignmentGroup)


//            ***** Error Check Functions Section End *****


