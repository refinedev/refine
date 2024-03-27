import { file2Base64 } from "./index";

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

  it("file2Base64 success", async () => {
    const fileReader = new FileReaderMock();
    jest
      .spyOn(window, "FileReader")
      .mockImplementation(() => fileReader as FileReader);

    fileReader.result = "file content";
    fileReader.addEventListener.mockImplementation((_, fn) => fn());

    const content = await file2Base64({ ...file, uid: "uid" });

    expect(content).toBe("file content");
  });
});
