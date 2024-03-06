"use strict";
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function _optionalChain(ops) {
  let lastAccessLHS = undefined;
  let value = ops[0];
  let i = 1;
  while (i < ops.length) {
    const op = ops[i];
    const fn = ops[i + 1];
    i += 2;
    if ((op === "optionalAccess" || op === "optionalCall") && value == null) {
      return undefined;
    }
    if (op === "access" || op === "optionalAccess") {
      lastAccessLHS = value;
      value = fn(value);
    } else if (op === "call" || op === "optionalCall") {
      value = fn((...args) => value.call(lastAccessLHS, ...args));
      lastAccessLHS = undefined;
    }
  }
  return value;
}
var _unistutilvisit = require("unist-util-visit");
var _unistutilvisit2 = _interopRequireDefault(_unistutilvisit);

const plugin = () => {
  const transformer = async (ast) => {
    const headingIndexes = [];

    let nodeBefore = null;

    _unistutilvisit2.default.call(void 0, ast, "heading", (nodeCurrent) => {
      const { depth } = nodeCurrent;

      if (depth === 1) {
        return;
      }

      if (!nodeBefore) {
        nodeBefore = nodeCurrent;
        return;
      }

      const nodeBeforeIndex = ast.children.indexOf(nodeBefore);
      const nodeCurrentIndex = ast.children.indexOf(nodeCurrent) - 1;

      const itemCountBetweenHeadings = nodeCurrentIndex - nodeBeforeIndex;

      if (itemCountBetweenHeadings < 1) {
        nodeBefore = nodeCurrent;
        return;
      }

      headingIndexes.push({
        startIndex: nodeBeforeIndex,
        endIndex: nodeCurrentIndex,
        itemCountBetweenHeadings,
        data: {
          id: nodeBefore.data.id,
        },
      });

      nodeBefore = nodeCurrent;
    });

    // add thumbs up down feedback widget to the below of each heading
    let totalCountOfAddedNodes = 0;
    let totalCountOfRemovedNodes = 0;
    for (let i = 0; i < headingIndexes.length; i++) {
      const { startIndex, itemCountBetweenHeadings, data } = headingIndexes[i];
      let belowHeadingIndex = startIndex + 1;

      // get nodes between headings
      const nodesBetweenHeadings = ast.children.slice(
        belowHeadingIndex,
        belowHeadingIndex + itemCountBetweenHeadings,
      );

      // remove nodes between headings
      ast.children.splice(belowHeadingIndex, itemCountBetweenHeadings);
      totalCountOfRemovedNodes += itemCountBetweenHeadings;

      // create widget opening tag
      ast.children.splice(belowHeadingIndex, 0, {
        type: "jsx",
        value: `<DocThumbsUpDownFeedbackWidget id="${data.id}" >`,
      });
      totalCountOfAddedNodes++;

      // add nodesBetweenHeadings as children of widget
      ast.children.splice(belowHeadingIndex + 1, 0, ...nodesBetweenHeadings);
      totalCountOfAddedNodes += nodesBetweenHeadings.length;

      // create widget closing tag
      ast.children.splice(
        belowHeadingIndex + 1 + nodesBetweenHeadings.length,
        0,
        {
          type: "jsx",
          value: `</DocThumbsUpDownFeedbackWidget>`,
        },
      );
      totalCountOfAddedNodes++;

      const currentHeading = headingIndexes.at(i);
      if (currentHeading) {
        currentHeading.endIndex += 1;
        currentHeading.endIndex -= itemCountBetweenHeadings;
      }

      const nextHeading = headingIndexes.at(i + 1);
      if (nextHeading) {
        nextHeading.startIndex += totalCountOfAddedNodes;
        nextHeading.startIndex -= totalCountOfRemovedNodes;
        nextHeading.endIndex += totalCountOfAddedNodes;
        nextHeading.endIndex -= totalCountOfRemovedNodes;
      }
    }

    // add last thumbs up/down widget to the end of the ast because we didn't add it in the loop above because there is no next heading
    if (
      nodeBefore &&
      _optionalChain([
        nodeBefore,
        "optionalAccess",
        (_) => _.data,
        "optionalAccess",
        (_2) => _2.id,
      ])
    ) {
      const nodeBeforeIndex = ast.children.indexOf(nodeBefore);
      ast.children.splice(nodeBeforeIndex + 1, 0, {
        type: "jsx",
        value: `<DocThumbsUpDownFeedbackWidget id="${nodeBefore.data.id}" >`,
      });

      ast.children.push({
        type: "jsx",
        value: `</DocThumbsUpDownFeedbackWidget>`,
      });
    }
  };

  return transformer;
};

module.exports = plugin;
