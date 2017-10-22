
// FIXME #125: missing types for slate internals
/* eslint-disable new-cap, arrow-body-style, react/display-name */
import { List } from 'immutable';
import head from 'ramda/src/head';
import map from 'ramda/src/map';
import path from 'ramda/src/path';
import reduce from 'ramda/src/reduce';
import tail from 'ramda/src/tail';
import React from 'react';

import AlignmentPlugin from './plugins/alignment';
import BlockquotePlugin from './plugins/blockquote';
import IndentationPlugin from './plugins/indentation';
import CodePlugin from './plugins/code';
import EmphasizePlugin from './plugins/emphasize';
import HeadingsPlugin from './plugins/headings';
import LinkPlugin from './plugins/link';
import ListsPlugin from './plugins/lists';
import ParagraphPlugin, { P } from './plugins/paragraph';
import parse5 from 'parse5';

// FIXME #126
import { Document, Html, Raw, State, Plain } from 'slate';

var DEFAULT_NODE = P;

export var defaultPlugins = [new ParagraphPlugin(), new EmphasizePlugin(), new HeadingsPlugin({ DEFAULT_NODE: DEFAULT_NODE }), new LinkPlugin(), new CodePlugin({ DEFAULT_NODE: DEFAULT_NODE }), new ListsPlugin({ DEFAULT_NODE: DEFAULT_NODE }), new BlockquotePlugin({ DEFAULT_NODE: DEFAULT_NODE }), new AlignmentPlugin(), new IndentationPlugin()
// new KatexPlugin({ DEFAULT_NODE })
];

export var lineBreakSerializer = {
  deserialize: function deserialize(el) {
    if (el.tagName.toLowerCase() === 'br') {
      return { kind: 'text', text: '\n' };
    }
  },
  serialize: function serialize(object, children) {
    if (object.type === 'text' || children === '\n') {
      return React.createElement('br', null);
    }
  }
};

export var html = new Html({
  rules: [].concat(defaultPlugins, [lineBreakSerializer]),
  parseHtml: parse5.parseFragment
});

var options = { terse: true };

export var createInitialState = function createInitialState() {
  return {
    editorState: Raw.deserialize({
      nodes: [{
        kind: 'block',
        type: P,
        nodes: [{
          kind: 'text',
          text: ''
        }]
      }]
    }, options)
  };
};

export var unserialize = function unserialize(_ref) {
  var importFromHtml = _ref.importFromHtml,
      serialized = _ref.serialized,
      editorState = _ref.editorState;

  if (serialized) {
    return { editorState: Raw.deserialize(serialized, options) };
  } else if (importFromHtml) {
    return { editorState: html.deserialize(importFromHtml, options) };
  } else if (editorState) {
    return { editorState: editorState };
  }

  return createInitialState();
};

export var serialize = function serialize(_ref2) {
  var editorState = _ref2.editorState;
  return {
    serialized: Raw.serialize(editorState, options)
  };
};

export var merge = function merge(states) {
  var nodes = map(path(['editorState', 'document', 'nodes']), states);
  var mergedNodes = reduce(function (a, b) {
    return a.concat(b);
  }, head(nodes), tail(nodes));
  var mergedDocument = Document.create({ nodes: mergedNodes });
  var mergedEditorState = State.create({ document: mergedDocument });

  return { editorState: mergedEditorState };
};

export var split = function split(state) {
  var nodes = path(['editorState', 'document', 'nodes'], state);

  return nodes.map(function (node) {
    var splittedDocument = Document.create({ nodes: List([node]) });
    var splittedEditorState = State.create({ document: splittedDocument });

    return { editorState: splittedEditorState };
  }).toArray();
};

// const position = (): {
//   top: ?number,
//   right: ?number,
//   left: ?number,
//   bottom: ?number
// } => {
//   if (window && window.getSelection) {
//     const selection = window.getSelection()
//     if (!selection.rangeCount) {
//       return {
//         top: null,
//         right: null,
//         left: null,
//         bottom: null,
//       }
//     }
//
//     return selection.getRangeAt(0).getBoundingClientRect()
//   }
//
//   if (window.document.selection) {
//     return window.document.selection
//       .createRange()
//       .getBoundingClientRect()
//   }
//
//   return {
//     top: null,
//     right: null,
//     left: null,
//     bottom: null,
//   }
// }

// if editor state is empty, remove cell when backspace or delete was pressed.
export var handleRemoveHotKey = function handleRemoveHotKey(_, _ref3) {
  var editorState = _ref3.content.state.editorState;
  return new Promise(function (resolve, reject) {
    return Plain.serialize(editorState).length < 1 ? resolve() : reject();
  });
};

var windowSelectionWaitTime = 1;

export var handleFocusPreviousHotKey = function handleFocusPreviousHotKey(e, _ref4) {
  var editorState = _ref4.content.state.editorState;

  // const isArrowUp = e.keyCode === 38

  return new Promise(function (resolve, reject) {
    if (editorState.isExpanded) {
      return reject();
    }

    setTimeout(function () {
      // if (isArrowUp && next.top === current.top) {
      //   return resolve()
      // } else
      if (editorState.selection.isAtStartOf(editorState.document.nodes.first())) {
        return resolve();
      }
      reject();
    }, windowSelectionWaitTime);
  });
};

export var handleFocusNextHotKey = function handleFocusNextHotKey(e, _ref5) {
  var editorState = _ref5.content.state.editorState;

  // const isArrowDown = e.keyCode === 40

  return new Promise(function (resolve, reject) {
    if (editorState.isExpanded) {
      return reject();
    }

    setTimeout(function () {
      // if (isArrowDown && next.top === current.top) {
      //   return resolve()
      // } else
      if (editorState.selection.isAtEndOf(editorState.document.nodes.last())) {
        return resolve();
      }
      reject();
    }, windowSelectionWaitTime);
  });
};
//# sourceMappingURL=hooks.js.map