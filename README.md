# Type Validator
A simple library for providing runtime type safety. Encourages robust code when used to catch errors early.

## Installing

```
npm install type-validator
```
Add --save argument to add it to your package.json

The validator should be included where required:
```
var validator = require('type-validator').get();     // Gets a single-instance.
var validator = require('type-validator').create();  // Gets a new instance.
```

### Configuration
When creating or getting the validator for the first time, a config object is accepted.
```
var validator = require('type-validator').get({
    enabled: false,     // Will disable all validation checks (useful for production environments).
});
```

### Assertions

#### Type Of

```
// Directly on arguments.
MyConstructor.prototype.myFunction = function(incomingArg)
{
    validator.assert(incomingArg).typeOf('string', 'myFunction expects a string');
};

// With object properties.
MyConstructor.prototype.myFunction = function(incomingArgObj)
{
    validator.assert(incomingArgObj).hasProperty('foo').typeOf('string', 'myFunction expect object with property "foo" as number');
};
```

#### Instance Of

```
// Directly on arguments.
MyConstructor.prototype.myFunction = function(incomingArg)
{
    validator.assert(incomingArg).instanceOf(MyOtherConstructor, 'MyOtherConstructor', 'myFunction expects an instanceof MyOtherConstructor');
};

// With object properties.
MyConstructor.prototype.myFunction = function(incomingArgObj)
{
    validator.assert(incomingArgObj).hasProperty('foo').instanceOf('MyOtherConstructor', 'myFunction expect object with property "foo" as MyOtherConstructor');
};
```

#### Existence
You can chain property exists checks, optionally checking the type/instance at the end of the chain.
```
MyConstructor.prototype.myFunction = function(incomingArgObj)
{
    validator.assert(incomingArgObj)
        .hasProperty('foo')
        .hasProperty('bar')
        .hasProperty('baz')
        .elseThrow('myFunction expect object with property "foo" with property "bar" with property "baz"');
};

MyConstructor.prototype.myFunction = function(incomingArgObj)
{
    validator.assert(incomingArgObj)
        .hasProperty('foo')
        .hasProperty('bar')
        .hasProperty('baz')
        .instanceOf('MyOtherConstructor', 'myFunction expect object with property "foo" with property "bar" with property "baz" as MyOtherConstructor');
};
```

### Failure messages
All failing assertions will construct a message containing information about the failing assertions by default, but the failureMessage argument can be provided to give some context to the failing assertion.