import { IResourceItem, ITreeMenu, IMenuItem } from "src/interfaces";

export const createTreeView = (
    location: IResourceItem[] | IMenuItem[],
): ITreeMenu[] => {
    const tree = [];
    const object: { [key: string]: any } = {};
    let parent: IResourceItem | IMenuItem;
    let child: ITreeMenu;

    try {
        for (let i = 0; i < location.length; i++) {
            parent = location[i];
            if (parent.key) {
                object[parent.key] = parent;
                object[parent.key]["children"] = [];
            }
        }

        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                child = object[key];
                if (child.parentName && object[child["parentName"]]) {
                    object[child["parentName"]]["children"].push(child);
                } else {
                    tree.push(child);
                }
            }
        }
    } catch (error) {
        console.log("create tree view eror", error);
    }

    return tree;
};
