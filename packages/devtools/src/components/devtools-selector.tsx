import React from "react";
import { createPortal } from "react-dom";
import { useSelector } from "src/utilities/use-selector";
import { SelectorBox } from "./selector-box";
import { SelectorHint } from "./selector-hint";

type Props = {
  onSelectorOpen: () => void;
  onHighlight: (name: string) => void;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
};

export const DevtoolsSelector = ({
  onSelectorOpen,
  onHighlight,
  icon,
  style,
}: Props) => {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const { rect, name } = useSelector(active);

  const [selectorBoxRoot, setSelectorBoxRoot] =
    React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!selectorBoxRoot) {
      const element = document.createElement("div");
      element.id = "selector-box-root";

      document.body.appendChild(element);

      setSelectorBoxRoot(element);
    }
  }, []);

  React.useEffect(() => {
    if (active) {
      document.body.style.cursor = "crosshair";
    } else {
      document.body.style.cursor = "default";
    }
  }, [active]);

  React.useEffect(() => {
    const onMouseClick = (e: MouseEvent) => {
      if (!active) return;
      if (!name) return;

      e?.preventDefault();
      e?.stopPropagation();
      e.stopImmediatePropagation();
      onHighlight(name);
      setActive(false);
    };

    if (active) {
      document.addEventListener("click", onMouseClick, {
        capture: true,
      });

      return () => {
        document.removeEventListener("click", onMouseClick, {
          capture: true,
        });
      };
    }

    return () => 0;
  }, [name, onHighlight, active]);

  React.useEffect(() => {
    if (active) {
      onSelectorOpen();
    }
  }, [active, onSelectorOpen]);

  return (
    <div style={style}>
      <div
        role="button"
        title="Element Selector"
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          (document?.activeElement as HTMLElement)?.blur();
          setActive((active) => !active);
        }}
        style={{
          padding: 0,
          margin: 0,
          height: "100%",
          width: "100%",
          transform: hover ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.2s ease-in-out",
        }}
      >
        {icon}
      </div>
      <SelectorHint active={active} />
      {active &&
        selectorBoxRoot &&
        createPortal(<SelectorBox {...rect} name={name} />, selectorBoxRoot)}
    </div>
  );
};
