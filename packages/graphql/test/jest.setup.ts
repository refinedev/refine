import nock from "nock";
import { writeFileSync } from "fs";

// it's actually sending request to the server and print "mock" to console for you to copy and paste.
// nock.recorder.rec({
//   use_separator: false,
//   // logging: (content) => writeFileSync("./index.mock.ts", content),
// });

afterAll(() => {
  nock.cleanAll();
  nock.restore();
});
