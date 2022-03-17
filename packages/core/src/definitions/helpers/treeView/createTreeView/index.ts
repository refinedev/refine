import { IMenuItem, ITreeMenu } from "src/interfaces";

export const createTreeView = (location: IMenuItem[]): ITreeMenu[] => {
    const tree = [];
    const object: { [key: string]: any } = {};
    let parent: IMenuItem;
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
        console.log("err", error);
    }

    return tree;
};
