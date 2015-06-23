CREATE (wies:User:_User {name: 'Wies'})
CREATE (aster:User:_User {name: 'Aster'})

CREATE (mathCategory:Category:_Category {
    name: "math",
    title: "Rekenen",
    imagePath: "images/mathMenuItem.png",
    grouping: "3,3,3,1"
})
CREATE (readingCategory:Category:_Category {
    name: "reading",
    title: "Lezen",
    imagePath: "images/readingMenuItem.png",
    grouping: "2,3,1"
})
CREATE (writingCategory:Category:_Category {
    name: "writing",
    title: "Schrijven",
    imagePath: "images/writingMenuItem.png",
    grouping: "2,1,2"
})

CREATE (math_numbers_lesson_1to3:LearningActivity:Lesson:_Lesson {
    title: 'De getallen 1, 2 en 3',
    subTitle: '',
    path: 'math/numbers/lesson',
    pathParamsAsJSON: '{"min": "1", "max": "3", "style": "apple"}',
    styleProperties: '{"icon": "activity-icon-1", "color": "blue"}'
})

CREATE (math_numbers_exercise_1to3_fromgraphic:LearningActivity:Exercise:_Exercise {
    title: 'De getallen 1, 2 en 3',
    subTitle: '',
    path: 'math/numbers/exercise',
    pathParamsAsJSON: '{"min": "1", "max": "3", "style": "apple", "direction": "fromgraphic", "length": "6"}',
    styleProperties: '{"icon": "activity-icon-1", "color": "blue"}'
})

CREATE (math_numbers_exercise_1to3_fromnumber:LearningActivity:Exercise:_Exercise {
    title: 'De getallen 1, 2 en 3',
    subTitle: '',
    path: 'math/numbers/exercise',
    pathParamsAsJSON: '{"min": "1", "max": "3", "style": "ijsjes", "direction": "fromnumber", "length": "6"}',
    styleProperties: '{"icon": "activity-icon-1", "color": "blue"}'
})

CREATE (math_numbers_lesson_4to6:LearningActivity:Lesson:_Lesson {
    title: 'De getallen 4, 5 en 6',
    subTitle: '',
    path: 'math/numbers/lesson',
    pathParamsAsJSON: '{"min": "4", "max": "6", "style": "apple"}',
    styleProperties: '{"icon": "activity-icon-2", "color": "blue"}'
})

CREATE (math_numbers_exercise_4to6_fromgraphic:LearningActivity:Exercise:_Exercise {
    title: 'De getallen 4, 5 en 6',
    subTitle: '',
    path: 'math/numbers/exercise',
    pathParamsAsJSON: '{"min": "4", "max": "6", "style": "apple", "direction": "fromgraphic", "length": "6"}',
    styleProperties: '{"icon": "activity-icon-2", "color": "blue"}'
})

CREATE (math_numbers_exercise_4to6_fromnumber:LearningActivity:Exercise:_Exercise {
    title: 'De getallen 4, 5 en 6',
    subTitle: '',
    path: 'math/numbers/exercise',
    pathParamsAsJSON: '{"min": "4", "max": "6", "style": "ijsjes", "direction": "fromnumber", "length": "6"}',
    styleProperties: '{"icon": "activity-icon-2", "color": "blue"}'
})

CREATE (math_numbers_lesson_7to9:LearningActivity:Lesson:_Lesson {
    title: 'De getallen 7, 8 en 9',
    subTitle: '',
    path: 'math/numbers/lesson',
    pathParamsAsJSON: '{"min": "7", "max": "9", "style": "apple"}',
    styleProperties: '{"icon": "activity-icon-3", "color": "blue"}'
})

CREATE (math_numbers_exercise_7to9_fromgraphic:LearningActivity:Exercise:_Exercise {
    title: 'De getallen 7, 8 en 9',
    subTitle: '',
    path: 'math/numbers/exercise',
    pathParamsAsJSON: '{"min": "7", "max": "9", "style": "apple", "direction": "fromgraphic", "length": "6"}',
    styleProperties: '{"icon": "activity-icon-3", "color": "blue"}'
})

CREATE (math_numbers_exercise_7to9_fromnumber:LearningActivity:Exercise:_Exercise {
    title: 'De getallen 7, 8 en 9',
    subTitle: '',
    path: 'math/numbers/exercise',
    pathParamsAsJSON: '{"min": "7", "max": "9", "style": "ijsjes", "direction": "fromnumber", "length": "6"}',
    styleProperties: '{"icon": "activity-icon-3", "color": "blue"}'
})

CREATE (math_numbers_test_1to9:LearningActivity:Exercise:_Exercise {
    title: 'De getallen 1 tot 9',
    subTitle: '',
    path: 'math/numbers/exercise',
    pathParamsAsJSON: '{"min": "1", "max": "9", "style": "ijsjes", "direction": "both", "length": "10"}',
    styleProperties: '{"icon": "activity-icon-4", "color": "blue"}'
})

/*
CREATE (mathExercise1:LearningActivity:Exercise:_Exercise {
    title: 'Optellen',
    subTitle: '1 tot 3',
    path: 'math',
    pathParamsAsJSON: '{"max": "3", "graphical": "true", "style": "apple", "subtraction": "false"}',
    styleProperties: '{"icon": "activity-icon-1", "color": "blue"}'
})
CREATE (mathExercise2:LearningActivity:Exercise:_Exercise {
    title: 'Optellen en aftrekken',
    subTitle: '1 tot 3',
    path: 'math',
    pathParamsAsJSON: '{"max": "3", "graphical": "true", "style": "ijsjes", "subtraction": "true"}'
})
CREATE (mathExercise3:LearningActivity:Exercise:_Exercise {
    title: 'Optellen en aftrekken',
    subTitle: '1 tot 3',
    path: 'math',
    pathParamsAsJSON: '{"max": "3", "withoutZero": "true", "subtraction": "true"}'
})
CREATE (mathExercise4:LearningActivity:Exercise:_Exercise {
    title: 'Optellen en aftrekken',
    subTitle: '0 tot 5',
    path: 'math',
    pathParamsAsJSON: '{"max": "5", "withoutZero": "false", "subtraction": "true"}'
})
CREATE (mathExercise5:LearningActivity:Exercise:_Exercise {
    title: 'Optellen en aftrekken',
    subTitle: '0 tot 8',
    path: 'math',
    pathParamsAsJSON: '{"max": "8", "withoutZero": "false", "subtraction": "true"}'
})
*/

CREATE (readingExercise1:LearningActivity:Exercise:_Exercise {
    title: 'Juist of Fout',
    subTitle: 'Makkelijk',
    path: 'reading',
    pathParamsAsJSON: '{}'
})

CREATE (writingExercise1:LearningActivity:Exercise:_Exercise {
    title: 'Schrijven',
    subTitle: 'Woordjes 1',
    path: 'writing',
    pathParamsAsJSON: '{"numberOfLettersKnown": "true"}'
})
CREATE (writingExercise2:LearningActivity:Exercise:_Exercise {
    title: 'Schrijven',
    subTitle: 'Woordjes 2',
    path: 'writing',
    pathParamsAsJSON: '{"numberOfLettersKnown": "false"}'
})

CREATE (mathCategory)-[:START]->(math_numbers_lesson_1to3)
CREATE (math_numbers_lesson_1to3)-[:NEXT]->(math_numbers_exercise_1to3_fromgraphic)
CREATE (math_numbers_exercise_1to3_fromgraphic)-[:NEXT]->(math_numbers_exercise_1to3_fromnumber)
CREATE (math_numbers_exercise_1to3_fromnumber)-[:NEXT]->(math_numbers_lesson_4to6)
CREATE (math_numbers_lesson_4to6)-[:NEXT]->(math_numbers_exercise_4to6_fromgraphic)
CREATE (math_numbers_exercise_4to6_fromgraphic)-[:NEXT]->(math_numbers_exercise_4to6_fromnumber)
CREATE (math_numbers_exercise_4to6_fromnumber)-[:NEXT]->(math_numbers_lesson_7to9)
CREATE (math_numbers_lesson_7to9)-[:NEXT]->(math_numbers_exercise_7to9_fromgraphic)
CREATE (math_numbers_exercise_7to9_fromgraphic)-[:NEXT]->(math_numbers_exercise_7to9_fromnumber)
CREATE (math_numbers_exercise_7to9_fromnumber)-[:NEXT]->(math_numbers_test_1to9)

// CREATE (mathCategory)-[:START]->(mathExercise1)
// CREATE (mathExercise1)-[:NEXT]->(mathExercise2)
// CREATE (mathExercise2)-[:NEXT]->(mathExercise3)
// CREATE (mathExercise3)-[:NEXT]->(mathExercise4)
// CREATE (mathExercise4)-[:NEXT]->(mathExercise5)

CREATE (readingCategory)-[:START]->(readingExercise1)

CREATE (writingCategory)-[:START]->(writingExercise1)
CREATE (writingExercise1)-[:NEXT]->(writingExercise2)
