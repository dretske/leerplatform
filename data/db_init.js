var toIds = function(obj) {
  return obj._id;  
};

conn = new Mongo();
db = conn.getDB("prod");

db.getCollectionNames()
        .forEach(function(c) { 
            if (c.indexOf("system.") === -1) db[c].drop(); 
        });

db.user.insert({name: 'Wies'}, function(err,docsInserted){
    printjson(docsInserted);
});

db.user.insert({name: 'Aster'});

var mathCategory = {
    _id : ObjectId(), 
    name: "math",
    title: "Rekenen",
    imagePath: "images/mathMenuItem.png",
    subcategories: [
        {
            
        }
    ]
};
var readingCategory = {
    _id : ObjectId(), 
    name: "reading",
    title: "Lezen",
    imagePath: "images/readingMenuItem.png"
};
var writingCategory = {
    _id : ObjectId(), 
    name: "writing",
    title: "Schrijven",
    imagePath: "images/writingMenuItem.png"
};

db.category.insert(mathCategory);
db.category.insert(readingCategory);
db.category.insert(writingCategory);

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
        ],
        categoryId: mathCategory._id.valueOf()
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
        ],
        categoryId: mathCategory._id.valueOf()
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
        ],
        categoryId: mathCategory._id.valueOf()
    }, {
        _id: ObjectId(),
        title: 'Optellen en aftrekken',
        subTitle: '0 tot 5',
        path: 'math',
        pathParams: [
            {name: 'max', value: '5'},
            {name: 'withoutZero', value: 'false'},
            {name: 'subtraction', value: 'true'}
        ],
        categoryId: mathCategory._id.valueOf()
    }, {
        _id: ObjectId(),
        title: 'Optellen en aftrekken',
        subTitle: '0 tot 8',
        path: 'math',
        pathParams: [
            {name: 'max', value: '8'},
            {name: 'withoutZero', value: 'false'},
            {name: 'subtraction', value: 'true'}
        ],
        categoryId: mathCategory._id.valueOf()
    }];

var readingTests = [
    {
        _id: ObjectId(),
        title: 'Juist of Fout',
        subTitle: 'Makkelijk',
        path: 'reading',
        pathParams: [],
        categoryId: readingCategory._id.valueOf()
    }];

var writingTests = [
    {
        _id: ObjectId(),
        title: 'Schrijven',
        subTitle: 'Woordjes 1',
        path: 'writing',
        pathParams: [{name: 'numberOfLettersKnown', value: 'true'}],
        categoryId: writingCategory._id.valueOf()
    }, {
        _id: ObjectId(),
        title: 'Schrijven',
        subTitle: 'Woordjes 2',
        path: 'writing',
        pathParams: [{name: 'numberOfLettersKnown', value: 'false'}],
        categoryId: writingCategory._id.valueOf()
    }];

db.test.insert(mathTests);
db.test.insert(readingTests);
db.test.insert(writingTests);
