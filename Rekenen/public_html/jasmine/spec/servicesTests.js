describe("rekenenServices tests", function () {

    var ExerciseGenerator;

    beforeEach(function () {
        jasmine.addMatchers(customMatchers);
        module('rekenenServices');

        inject(function (_ExerciseGenerator_) {
            // The injector unwraps the underscores (_) from around the parameter names when matching
            ExerciseGenerator = _ExerciseGenerator_;
        });
    });

    it("generateExercise - score starts at -1", function () {
        var exercise = ExerciseGenerator.generateExercise(1, 3);
        expect(exercise.score).toEqual(-1);
    });

    it("generateExercise - equation : constants no bigger than max constant size", function () {
        var maxConstantsSize = 5;
        expect(constantsFromNumberOfGeneratedExercises(100, maxConstantsSize))
                .toContainElementsNoLargerThan(maxConstantsSize);
    });

    it("generateExercise - equation : options contain all elements from minConstantSize to maxConstantSize", function () {
        expect(ExerciseGenerator.generateExercise(1, 3).options).toContain(1,2,3);
    });

    it("generateExercise - equation : correct answer sets score to 1", function () {
        var exercise = ExerciseGenerator.generateExercise(0, 4);
        exercise.enterAnswer(exercise.solution);
        expect(exercise.score).toEqual(1);
    });

    it("generateExercise - equation : incorrect answer sets score to 0", function () {
        var exercise = ExerciseGenerator.generateExercise(0, 4);
        exercise.enterAnswer(arrayValueDifferentFrom(exercise.options, exercise.solution));
        expect(exercise.score).toEqual(0);
    });
    
    function arrayValueDifferentFrom(values, notValue) {
        for (var i=0; i< values.length; i++) {
            if (values[i] !== notValue) {
                return values[i];
            }
        }
        return null;
    }
    
    function constantsFromNumberOfGeneratedExercises(numberOfExercises, maxConstantsSize) {
        var array = [];

        for(i=0; i<numberOfExercises; i++) {
            array = array.concat(constantsFromExercise(ExerciseGenerator.generateExercise(1, maxConstantsSize)));
        }

        return array;   
    }

    function constantsFromExercise(exercise) {
        return exercise.equation.lhsConstants.concat(exercise.equation.rhsConstants);
    }
    
});

