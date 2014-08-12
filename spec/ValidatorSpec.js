var expect = require('chai').expect,
    Validator = require('../lib/Validator'),
    ValidationError = require('../lib/ValidationError');



describe('Validator', function() {

    var validator, assertTypeOf, assertInstanceOf, shouldThrow;

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
                validator.assertInstanceOf(value, instance, 'Test validation error');
            };
            shouldThrow(assertFn, expectedError);
        }

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

        });

    });

});