import { BaseKey } from "src/interfaces";

type ParametrizedDataActions = "list" | "infinite";
type IdRequiredDataActions = "one";
type IdsRequiredDataActions = "many";
type DataMutationActions =
    | "custom"
    | "customMutation"
    | "create"
    | "createMany"
    | "update"
    | "updateMany"
    | "delete"
    | "deleteMany";

type AuthActionType =
    | "login"
    | "logout"
    | "identity"
    | "register"
    | "forgotPassword"
    | "check"
    | "onError"
    | "permissions"
    | "updatePassword";

type AuditActionType = "list" | "log" | "rename";

type IdType = BaseKey;
type IdsType = IdType[];

type ParamsType = any;

type KeySegment = string | IdType | IdsType | ParamsType;

export function arrayFindIndex<T>(array: T[], slice: T[]): number {
    return array.findIndex(
        (item, index) =>
            index <= array.length - slice.length &&
            slice.every(
                (sliceItem, sliceIndex) =>
                    array[index + sliceIndex] === sliceItem,
            ),
    );
}

export function arrayReplace<T>(
    array: T[],
    partToBeReplaced: T[],
    newPart: T[],
): T[] {
    const newArray: T[] = [...array];
    const startIndex = arrayFindIndex(array, partToBeReplaced);

    if (startIndex !== -1) {
        newArray.splice(startIndex, partToBeReplaced.length, ...newPart);
    }

    return newArray;
}

export function stripUndefined(segments: KeySegment[]) {
    return segments.filter((segment) => segment !== undefined);
}

function convertToLegacy(segments: KeySegment[]) {
    // for `list`, `many` and `one`
    if (segments[0] === "data") {
        // [data, dpName, resource, action, ...];
        const newSegments = segments.slice(1);

        if (newSegments[2] === "many") {
            newSegments[2] = "getMany";
        } else if (newSegments[2] === "infinite") {
            newSegments[2] = "list";
        } else if (newSegments[2] === "one") {
            newSegments[2] = "detail";
        } else if (newSegments[1] === "custom") {
            const newParams = {
                ...newSegments[2],
            };
            delete newParams.method;
            delete newParams.url;

            return [
                newSegments[0],
                newSegments[1],
                newSegments[2].method,
                newSegments[2].url,
                newParams,
            ];
        }

        return newSegments;
    }
    // for `audit` -> `logList`
    if (segments[0] === "audit") {
        // [audit, resource, action, params] (for log and list)
        // or
        // [audit, action, params] (for rename)
        if (segments[2] === "list") {
            return ["logList", segments[1], segments[3]];
        }
    }
    // for `access` -> `useCan`
    if (segments[0] === "access") {
        // [access, resource, action, params]
        if (segments.length === 4) {
            return [
                "useCan",
                {
                    resource: segments[1],
                    action: segments[2],
                    ...segments[3], // params: { params, enabled }
                },
            ];
        }
    }
    // for `auth`
    if (segments[0] === "auth") {
        if (arrayFindIndex(segments, ["auth", "login"]) !== -1) {
            return ["useLogin"];
        }
        if (arrayFindIndex(segments, ["auth", "logout"]) !== -1) {
            return ["useLogout"];
        }
        if (arrayFindIndex(segments, ["auth", "identity"]) !== -1) {
            return ["getUserIdentity"];
        }
        if (arrayFindIndex(segments, ["auth", "register"]) !== -1) {
            return ["useRegister"];
        }
        if (arrayFindIndex(segments, ["auth", "forgotPassword"]) !== -1) {
            return ["useForgotPassword"];
        }
        if (arrayFindIndex(segments, ["auth", "check"]) !== -1) {
            return ["useAuthenticated", segments[2]]; // [auth, check, params]
        }
        if (arrayFindIndex(segments, ["auth", "onError"]) !== -1) {
            return ["useCheckError"];
        }
        if (arrayFindIndex(segments, ["auth", "permissions"]) !== -1) {
            return ["usePermissions"];
        }
        if (arrayFindIndex(segments, ["auth", "updatePassword"]) !== -1) {
            return ["useUpdatePassword"];
        }
    }
    return segments;
}

class BaseKeyBuilder {
    segments: KeySegment[] = [];

    constructor(segments: KeySegment[] = []) {
        this.segments = segments;
    }

    key() {
        return this.segments;
    }

    legacy() {
        return convertToLegacy(this.segments);
    }

    get(legacy?: boolean) {
        return legacy ? this.legacy() : this.segments;
    }
}

class ParamsKeyBuilder extends BaseKeyBuilder {
    constructor(segments: KeySegment[]) {
        super(segments);
    }

    params(paramsValue?: ParamsType) {
        return new BaseKeyBuilder([...this.segments, paramsValue]);
    }
}

class DataIdRequiringKeyBuilder extends BaseKeyBuilder {
    constructor(segments: KeySegment[]) {
        super(segments);
    }

    id(idValue?: IdType) {
        return new ParamsKeyBuilder([
            ...this.segments,
            idValue ? String(idValue) : undefined,
        ]);
    }
}

class DataIdsRequiringKeyBuilder extends BaseKeyBuilder {
    constructor(segments: KeySegment[]) {
        super(segments);
    }

    ids(...idsValue: IdsType) {
        return new ParamsKeyBuilder([
            ...this.segments,
            ...(idsValue.length ? [idsValue.map((el) => String(el))] : []),
        ]);
    }
}

class DataResourceKeyBuilder extends BaseKeyBuilder {
    constructor(segments: KeySegment[]) {
        super(segments);
    }

    action(actionType: ParametrizedDataActions): ParamsKeyBuilder;
    action(actionType: IdRequiredDataActions): DataIdRequiringKeyBuilder;
    action(actionType: IdsRequiredDataActions): DataIdsRequiringKeyBuilder;
    action(
        actionType:
            | ParametrizedDataActions
            | IdRequiredDataActions
            | IdsRequiredDataActions,
    ):
        | ParamsKeyBuilder
        | DataIdRequiringKeyBuilder
        | DataIdsRequiringKeyBuilder {
        if (actionType === "one") {
            return new DataIdRequiringKeyBuilder([
                ...this.segments,
                actionType,
            ]);
        } else if (actionType === "many") {
            return new DataIdsRequiringKeyBuilder([
                ...this.segments,
                actionType,
            ]);
        } else if (["list", "infinite"].includes(actionType)) {
            return new ParamsKeyBuilder([...this.segments, actionType]);
        } else {
            throw new Error("Invalid action type");
        }
    }
}

class DataKeyBuilder extends BaseKeyBuilder {
    constructor(segments: KeySegment[]) {
        super(segments);
    }

    resource(resourceName?: string) {
        return new DataResourceKeyBuilder([...this.segments, resourceName]);
    }

    mutation(mutationName: DataMutationActions) {
        return new ParamsKeyBuilder([
            ...(mutationName === "custom" ? this.segments : [this.segments[0]]),
            mutationName,
        ]);
    }
}

class AuthKeyBuilder extends BaseKeyBuilder {
    constructor(segments: KeySegment[]) {
        super(segments);
    }

    action(actionType: AuthActionType) {
        return new ParamsKeyBuilder([...this.segments, actionType]);
    }
}

class AccessResourceKeyBuilder extends BaseKeyBuilder {
    constructor(segments: KeySegment[]) {
        super(segments);
    }

    action(resourceName: string) {
        return new ParamsKeyBuilder([...this.segments, resourceName]);
    }
}

class AccessKeyBuilder extends BaseKeyBuilder {
    constructor(segments: KeySegment[]) {
        super(segments);
    }

    resource(resourceName?: string) {
        return new AccessResourceKeyBuilder([...this.segments, resourceName]);
    }
}

class AuditActionKeyBuilder extends BaseKeyBuilder {
    constructor(segments: KeySegment[]) {
        super(segments);
    }

    action(actionType: Extract<AuditActionType, "list">) {
        return new ParamsKeyBuilder([...this.segments, actionType]);
    }
}

class AuditKeyBuilder extends BaseKeyBuilder {
    constructor(segments: KeySegment[]) {
        super(segments);
    }

    resource(resourceName?: string) {
        return new AuditActionKeyBuilder([...this.segments, resourceName]);
    }

    action(actionType: Extract<AuditActionType, "rename" | "log">) {
        return new ParamsKeyBuilder([...this.segments, actionType]);
    }
}

export class KeyBuilder extends BaseKeyBuilder {
    constructor(segments: KeySegment[]) {
        super(segments);
    }

    data(name?: string) {
        return new DataKeyBuilder(["data", name || "default"]);
    }

    auth() {
        return new AuthKeyBuilder(["auth"]);
    }

    access() {
        return new AccessKeyBuilder(["access"]);
    }

    audit() {
        return new AuditKeyBuilder(["audit"]);
    }
}

export const keys = () => new KeyBuilder([]);
