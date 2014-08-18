/**
 * An error in assertion setup.
 *
 * @param {Assertion} assertion The assertion that was wrongly configured.
 * @param {string}    [message]   The message to error.
 *
 * TODO: test me!
 * TODO: write me!
 * TODO: throw me!
 *
 * @extends Error
 *
 * @constructor
 */
var AssertionError = function(assertion, message) {
    Error.call(this, message);
    this._assertion = assertion;
};

AssertionError.prototype = Object.create(Error.prototype);

module.exports = AssertionError;