CREATE (wies:User {name: 'Wies'})
CREATE (aster:User {name: 'Aster'})

CREATE (mathCategory:Category {
    name: "math",
    title: "Rekenen",
    imagePath: "images/mathMenuItem.png"
})
CREATE (readingCategory:Category {
    name: "reading",
    title: "Lezen",
    imagePath: "images/readingMenuItem.png"
})
CREATE (writingCategory:Category {
    name: "writing",
    title: "Schrijven",
    imagePath: "images/writingMenuItem.png"
})

CREATE (mathTest1:Test {
    title: 'Optellen',
    subTitle: '1 tot 3',
    path: 'math',
    pathParams: '[{name: \'max\', value: \'3\'}, {name: \'graphical\', value: \'true\'}, {name: \'style\', value: \'apple\'}, {name: \'subtraction\', value: \'false\'}]'
})
CREATE (mathTest2:Test {
    title: 'Optellen en aftrekken',
    subTitle: '1 tot 3',
    path: 'math',
    pathParams: '[{name: \'max\', value: \'3\'}, {name: \'graphical\', value: \'true\'}, {name: \'style\', value: \'ijsjes\'}, {name: \'subtraction\', value: \'true\'}]'
})
CREATE (mathTest3:Test {
    title: 'Optellen en aftrekken',
    subTitle: '1 tot 3',
    path: 'math',
    pathParams: '[{name: \'max\', value: \'3\'}, {name: \'withoutZero\', value: \'false\'}, {name: \'subtraction\', value: \'true\'}]'
})
CREATE (mathTest4:Test {
    title: 'Optellen en aftrekken',
    subTitle: '1 tot 3',
    path: 'math',
    pathParams: '[{name: \'max\', value: \'3\'}, {name: \'withoutZero\', value: \'false\'}, {name: \'subtraction\', value: \'true\'}]'
})
CREATE (mathTest5:Test {
    title: 'Optellen en aftrekken',
    subTitle: '0 tot 5',
    path: 'math',
    pathParams: '[{name: \'max\', value: \'5\'}, {name: \'withoutZero\', value: \'false\'}, {name: \'subtraction\', value: \'true\'}]'
})
CREATE (mathTest6:Test {
    title: 'Optellen en aftrekken',
    subTitle: '0 tot 5',
    path: 'math',
    pathParams: '[{name: \'max\', value: \'5\'}, {name: \'withoutZero\', value: \'false\'}, {name: \'subtraction\', value: \'true\'}]'
})
CREATE (mathTest7:Test {
    title: 'Optellen en aftrekken',
    subTitle: '0 tot 8',
    path: 'math',
    pathParams: '[{name: \'max\', value: \'8\'}, {name: \'withoutZero\', value: \'false\'}, {name: \'subtraction\', value: \'true\'}]'
})

CREATE (readingTest1:Test {
    title: 'Juist of Fout',
    subTitle: 'Makkelijk',
    path: 'reading',
    pathParams: '[]'
})

CREATE (writingTest1:Test {
    title: 'Schrijven',
    subTitle: 'Woordjes 1',
    path: 'writing',
    pathParams: '[{name: \'numberOfLettersKnown\', value: \'true\'}]'
})
CREATE (writingTest2:Test {
    title: 'Schrijven',
    subTitle: 'Woordjes 2',
    path: 'writing',
    pathParams: '[{name: \'numberOfLettersKnown\', value: \'false\'}]'
})


CREATE (mathTest1)-[r:PART_OF]->(mathCategory)
CREATE (mathTest2)-[r1:PART_OF]->(mathCategory)
CREATE (mathTest3)-[r2:PART_OF]->(mathCategory)
CREATE (mathTest4)-[r3:PART_OF]->(mathCategory)
CREATE (mathTest5)-[r4:PART_OF]->(mathCategory)
CREATE (mathTest6)-[r5:PART_OF]->(mathCategory)
CREATE (mathTest7)-[r6:PART_OF]->(mathCategory)

CREATE (readingTest1)-[r7:PART_OF]->(readingCategory)

CREATE (writingTest1)-[r8:PART_OF]->(writingCategory)
CREATE (writingTest2)-[r9:PART_OF]->(writingCategory)
