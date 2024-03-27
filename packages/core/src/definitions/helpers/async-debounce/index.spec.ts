import { waitFor } from "@testing-library/react";

import { asyncDebounce } from ".";

describe("asyncDebounce", () => {
  it("should debounce the function", async () => {
    const fn = jest.fn((num: number) => Promise.resolve(num));
    const debounced = asyncDebounce(fn, 1000);

    const result1 = debounced(1);
    const result2 = debounced(2);
    const result3 = debounced(3);

    expect(fn).not.toHaveBeenCalled();

    await Promise.allSettled([result1, result2, result3]);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(3);
  });

  it("should flush the debounced function", async () => {
    jest.useRealTimers();
    const fn = jest.fn((num: number) => Promise.resolve(num));
    const catcher = jest.fn();
    const debounced = asyncDebounce(fn, 1000);

    debounced(0).catch(catcher);
    const result1 = debounced(1);
    debounced.flush();
    const result2 = debounced(2);

    await Promise.allSettled([result1, result2]);

    expect(catcher).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledTimes(2);

    expect(fn).toHaveBeenCalledWith(1);
    expect(fn).toHaveBeenCalledWith(2);
  });

  it("should cancel the debounced function", async () => {
    const fn = jest.fn((num: number) => Promise.resolve(num));
    const catcher = jest.fn();
    const debounced = asyncDebounce(fn, 1000);

    debounced(1).catch(catcher);
    debounced.cancel();

    expect(fn).not.toHaveBeenCalled();
    await waitFor(() => expect(catcher).toHaveBeenCalledTimes(1));
  });

  it("should respect the wait time", async () => {
    jest.useFakeTimers();

    const fn = jest.fn((num: number) => Promise.resolve(num));
    const catcher = jest.fn();

    const debounced = asyncDebounce(fn, 2000);

    debounced(1).catch(catcher);

    jest.advanceTimersByTime(1000);

    debounced(2).catch(catcher);

    jest.advanceTimersByTime(2000);

    await waitFor(() => expect(fn).toHaveBeenCalledTimes(1));

    await waitFor(() => expect(fn).toHaveBeenCalledWith(2));

    await waitFor(() => expect(catcher).toHaveBeenCalledTimes(1));

    jest.useRealTimers();
  });

  it("should debounce non-promises", async () => {
    const fn = jest.fn((num: number) => num);
    const catcher = jest.fn();
    const debounced = asyncDebounce(fn, 1000);

    const result1 = debounced(1).catch(catcher);
    const result2 = debounced(2).catch(catcher);
    const result3 = debounced(3).catch(catcher);

    expect(fn).not.toHaveBeenCalled();

    await Promise.allSettled([result1, result2, result3]);

    await waitFor(() => expect(fn).toHaveBeenCalledTimes(1));

    await waitFor(() => expect(fn).toHaveBeenCalledWith(3));

    await waitFor(() => expect(catcher).toHaveBeenCalledTimes(2));
  });

  it("should reject by cancel reason", async () => {
    const fn = jest.fn((num: number) => Promise.resolve(num));
    const catcher = jest.fn();
    const debounced = asyncDebounce(fn, 1000, "canceled");

    debounced(1).catch(catcher);
    debounced(2).catch(catcher);

    await waitFor(() => expect(catcher).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(catcher).toHaveBeenCalledWith("canceled"));

    debounced.cancel();

    await waitFor(() => expect(catcher).toHaveBeenCalledTimes(2));
    await waitFor(() => expect(catcher).toHaveBeenCalledWith("canceled"));
  });

  it("should call the correct callback in long awaits", async () => {
    const resolvedMock = jest.fn();
    const fn = jest.fn(
      (num: number) =>
        new Promise((res) => {
          setTimeout(() => {
            resolvedMock(num);
            res(num);
          }, 2000);
        }),
    );
    const catcher = jest.fn();
    const resolver = jest.fn();
    const nextResolver = jest.fn();
    const debounced = asyncDebounce(fn, 1000, "canceled");

    const options = { timeout: 3000 };

    debounced(1).catch(catcher);
    debounced(2).catch(catcher);
    debounced(3).then(resolver).catch(catcher);

    await waitFor(() => expect(catcher).toHaveBeenCalledTimes(2));

    // wait for function to be triggered
    await waitFor(() => expect(fn).toHaveBeenCalledTimes(1));
    // but not resolved yet
    await waitFor(() => expect(resolvedMock).not.toBeCalled());

    // call the debounced again
    debounced(4).then(nextResolver).catch(catcher);

    // next call should not interrupt the previous call and successfully resolve with `resolver`
    await waitFor(() => expect(resolver).toBeCalledTimes(1), options);
    await waitFor(() => expect(resolvedMock).toBeCalledWith(3));
    // next call should not be resolved
    await waitFor(() => expect(nextResolver).not.toBeCalled());

    // wait for second call to be made
    await waitFor(() => expect(fn).toHaveBeenCalledTimes(2), options);
    // wait for it to be resolved
    await waitFor(() => expect(nextResolver).toBeCalledTimes(1), options);
    await waitFor(() => expect(resolvedMock).toBeCalledWith(4));
    // fourth call should not reject the third because it's already resolved
    await waitFor(() => expect(catcher).toHaveBeenCalledTimes(2));
    // third call should not be resolved again
    await waitFor(() => expect(resolver).toHaveBeenCalledTimes(1));
  });

  it("should cancel previous and reject last if errored", async () => {
    const fn = jest.fn((num: number) => {
      if (num === 3) {
        return Promise.reject("error");
      }
      return Promise.resolve(num);
    });
    const catcher = jest.fn();
    const debounced = asyncDebounce(fn, 1000, "canceled");

    debounced(1).catch(catcher);
    debounced(2).catch(catcher);

    await waitFor(() => expect(catcher).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(catcher).toHaveBeenCalledWith("canceled"));

    debounced(3).catch(catcher);

    await waitFor(() => expect(catcher).toHaveBeenCalledTimes(2));
    await waitFor(() => expect(catcher).toHaveBeenCalledWith("canceled"));

    await waitFor(() => expect(catcher).toHaveBeenCalledTimes(3));
    await waitFor(() => expect(catcher).toHaveBeenCalledWith("error"));
  });
});
