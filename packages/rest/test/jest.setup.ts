import nock from "nock";

// nock.recorder.rec({ use_separator: false });

let storage: Record<string, any> = {};

global.localStorage = {
  getItem: jest.fn((key: string) => storage[key]),
  setItem: jest.fn((key: string, value: string) => {
    storage[key] = value;
  }),
  removeItem: jest.fn((key: string) => {
    delete storage[key];
  }),
  clear: jest.fn(() => {
    storage = {};
  }),
  key: jest.fn(),
  length: Object.keys(storage).length,
};

afterEach(() => {
  storage = {};
});

afterAll(() => {
  nock.cleanAll();
  nock.restore();
});
