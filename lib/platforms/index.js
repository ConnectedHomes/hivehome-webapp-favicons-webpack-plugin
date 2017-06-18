'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _android = require('./android');

var _android2 = _interopRequireDefault(_android);

var _generic = require('./generic');

var _generic2 = _interopRequireDefault(_generic);

var _ios = require('./ios');

var _ios2 = _interopRequireDefault(_ios);

var _windows = require('./windows');

var _windows2 = _interopRequireDefault(_windows);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    android: _android2.default,
    ios: _ios2.default,
    generic: _generic2.default,
    windows: _windows2.default
};