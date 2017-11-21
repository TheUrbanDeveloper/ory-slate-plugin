'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
/* eslint-disable no-unused-vars */


/**
 * @class this is the base class for slate plugins
 */
var Plugin = function Plugin() {
  _classCallCheck(this, Plugin);

  this.nodes = {};
  this.marks = {};
  this.plugins = [];

  this.onKeyDown = function (e, data, state) {
    return null;
  };

  this.hoverButtons = [];
  this.toolbarButtons = [];
}
/**
 * @member a unique identifier of the plugin
 */


/**
* @member the nodes to be added to the schema
*/


/**
 * @member the marks to be added to the schema
 */


/**
 * @member the slate plugins added to the editor
 */


/**
 * @member serialize a plugin's state to html
 */


/**
 * @member serialize a plugin's state from html
 */


/**
 * This handler is called when any key is pressed
 *
 * @param e the keydown event
 * @param data utilities for hotkey logic
 * @param state the current editor state
 * @returns the new editor state if the plugin handles the hotkey
 */


/**
 * @member the buttons to be added to the hover menu
 */


/**
 * @member the buttons to be added to the global toolbar
 */
;

exports.default = Plugin;
//# sourceMappingURL=Plugin.js.map