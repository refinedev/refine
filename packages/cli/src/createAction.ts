interface CreateAction {
    beforeAction?: () => void | Promise<void>;
    afterAction?: () => void | Promise<void>;
}

export const createAction = async (
    action: (...args: any[]) => void | Promise<void>,
    { afterAction, beforeAction }: CreateAction,
) => {
    await beforeAction?.();
    action();
    await afterAction?.();
};
