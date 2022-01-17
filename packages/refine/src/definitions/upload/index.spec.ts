import { getValueFromEvent } from "./";

class FileReaderMock {
    DONE = FileReader.DONE;
    EMPTY = FileReader.EMPTY;
    LOADING = FileReader.LOADING;
    readyState = 0;
    error: FileReader["error"] = null;
    result: FileReader["result"] = null;
    abort = jest.fn();
    addEventListener = jest.fn();
    dispatchEvent = jest.fn();
    onabort = jest.fn();
    onerror = jest.fn();
    onload = jest.fn();
    onloadend = jest.fn();
    onloadprogress = jest.fn();
    onloadstart = jest.fn();
    onprogress = jest.fn();
    readAsArrayBuffer = jest.fn();
    readAsBinaryString = jest.fn();
    readAsDataURL = jest.fn();
    readAsText = jest.fn();
    removeEventListener = jest.fn();
}

describe("definitions/upload", () => {
    const file = new File([new ArrayBuffer(1)], "file.jpg");

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("getValueFromEvent", async () => {
        const fileList = getValueFromEvent({
            file: {
                ...file,
                uid: "test1",
            },
            fileList: [
                {
                    ...file,
                    uid: "test2",
                },
            ],
        });

        expect(fileList).toMatchInlineSnapshot(`
            Array [
              Object {
                "uid": "test2",
              },
            ]
        `);
    });
});
