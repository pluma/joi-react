/*jshint node: true */
/*global describe, it, beforeEach, afterEach */
'use strict';
var expect = require('expect.js');
var joi = require('joi');
var React = require('react');
var joiToPropType = require('../');

describe('joiToPropType', function () {
  it('is a function', function () {
    expect(joiToPropType).to.be.a('function');
  });
  it('returns a function', function () {
    expect(joiToPropType()).to.be.a('function');
  });
  describe('during validation', function () {
    var warn, warnings;
    beforeEach(function () {
      warn = console.warn;
      warnings = [];
      console.warn = function () {
        warnings.push(Array.prototype.join.call(arguments, ' '));
      };
    });
    afterEach(function () {
      console.warn = warn;
    });
    describe('when the prop is invalid', function () {
      it('makes React log a warning', function () {
        var schema = joi.forbidden();
        var value = true;
        var expectedWarning = schema.validate(value).error.message;
        expect(expectedWarning.replace(/\w/g, '')).not.to.be.empty();
        var Component = React.createClass({
          propTypes: {
            invalid: joiToPropType(schema)
          },
          render: function () {
            return React.createElement('div');
          }
        });
        React.renderToString(React.createElement(Component, {invalid: true}));
        expect(warnings.length).to.equal(1);
        expect(warnings[0]).to.contain(expectedWarning);
      });
    });
    describe('when the prop is missing', function () {
      it('makes React log a warning', function () {
        var schema = joi.any().required();
        var expectedWarning = schema.validate(undefined).error.message;
        expect(expectedWarning.replace(/\w/g, '')).not.to.be.empty();
        var Component = React.createClass({
          propTypes: {
            invalid: joiToPropType(schema)
          },
          render: function () {
            return React.createElement('div');
          }
        });
        React.renderToString(React.createElement(Component));
        expect(warnings.length).to.equal(1);
        expect(warnings[0]).to.contain(expectedWarning);
      });
    });
    describe('when the prop is valid', function () {
      it('nothing happens', function () {
        var schema = joi.any();
        var Component = React.createClass({
          propTypes: {
            valid: joiToPropType(schema)
          },
          render: function () {
            return React.createElement('div');
          }
        });
        React.renderToString(React.createElement(Component, {valid: true}));
        expect(warnings.length).to.equal(0);
      });
    });
  });
});