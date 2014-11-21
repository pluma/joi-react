# Synopsis

**joi-react** is a tiny wrapper to convert [joi](https://github.com/hapijs/joi) schemas into [React](https://github.com/facebook/react) PropType validators.

[![license - MIT](https://img.shields.io/npm/l/joi-react.svg)](https://foss-haas.mit-license.org) [![Dependencies](https://img.shields.io/david/foss-haas/joi-react.svg)](https://david-dm.org/foss-haas/joi-react)

[![NPM status](https://nodei.co/npm/joi-react.png?compact=true)](https://npmjs.org/package/joi-react)

[![Build Status](https://img.shields.io/travis/foss-haas/joi-react.svg)](https://travis-ci.org/foss-haas/joi-react) [![Coverage Status](https://img.shields.io/coveralls/foss-haas/joi-react.svg)](https://coveralls.io/r/foss-haas/joi-react?branch=master)

# Install

## Node.js

### With NPM

```sh
npm install joi-react
```

### From source

```sh
git clone https://github.com/foss-haas/joi-react.git
cd joi-react
npm install
npm run test && npm run dist
```

# API

## joiToPropType(joiSchema):Function

Takes a joi schema and returns a React PropType.

Example:

```js
var joi = require('joi');
var joiToPropType = require('joi-react');
var React = require('react');
var starsSchema = joi.number().integer().min(1).max(5).required();
var starsPropType = joiToPropType(starsSchema);

var Rating = React.createClass({
  displayName: 'Rating',
  propTypes: {
    stars: starsPropType
  },
  render: function () {
    var stars = [];
    for (var i = 0; i < this.props.stars; i++) {
      stars.push(React.createElement('img', {src: 'star.png'}));
    }
    return stars;
  };
});

React.renderToString(React.createElement(Rating));
// -> Warning: value is required
React.renderToString(React.createElement(Rating, {stars: 0}));
// -> Warning: value must be larger than or equal to 1
React.renderToString(React.createElement(Rating, {stars: 6}));
// -> Warning: value must be less than or equal to 5
React.renderToString(React.createElement(Rating, {stars: 5}));
// no warnings
```

# License

The MIT/Expat license. For more information, see http://foss-haas.mit-license.org/ or the accompanying [LICENSE](https://github.com/foss-haas/joi-react/blob/master/LICENSE) file.