var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import Popover from 'material-ui/Popover';
import Typography from 'material-ui/Typography';
import request from 'superagent';

var METADATA_SERVICE = process.env.REACT_APP_METADATA_SERVICE;

var Glossary = function (_React$Component) {
  _inherits(Glossary, _React$Component);

  function Glossary(props) {
    _classCallCheck(this, Glossary);

    var _this = _possibleConstructorReturn(this, (Glossary.__proto__ || Object.getPrototypeOf(Glossary)).call(this, props));

    _this.handlePopoverOpen = function (event) {
      if (_this.state.definition) {
        _this.setState({ anchor: event.target });
      } else {
        event.persist();
        request.get(METADATA_SERVICE + '/glossary/search?id=' + _this.props.node.data.get('id')).then(function (res) {
          _this.setState({
            anchor: event.target,
            definition: res.body.definition
          });
        }).catch(function (err) {
          return console.log(new Error(err));
        });
      }
    };

    _this.handlePopoverClose = function () {
      _this.setState({ anchor: null });
    };

    _this.state = {
      definition: null,
      anchor: null
    };

    _this.handlePopoverClose = _this.handlePopoverClose.bind(_this);
    _this.handlePopoverOpen = _this.handlePopoverOpen.bind(_this);
    return _this;
  }

  _createClass(Glossary, [{
    key: 'render',
    value: function render() {
      var data = this.props.node.data;
      var _props = this.props,
          attributes = _props.attributes,
          children = _props.children;

      var id = data.get('id');
      var _state = this.state,
          anchor = _state.anchor,
          definition = _state.definition;

      var open = !!anchor;

      return React.createElement(
        'span',
        Object.assign({
          onMouseOver: this.handlePopoverOpen,
          onMouseOut: this.handlePopoverClose
        }, attributes, {
          id: id
        }),
        React.createElement(
          'span',
          null,
          children
        ),
        React.createElement(
          Popover,
          {
            open: open,
            anchorEl: anchor,
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left'
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left'
            },
            onRequestClose: this.handlePopoverClose
          },
          React.createElement(
            Typography,
            null,
            definition
          )
        )
      );
    }
  }]);

  return Glossary;
}(React.Component);

export default Glossary;
//# sourceMappingURL=node.js.map