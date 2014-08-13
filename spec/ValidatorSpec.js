var expect = require('chai').expect,
    Validator = require('../lib/Validator'),
    ValidationError = require('../lib/ValidationError');



describe('Validator', function() {

    var validator, assertTypeOf, assertInstanceOf, shouldThrow,
        assertHasProperty, assertPropertyTypeOf, assertPropertyInstanceOf;

    beforeEach(function() {

        validator = new Validator();

        shouldThrow = function(fn, expectedError) {
            if (expectedError) {
                expect(fn).to.throw(expectedError);
            } else {
                expect(fn).to.not.throw('nothing');
            }
        };

        assertTypeOf = function(value, type, expectedError) {
            var assertFn;
            assertFn = function() {
                validator.assertTypeOf(value, type, 'Test validation error')
            };
            shouldThrow(assertFn, expectedError);
        };

        assertInstanceOf = function(value, instance, expectedError) {
            var assertFn;
            assertFn = function() {
                validator.assertInstanceOf(value, instance, 'TestType', 'Test validation error');
            };
            shouldThrow(assertFn, expectedError);
        };

        assertHasProperty = function(value, property, expectedError) {
            var assertFn;
            assertFn = function() {
                validator.assertHasProperty(value, property, 'Test validation error');
            };
            shouldThrow(assertFn, expectedError);
        };

        assertPropertyInstanceOf = function(value, property, type, expectedError) {
            var assertFn;
            assertFn = function() {
                validator.assertPropertyInstanceOf(value, property, type, 'TestType', 'Test validation error');
            };
            shouldThrow(assertFn, expectedError);
        };


        assertPropertyTypeOf = function(value, property, type, expectedError) {
            var assertFn;
            assertFn = function() {
                validator.assertPropertyTypeOf(value, property, type, 'Test validation error');
            };
            shouldThrow(assertFn, expectedError);
        };

    });

    it('should be initialisable', function() {
        expect(validator).to.be.instanceOf(Validator);
    });

    describe('typeof assertions', function() {

        var failingAssertions, passingAssertions;

        failingAssertions = function()
        {
            assertTypeOf(123, 'string', ValidationError);
            assertTypeOf(true, 'string', ValidationError);
            assertTypeOf({}, 'string', ValidationError);
            assertTypeOf([], 'string', ValidationError);
            assertTypeOf(function() {}, 'string', ValidationError);
            assertTypeOf('123', 'number', ValidationError);
            assertTypeOf(false, 'number', ValidationError);
            assertTypeOf({}, 'number', ValidationError);
            assertTypeOf([], 'number', ValidationError);
            assertTypeOf(function() {}, 'number', ValidationError);
            assertTypeOf('123', 'object', ValidationError);
            assertTypeOf(false, 'object', ValidationError);
            assertTypeOf(123, 'object', ValidationError);
            assertTypeOf(function() {}, 'object', ValidationError);
            assertTypeOf('123', 'function', ValidationError);
            assertTypeOf(false, 'function', ValidationError);
            assertTypeOf({}, 'function', ValidationError);
            assertTypeOf([], 'function', ValidationError);
            assertTypeOf(123, 'function', ValidationError);
            assertTypeOf('123', 'boolean', ValidationError);
            assertTypeOf(123, 'boolean', ValidationError);
            assertTypeOf({}, 'boolean', ValidationError);
            assertTypeOf([], 'boolean', ValidationError);
            assertTypeOf(function() {}, 'boolean', ValidationError);
        };

        passingAssertions = function()
        {
            assertTypeOf(123, 'number');
            assertTypeOf(0.3, 'number');
            assertTypeOf(0.12e8, 'number');
            assertTypeOf(null, 'object');
            assertTypeOf(undefined, 'undefined');
            assertTypeOf('123', 'string');
            assertTypeOf('', 'string');
            assertTypeOf({}, 'object');
            assertTypeOf([], 'object');
            assertTypeOf(function() {}, 'function');
            assertTypeOf(true, 'boolean');
            assertTypeOf(false, 'boolean');

        };

        it('should throw when asserting typeof on a value not of that type', function() {
            failingAssertions();
        });

        it('should not throw when asserting typeof on a value of that type', function() {
            passingAssertions();
        });

        describe('instance of tests', function() {

            var TestConstructor, SubConstructor;

            beforeEach(function() {
                TestConstructor = function() {};
                SubConstructor = function() {};
                SubConstructor.prototype = Object.create(TestConstructor.prototype);
            });

            it('should throw when provided not an instance of', function() {
                assertInstanceOf({}, TestConstructor, ValidationError);
                assertInstanceOf(123, SubConstructor, ValidationError);
                assertInstanceOf('123', SubConstructor, ValidationError);
                assertInstanceOf(true, SubConstructor, ValidationError);
                assertInstanceOf([], SubConstructor, ValidationError);
                assertInstanceOf(function() {}, SubConstructor, ValidationError);
            });

            it('should throw when provided an instance of', function() {
                assertInstanceOf(new TestConstructor(), TestConstructor);
                assertInstanceOf(new SubConstructor(), TestConstructor);
                assertInstanceOf(new SubConstructor(), SubConstructor);
            });

            it('should throw when asserting property instance when not that instance', function() {
                assertPropertyInstanceOf({foo: 'bar'}, 'foo', TestConstructor, ValidationError);
                assertPropertyInstanceOf({foo: 'bar'}, 'foo', SubConstructor, ValidationError);
                assertPropertyInstanceOf({foo: {}}, 'foo', TestConstructor, ValidationError);
                assertPropertyInstanceOf(null, 'foo', TestConstructor, ValidationError);
            });

            it('should not throw when asserting property instance when that instance', function() {
                assertPropertyInstanceOf({foo: new TestConstructor()}, 'foo', TestConstructor);
                assertPropertyInstanceOf({foo: new SubConstructor()}, 'foo', TestConstructor);
                assertPropertyInstanceOf({foo: new SubConstructor()}, 'foo', SubConstructor);
            });

        });

    });

    describe('property assertions', function() {

        it('should not throw when asserting object has property', function() {
            assertHasProperty({foo: 'bar'}, 'foo');
            assertHasProperty((function() {}).foo = 'bar', 'foo');
            assertHasProperty([].foo = 'bar', 'foo');
        });

        it('should throw when asserting object does not have property', function() {
            assertHasProperty({}, 'foo', ValidationError);
            assertHasProperty((function() {}), 'foo', ValidationError);
            assertHasProperty([], 'foo', ValidationError);
            assertHasProperty(false, 'foo', ValidationError);
            assertHasProperty(123, 'foo', ValidationError);
            assertHasProperty('123', 'foo', ValidationError);
            assertHasProperty(null, 'foo', ValidationError);
            assertHasProperty(undefined, 'foo', ValidationError);
        });

        it('should throw when asserting object type of when not that type', function() {
            assertPropertyTypeOf({foo: 'bar'}, 'foo', 'function', ValidationError);
            assertPropertyTypeOf({foo: 'bar'}, 'foo', 'number', ValidationError);
            assertPropertyTypeOf({foo: 'bar'}, 'foo', 'boolean', ValidationError);
            assertPropertyTypeOf({foo: 'bar'}, 'foo', 'object', ValidationError);
            assertPropertyTypeOf({foo: {}}, 'foo', 'string', ValidationError);
            assertPropertyTypeOf({foo: {}}, 'foo', 'number', ValidationError);
            assertPropertyTypeOf({foo: {}}, 'foo', 'function', ValidationError);
            assertPropertyTypeOf({foo: {}}, 'foo', 'boolean', ValidationError);
            assertPropertyTypeOf({foo: null}, 'foo', 'string', ValidationError);
            assertPropertyTypeOf({}, 'foo', 'string', ValidationError);
        });

        it('should not throw when asserting object type of when that type', function() {
            assertPropertyTypeOf({foo: 'bar'}, 'foo', 'string');
            assertPropertyTypeOf({foo: 123}, 'foo', 'string');
            assertPropertyTypeOf({foo: {}}, 'foo', 'object');
            assertPropertyTypeOf({foo: []}, 'foo', 'object');
            assertPropertyTypeOf({foo: null}, 'foo', 'object');
            assertPropertyTypeOf({foo: undefined}, 'foo', 'undefined');
        });

    });

});