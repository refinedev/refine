export default function isInDom(obj) {
    return Boolean(obj.closest("body"));
}
