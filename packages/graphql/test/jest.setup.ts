import nock from "nock";
import { writeFileSync } from "fs";
import { join } from "path";

// it's actually sending request to the server and print "mock" to console for you to copy and paste.
// nock.recorder.rec({
//   use_separator: false,
// });

afterAll(() => {
  nock.cleanAll();
  nock.restore();
});
