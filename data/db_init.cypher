CREATE (wies:User:_User {name: 'Wies'})
CREATE (aster:User:_User {name: 'Aster'})

CREATE (mathCategory:Category:_Category {
    name: "math",
    title: "Rekenen",
    imagePath: "images/mathMenuItem.png"
})
CREATE (readingCategory:Category:_Category {
    name: "reading",
    title: "Lezen",
    imagePath: "images/readingMenuItem.png"
})
CREATE (writingCategory:Category:_Category {
    name: "writing",
    title: "Schrijven",
    imagePath: "images/writingMenuItem.png"
})

CREATE (mathExercise1:LearningActivity:Exercise:_Exercise {
    title: 'Optellen',
    subTitle: '1 tot 3',
    path: 'math',
    pathParamsAsJSON: '{"max": "3", "graphical": "true", "style": "apple", "subtraction": "false"}'
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

CREATE (mathCategory)-[r:START]->(mathExercise1)
CREATE (mathExercise1)-[r1:NEXT]->(mathExercise2)
CREATE (mathExercise2)-[r2:NEXT]->(mathExercise3)
CREATE (mathExercise3)-[r3:NEXT]->(mathExercise4)
CREATE (mathExercise4)-[r4:NEXT]->(mathExercise5)

CREATE (readingCategory)-[r5:START]->(readingExercise1)

CREATE (writingCategory)-[r6:START]->(writingExercise1)
CREATE (writingExercise1)-[r7:NEXT]->(writingExercise2)
