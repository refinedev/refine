import React from "react";
import {
  getElementFromFiber,
  getFiberFromElement,
  getFirstFiberHasName,
  getFirstStateNodeFiber,
  getNameFromFiber,
  getParentOfFiber,
} from "@aliemir/dom-to-fiber-utils";
import { DevToolsContext } from "@refinedev/devtools-shared";

type Fiber = Exclude<ReturnType<typeof getFiberFromElement>, null>;

type SelectableElement = {
  element: HTMLElement;
  name: string;
};

export const useSelector = (active: boolean) => {
  const { devtoolsUrl } = React.useContext(DevToolsContext);
  const [selectableElements, setSelectableElements] = React.useState<
    SelectableElement[]
  >([]);

  const fetchTraceItems = React.useCallback(async () => {
    const response = await fetch(
      `${devtoolsUrl ?? "http://localhost:5001"}/api/unique-trace-items`,
    );
    const data = await response.json();

    return data.data as string[];
  }, [devtoolsUrl]);

  const selectAppropriateFiber = React.useCallback(
    (start: Fiber | null, activeTraceItems: string[]) => {
      let fiber = start;
      let firstParentOfNodeWithName: Fiber | null;
      let fiberWithStateNode: Fiber | null;

      let acceptedName = false;

      while (!acceptedName && fiber) {
        // Get the first fiber node that has a name (look up the tree)
        firstParentOfNodeWithName = getFirstFiberHasName(fiber);
        // Get the first fiber node that has a state node (look up the tree)
        fiberWithStateNode = getFirstStateNodeFiber(firstParentOfNodeWithName);
        acceptedName = activeTraceItems.includes(
          getNameFromFiber(firstParentOfNodeWithName) ?? "",
        );
        if (!acceptedName) {
          fiber = getParentOfFiber(fiber);
        }
      }

      if (fiberWithStateNode && firstParentOfNodeWithName) {
        return {
          stateNode: fiberWithStateNode,
          nameFiber: firstParentOfNodeWithName,
        };
      }
      return {
        stateNode: null,
        nameFiber: null,
      };
    },
    [],
  );

  const getUniqueNodes = React.useCallback((nodes: SelectableElement[]) => {
    const uniques: SelectableElement[] = [];

    nodes.forEach((node) => {
      const isElementExist = uniques.find(
        (item) => item.element === node.element,
      );
      if (!isElementExist) {
        uniques.push(node);
      }
    });

    return uniques;
  }, []);

  const traverseBodyNodes = React.useCallback(
    (
      node: HTMLElement | null,
      activeTraceItems: string[],
    ): SelectableElement[] => {
      if (!node) {
        return [];
      }

      const items: SelectableElement[] = [];

      const fiber = getFiberFromElement(node);
      const targetFiber = selectAppropriateFiber(fiber, activeTraceItems);

      if (targetFiber.nameFiber && targetFiber.stateNode) {
        const element = getElementFromFiber(targetFiber.stateNode);
        const name = getNameFromFiber(targetFiber.nameFiber);
        if (element && name) {
          items.push({
            element,
            name,
          });
        }
      }

      for (let i = 0; i < node?.children?.length ?? 0; i++) {
        items.push(
          ...traverseBodyNodes(
            node.children[i] as HTMLElement,
            activeTraceItems,
          ),
        );
      }

      return items;
    },
    [selectAppropriateFiber],
  );

  const prepareSelector = React.useCallback(async () => {
    const fetchedTraceItems = await fetchTraceItems();
    const traversedNodes = traverseBodyNodes(document.body, fetchedTraceItems);
    const uniqueNodes = getUniqueNodes(traversedNodes);

    setSelectableElements(uniqueNodes);
  }, [fetchTraceItems, traverseBodyNodes, getUniqueNodes]);

  React.useEffect(() => {
    if (active) {
      prepareSelector();
    }
  }, [active, prepareSelector]);

  return {
    selectableElements,
  };
};
