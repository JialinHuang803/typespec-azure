import { assert, beforeEach, describe, it } from "vitest";

import {
  isRestError,
  StatusCodeRangeClient,
} from "./generated/response/status-code-range/src/index.js";

describe("Response StatusCodeRange Client", () => {
  let client: StatusCodeRangeClient;

  async function getRestError(request: Promise<void>) {
    try {
      await request;
      assert.fail("Expected the request to fail");
    } catch (error: unknown) {
      if (!isRestError(error)) {
        throw error;
      }
      return error;
    }
  }

  beforeEach(() => {
    client = new StatusCodeRangeClient({
      endpoint: "http://localhost:3002",
      allowInsecureConnection: true,
      retryOptions: { maxRetries: 0 },
    });
  });

  it("deserializes a 404 response as NotFoundError", async () => {
    const error = await getRestError(client.errorResponseStatusCode404());
    assert.strictEqual(error.statusCode, 404);
    assert.deepEqual(error.details, {
      code: "not-found",
      resourceId: "resource1",
    });
  });

  it("deserializes a response status code in range as ErrorInRange", async () => {
    const error = await getRestError(client.errorResponseStatusCodeInRange());
    assert.strictEqual(error.statusCode, 494);
    assert.deepEqual(error.details, {
      code: "request-header-too-large",
      message: "Request header too large",
    });
  });
});
