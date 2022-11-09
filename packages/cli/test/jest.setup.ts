import nock from "nock";

afterAll(() => {
    nock.cleanAll();
    nock.restore();
});
