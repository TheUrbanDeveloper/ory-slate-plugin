var _jsxFileName = 'src/plugins/paragraph/node.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { Placeholder } from 'slate';
import { placeholder } from '../../const.js';
import shallowEqual from 'fbjs/lib/shallowEqual';

var Paragraph = function (_Component) {
  _inherits(Paragraph, _Component);

  function Paragraph() {
    _classCallCheck(this, Paragraph);

    return _possibleConstructorReturn(this, (Paragraph.__proto__ || Object.getPrototypeOf(Paragraph)).apply(this, arguments));
  }

  _createClass(Paragraph, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return !shallowEqual(this.props, nextProps);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          node = _props.node,
          state = _props.state,
          children = _props.children,
          attributes = _props.attributes;

      var align = this.props.node.data.get('align');
      return React.createElement(
        'p',
        Object.assign({}, attributes, { style: { textAlign: align }, __source: {
            fileName: _jsxFileName,
            lineNumber: 22
          },
          __self: this
        }),
        React.createElement(
          Placeholder,
          {
            className: 'ory-plugins-content-slate-paragraph-placeholder',
            node: node,
            parent: state.document,
            state: state,
            style: { top: 'auto', bottom: 'auto', left: 'auto', right: 'auto' },
            __source: {
              fileName: _jsxFileName,
              lineNumber: 23
            },
            __self: this
          },
          placeholder
        ),
        children
      );
    }
  }]);

  return Paragraph;
}(Component);

export default Paragraph;
//# sourceMappingURL=node.js.map