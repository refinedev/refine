type EachResolve<TResolve, Response> = (
    result: TResolve,
    index: number,
) => Response;
type EachReject<TReject, Response> = (
    error: TReject,
    index: number,
) => Response;

export const sequentialPromises = async <
    TResolve extends unknown = unknown,
    TReject extends unknown = unknown,
    TResolveResponse extends unknown = unknown,
    TRejectResponse extends unknown = unknown,
>(
    promises: (() => Promise<TResolve>)[],
    onEachResolve: EachResolve<TResolve, TResolveResponse>,
    onEachReject: EachReject<TReject, TRejectResponse>,
): Promise<(TResolveResponse | TRejectResponse)[]> => {
    const results = [];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore Remove this when we enable `downLevelIterations`
    for (const [index, promise] of promises.entries()) {
        try {
            const result = await promise();

            results.push(onEachResolve(result, index));
        } catch (error) {
            results.push(onEachReject(error as TReject, index));
        }
    }
    return results;
};
