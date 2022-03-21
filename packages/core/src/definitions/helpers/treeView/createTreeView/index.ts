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
    } catch (error) {
        console.log("create tree view eror", error);
    }

    return tree;
};
