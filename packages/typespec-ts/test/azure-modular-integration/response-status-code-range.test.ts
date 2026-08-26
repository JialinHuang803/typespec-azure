import { assert, beforeEach, describe, it } from "vitest";

import {
  isRestError,
  StatusCodeRangeClient,
} from "./generated/response/status-code-range/src/index.js";

describe("Response StatusCodeRange Client", () => {
  let client: StatusCodeRangeClient;

  beforeEach(() => {
    client = new StatusCodeRangeClient({
      endpoint: "http://localhost:3002",
      allowInsecureConnection: true,
      retryOptions: { maxRetries: 0 },
    });
  });

  it("deserializes the error response for a status code in range", async () => {
    const error = await client.errorResponseStatusCodeInRange().catch((error: unknown) => {
      return error;
    });

    assert(isRestError(error));
    assert.strictEqual(error.statusCode, 494);
    assert.deepInclude(error.details, {
      code: "request-header-too-large",
      message: "Request header too large",
    });
  });

  it("deserializes the specific 404 error response before the status code range", async () => {
    const error = await client.errorResponseStatusCode404().catch((error: unknown) => {
      return error;
    });

    assert(isRestError(error));
    assert.strictEqual(error.statusCode, 404);
    assert.deepInclude(error.details, {
      code: "not-found",
      resourceId: "resource1",
    });
  });
});
