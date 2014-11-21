/*jshint browserify: true */
'use strict';
module.exports = joiToPropType;

function joiToPropType(joiSchema) {
  return function joiPropType(props, propName) {
    return joiSchema.validate(props[propName]).error;
  };
}
