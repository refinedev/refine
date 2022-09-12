import isInDOM from "./is-in-dom";

export default function hasParent(element, root) {
    return root && root.contains(element) && isInDOM(element);
}
