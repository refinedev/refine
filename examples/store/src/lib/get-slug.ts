// Remove trailing and leading slash, usually included in nodes
// returned by the BigCommerce API
const getSlug = (path: string) => (path ? path.replace(/^\/|\/$/g, "") : "");

export default getSlug;
