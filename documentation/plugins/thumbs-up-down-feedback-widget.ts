import visit from "unist-util-visit";

const plugin = () => {
  const transformer = async (ast) => {
    const headingIndexes: {
      startIndex: number;
      endIndex: number;
      itemCountBetweenHeadings: number;
      data: {
        id: string;
      };
    }[] = [];

    let nodeBefore: NodeHeading = null;

    visit(ast, "heading", (nodeCurrent: NodeHeading) => {
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
    if (nodeBefore && nodeBefore?.data?.id) {
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

type NodeHeading = {
  type: "heading";
  depth: 1 | 2 | 3 | 4 | 5 | 6;
  children: any[];
  position: {
    start: {
      line: number;
      column: number;
      offset: number;
    };
    end: {
      line: number;
      column: number;
      offset: number;
    };
    indent: number[];
  };
  data: {
    id: string;
    hProperties: Record<string, any>;
  };
};
