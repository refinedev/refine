// using lowdb and lodash

import { Low, Memory } from "lowdb";
import lodash from "lodash";

type Invocation = {
    id: number;
    method: string;
    trace: string[];
    fileName: string;
    lineNumber: number;
    meta: Record<string, unknown>;
};

type Data = {
    invocations: Invocation[];
};

// Extend Low class with a new `chain` field
class LowWithLodash<T> extends Low<T> {
    chain: lodash.ExpChain<this["data"]> = lodash.chain(this).get("data");
}

const defaultData: Data = {
    invocations: [],
};

export const createDb = () => {
    const adapter = new Memory<Data>();
    const db = new LowWithLodash(adapter, defaultData);

    return db;

    // example usage
    // db.chain
    //     .get("invocations")
    //     .filter({ trace: ["useList"] })
    //     .value();
};
