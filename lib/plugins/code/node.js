import React from 'react';

var Code = function Code(_ref) {
  var attributes = _ref.attributes,
      children = _ref.children;
  return React.createElement(
    'pre',
    Object.assign({}, attributes, { style: { overflow: 'scroll' } }),
    React.createElement(
      'code',
      null,
      children
    )
  );
};

export default Code;
//# sourceMappingURL=node.js.map