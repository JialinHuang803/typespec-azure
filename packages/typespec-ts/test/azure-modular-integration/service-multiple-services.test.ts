import { assert, beforeEach, describe, it } from "vitest";

import { ServiceAClient } from "./generated/service/multiple-services/src/index.js";

describe("Service MultipleServices ServiceA Client", () => {
  let client: ServiceAClient;

  beforeEach(() => {
    client = new ServiceAClient({
      endpoint: "http://localhost:3002",
      allowInsecureConnection: true,
      retryOptions: { maxRetries: 0 },
    });
  });

  it("calls the ServiceA operation group", async () => {
    const result = await client.operations.opA();
    assert.isUndefined(result);
  });

  it("calls the ServiceA subnamespace", async () => {
    const result = await client.subNamespace.subOpA();
    assert.isUndefined(result);
  });
});
