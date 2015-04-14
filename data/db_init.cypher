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

CREATE (mathTest1:Test:_Test {
    title: 'Optellen',
    subTitle: '1 tot 3',
    path: 'math',
    pathParams: '{"max": "3", "graphical": "true", "style": "apple", "subtraction": "false"}'
})
CREATE (mathTest2:Test:_Test {
    title: 'Optellen en aftrekken',
    subTitle: '1 tot 3',
    path: 'math',
    pathParams: '{"max": "3", "graphical": "true", "style": "ijsjes", "subtraction": "true"}'
})
CREATE (mathTest3:Test:_Test {
    title: 'Optellen en aftrekken',
    subTitle: '1 tot 3',
    path: 'math',
    pathParams: '{"max": "3", "withoutZero": "true", "subtraction": "true"}'
})
CREATE (mathTest4:Test:_Test {
    title: 'Optellen en aftrekken',
    subTitle: '0 tot 5',
    path: 'math',
    pathParams: '{"max": "5", "withoutZero": "false", "subtraction": "true"}'
})
CREATE (mathTest5:Test:_Test {
    title: 'Optellen en aftrekken',
    subTitle: '0 tot 8',
    path: 'math',
    pathParams: '{"max": "8", "withoutZero": "false", "subtraction": "true"}'
})

CREATE (readingTest1:Test:_Test {
    title: 'Juist of Fout',
    subTitle: 'Makkelijk',
    path: 'reading',
    pathParams: '{}'
})

CREATE (writingTest1:Test:_Test {
    title: 'Schrijven',
    subTitle: 'Woordjes 1',
    path: 'writing',
    pathParams: '{"numberOfLettersKnown": "true"}'
})
CREATE (writingTest2:Test:_Test {
    title: 'Schrijven',
    subTitle: 'Woordjes 2',
    path: 'writing',
    pathParams: '{"numberOfLettersKnown": "false"}'
})


CREATE (mathTest1)-[r:PART_OF]->(mathCategory)
CREATE (mathTest2)-[r1:PART_OF]->(mathCategory)
CREATE (mathTest3)-[r2:PART_OF]->(mathCategory)
CREATE (mathTest4)-[r3:PART_OF]->(mathCategory)
CREATE (mathTest5)-[r4:PART_OF]->(mathCategory)

CREATE (readingTest1)-[r7:PART_OF]->(readingCategory)

CREATE (writingTest1)-[r8:PART_OF]->(writingCategory)
CREATE (writingTest2)-[r9:PART_OF]->(writingCategory)
