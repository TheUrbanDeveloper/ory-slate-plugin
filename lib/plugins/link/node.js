import React from 'react';

var Link = function Link(_ref) {
  var attributes = _ref.attributes,
      children = _ref.children,
      node = _ref.node;
  var data = node.data;

  var href = data.get('href');

  return React.createElement(
    'a',
    Object.assign({}, attributes, { href: href }),
    children
  );
};

export default Link;
//# sourceMappingURL=node.js.map