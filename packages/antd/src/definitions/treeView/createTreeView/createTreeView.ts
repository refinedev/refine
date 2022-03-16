import { IMenuItem } from "src";

export const createTreeView = (location: IMenuItem[]) => {
    const tree = [];
    const object = {};
    let parent: any;
    let child: any;

    for (let i = 0; i < location.length; i++) {
        parent = location[i];

        object[parent.name] = parent;
        object[parent.name]["children"] = [];
    }

    for (const name in object) {
        if (object.hasOwnProperty(name)) {
            child = object[name];
            if (child.parentName && object[child["parentName"]]) {
                object[child["parentName"]]["children"].push(child);
            } else {
                tree.push(child);
            }
        }
    }
    return tree;
};
