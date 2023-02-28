import { IResourceItem } from "@contexts/resource";
import { getParentResource } from "../router";
import { createResourceKey } from "./create-resource-key";

export type Tree = {
    item: IResourceItem;
    children: { [key: string]: Tree };
};

export type FlatTreeItem = IResourceItem & {
    key: string;
    children: FlatTreeItem[];
};

export const createTree = (resources: IResourceItem[]): FlatTreeItem[] => {
    const root: Tree = {
        item: {
            name: "__root__",
        },
        children: {},
    };

    resources.forEach((resource) => {
        const parents: IResourceItem[] = [];

        let currentParent = getParentResource(resource, resources);
        while (currentParent) {
            parents.push(currentParent);
            currentParent = getParentResource(currentParent, resources);
        }
        parents.reverse();

        let currentTree = root;

        parents.forEach((parent) => {
            if (!currentTree.children[parent.name]) {
                currentTree.children[parent.name] = {
                    item: parent,
                    children: {},
                };
            }
            currentTree = currentTree.children[parent.name];
        });

        if (!currentTree.children[resource.name]) {
            currentTree.children[resource.name] = {
                item: resource,
                children: {},
            };
        }
    });

    const flatten = (tree: Tree): FlatTreeItem[] => {
        const items: FlatTreeItem[] = [];

        Object.keys(tree.children).forEach((key) => {
            const itemKey = createResourceKey(
                tree.children[key].item,
                resources,
            );
            const item: FlatTreeItem = {
                ...tree.children[key].item,
                key: itemKey,
                children: flatten(tree.children[key]),
            };
            items.push(item);
        });

        return items;
    };

    return flatten(root);
};
