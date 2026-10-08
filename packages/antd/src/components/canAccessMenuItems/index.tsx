import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  AccessControlContext,
  CanAccess,
  type TreeMenuItem,
} from "@refinedev/core";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export type CanAccessMenuItemsProps = {
  /**
   * Menu tree to check, usually `menuItems` from `useMenu`.
   */
  menuItems: TreeMenuItem[];
  /**
   * Receives a predicate that tells whether a menu item may be shown.
   * Items are checked with `action: "list"`, exactly like wrapping each item in `<CanAccess>`.
   * A child is never accessible when its parent is not, and nothing is accessible while the check is pending.
   */
  children: (canAccess: (item: TreeMenuItem) => boolean) => React.ReactNode;
};

type AccessChangeHandler = (key: string, granted: boolean) => void;

const AccessGranted: React.FC<{
  itemKey: string;
  onChange: AccessChangeHandler;
}> = ({ itemKey, onChange }) => {
  useIsomorphicLayoutEffect(() => {
    onChange(itemKey, true);
    return () => onChange(itemKey, false);
  }, [itemKey, onChange]);

  return null;
};

const renderAccessChecks = (
  tree: TreeMenuItem[],
  onChange: AccessChangeHandler,
): React.ReactNode =>
  tree.map((item) => (
    <CanAccess
      key={item.key}
      resource={item.name}
      action="list"
      params={{ resource: item }}
    >
      <AccessGranted itemKey={item.key} onChange={onChange} />
      {renderAccessChecks(item.children, onChange)}
    </CanAccess>
  ));

const allowAll = () => true;

/**
 * Resolves access control for a menu tree so it can be rendered as data (e.g. antd `<Menu items>`),
 * where an item cannot be wrapped in `<CanAccess>` anymore.
 *
 * Each item is checked by a `<CanAccess>` that renders no DOM, so the checks share the `useCan` cache
 * and options with the rest of the app. Children are only checked once their parent is granted.
 */
export const CanAccessMenuItems: React.FC<CanAccessMenuItemsProps> = ({
  menuItems,
  children,
}) => {
  const { can } = useContext(AccessControlContext);
  const [grantedKeys, setGrantedKeys] = useState<ReadonlySet<string>>(
    () => new Set(),
  );

  const onChange = useCallback<AccessChangeHandler>((key, granted) => {
    setGrantedKeys((previous) => {
      if (previous.has(key) === granted) return previous;

      const next = new Set(previous);
      if (granted) next.add(key);
      else next.delete(key);
      return next;
    });
  }, []);

  const canAccess = useCallback(
    (item: TreeMenuItem) => grantedKeys.has(item.key),
    [grantedKeys],
  );

  if (!can) {
    return <>{children(allowAll)}</>;
  }

  return (
    <>
      {renderAccessChecks(menuItems, onChange)}
      {children(canAccess)}
    </>
  );
};
