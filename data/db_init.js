var toIds = function(obj) {
  return obj._id;  
};

conn = new Mongo();
db = conn.getDB("test");

db.getCollectionNames()
        .forEach(function(c) { 
            if (c.indexOf("system.") === -1) db[c].drop(); 
        });

db.user.insert({name: 'wies'}, function(err,docsInserted){
    printjson(docsInserted);
});

db.user.insert({name: 'aster'});

var mathTests = [
    {
        _id: ObjectId(),
        title: 'Optellen',
        subTitle: '1 tot 3',
        path: 'math',
        pathParams: [
            {name: 'max', value: '3'},
            {name: 'graphical', value: 'true'},
            {name: 'style', value: 'apple'},
            {name: 'subtraction', value: 'false'}
        ]
    },
    {
        _id: ObjectId(),
        title: 'Optellen en aftrekken',
        subTitle: '1 tot 3',
        path: 'math',
        pathParams: [
            {name: 'max', value: '3'},
            {name: 'graphical', value: 'true'},
            {name: 'style', value: 'ijsjes'},
            {name: 'subtraction', value: 'true'}
        ]
    },
    {
        _id: ObjectId(),
        title: 'Optellen en aftrekken',
        subTitle: '1 tot 3',
        path: 'math',
        pathParams: [
            {name: 'max', value: '3'},
            {name: 'withoutZero', value: 'true'},
            {name: 'subtraction', value: 'true'}
        ]
    }, {
        _id: ObjectId(),
        title: 'Optellen en aftrekken',
        subTitle: '0 tot 5',
        path: 'math',
        pathParams: [
            {name: 'max', value: '5'},
            {name: 'withoutZero', value: 'false'},
            {name: 'subtraction', value: 'true'}
        ]
    }, {
        _id: ObjectId(),
        title: 'Optellen en aftrekken',
        subTitle: '0 tot 8',
        path: 'math',
        pathParams: [
            {name: 'max', value: '8'},
            {name: 'withoutZero', value: 'false'},
            {name: 'subtraction', value: 'true'}
        ]
    }];

db.test.insert(mathTests);

var readingTests = [
    {
        _id: ObjectId(),
        title: 'Juist of Fout',
        subTitle: 'Makkelijk',
        path: 'reading',
        pathParams: []
    }];

db.test.insert(readingTests);

var writingTests = [
    {
        _id: ObjectId(),
        title: 'Schrijven',
        subTitle: 'Woordjes 1',
        path: 'writing',
        pathParams: [{name: 'numberOfLettersKnown', value: 'true'}]
    }, {
        _id: ObjectId(),
        title: 'Schrijven',
        subTitle: 'Woordjes 2',
        path: 'writing',
        pathParams: [{name: 'numberOfLettersKnown', value: 'false'}]
    }];

db.test.insert(writingTests);


db.category.insert({
    title: "Rekenen",
    imagePath: "images/mathMenuItem.png",
    testIds: mathTests.map(toIds)
});
db.category.insert({
    title: "Lezen",
    imagePath: "images/readingMenuItem.png",
    testIds: readingTests.map(toIds)
});
db.category.insert({
    title: "Schrijven",
    imagePath: "images/writingMenuItem.png",
    testIds: writingTests.map(toIds)
});
