import {
  getElementFromFiber,
  getFiberFromElement,
  getFirstFiberHasName,
  getFirstStateNodeFiber,
  getNameFromFiber,
  getParentOfFiber,
} from "@aliemir/dom-to-fiber-utils";
import { DevToolsContext } from "@refinedev/devtools-shared";
import debounce from "lodash/debounce";
import React from "react";

type Fiber = Exclude<ReturnType<typeof getFiberFromElement>, null>;

export const useSelector = (active: boolean) => {
  const { devtoolsUrl } = React.useContext(DevToolsContext);
  const [traceItems, setTraceItems] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (active) {
      fetch(
        `${devtoolsUrl ?? "http://localhost:5001"}/api/unique-trace-items`,
      ).then((res) =>
        res.json().then((data: { data: string[] }) => setTraceItems(data.data)),
      );
    }
  }, [active, devtoolsUrl]);

  const [selectedFiber, setSelectedFiber] = React.useState<{
    stateNode: Fiber | null;
    nameFiber: Fiber | null;
  }>({
    stateNode: null,
    nameFiber: null,
  });
  const [activeFiber, setActiveFiber] = React.useState<{
    stateNode: Fiber | null;
    nameFiber: Fiber | null;
    derived?: boolean;
  }>({
    stateNode: null,
    nameFiber: null,
    derived: false,
  });

  React.useEffect(() => {
    if (active) {
      return () => {
        setSelectedFiber({
          stateNode: null,
          nameFiber: null,
        });
        setActiveFiber({
          stateNode: null,
          nameFiber: null,
          derived: false,
        });
      };
    }

    return () => 0;
  }, [active]);

  const selectAppropriateFiber = React.useCallback(
    (start: Fiber | null) => {
      let fiber = start;
      let firstParentOfNodeWithName: Fiber | null;
      let fiberWithStateNode: Fiber | null;

      let acceptedName = false;

      while (!acceptedName && fiber) {
        // Get the first fiber node that has a name (look up the tree)
        firstParentOfNodeWithName = getFirstFiberHasName(fiber);
        // Get the first fiber node that has a state node (look up the tree)
        fiberWithStateNode = getFirstStateNodeFiber(firstParentOfNodeWithName);
        acceptedName = traceItems.includes(
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
    [traceItems],
  );

  const pickFiber = React.useCallback(
    (target: HTMLElement) => {
      const fiber = getFiberFromElement(target);

      setSelectedFiber(selectAppropriateFiber(fiber));
      return;
    },
    [traceItems],
  );

  React.useEffect(() => {
    if (
      activeFiber.stateNode !== selectedFiber.stateNode ||
      activeFiber.nameFiber !== selectedFiber.nameFiber
    ) {
      setActiveFiber({
        stateNode: selectedFiber.stateNode,
        nameFiber: selectedFiber.nameFiber,
        derived: false,
      });
    }
  }, [selectedFiber]);

  const previousValues = React.useRef<{
    rect: {
      width: number;
      height: number;
      x: number;
      y: number;
    };
    name: string;
  }>({
    rect: {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    },
    name: "",
  });

  const { rect, name } = React.useMemo(() => {
    if (!active) {
      return {
        rect: {
          width: 0,
          height: 0,
          x: 0,
          y: 0,
        },
        name: "",
      };
    }
    if (activeFiber.stateNode || activeFiber.nameFiber) {
      // Get the element from the fiber with a state node
      const element = activeFiber.stateNode
        ? getElementFromFiber(activeFiber.stateNode)
        : null;
      // Get the name of the fiber node with a name
      const fiberName = activeFiber.nameFiber
        ? getNameFromFiber(activeFiber.nameFiber)
        : null;

      if (!element) {
        return {
          rect: previousValues.current.rect,
          name: fiberName ?? previousValues.current.name,
        };
      }

      const bounding = element.getBoundingClientRect?.();

      if (!bounding) {
        return {
          rect: previousValues.current.rect,
          name: fiberName ?? previousValues.current.name,
        };
      }

      return {
        rect: {
          width: bounding.width,
          height: bounding.height,
          x: bounding.left,
          y: bounding.top,
        },
        name: fiberName ?? previousValues.current.name,
      };
    }

    return previousValues.current;
  }, [activeFiber, active]);

  previousValues.current = {
    rect,
    name,
  };

  React.useEffect(() => {
    if (active) {
      const listener = (e: KeyboardEvent) => {
        // if user presses shift, toggle the derived state and set the active fiber to the parent
        if (e.key === "Shift" && activeFiber.stateNode) {
          e.stopPropagation();
          e.preventDefault();

          const parent = getParentOfFiber(activeFiber.nameFiber);

          const fibers = selectAppropriateFiber(parent);

          if (fibers.nameFiber && fibers.stateNode) {
            setActiveFiber({
              ...fibers,
              derived: true,
            });
            return;
          }
        }
      };

      document.addEventListener("keydown", listener);
      return () => document.removeEventListener("keydown", listener);
    }
    return () => 0;
  }, [activeFiber, active]);

  React.useEffect(() => {
    if (active) {
      let previousTarget: HTMLElement | null = null;
      const listener = debounce((e: MouseEvent) => {
        if (e?.target) {
          if (previousTarget === e.target) {
            return;
          }
          pickFiber(e.target as HTMLElement);
          previousTarget = e.target as HTMLElement;
        }
      }, 50);

      document.addEventListener("mousemove", listener);

      return () => document.removeEventListener("mousemove", listener);
    }
    return () => 0;
  }, [active, pickFiber]);

  return {
    rect,
    name,
  };
};
