import nock from "nock";

// Mock session response for authenticated admin user
nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
  encodedQueryParams: true,
})
  .get("/auth/v1/session")
  .reply(
    200,
    {
      session: {
        access_token: "test-access-token",
        refresh_token: "test-refresh-token",
        expires_at: 1714039095,
        user: {
          id: "bdefac81-2bd1-44d1-b5ed-7abedb96ccce",
          app_metadata: { provider: "email", role: "admin" },
          user_metadata: {
            full_name: "Admin User",
            avatar_url: "https://example.com/avatar.jpg",
          },
          aud: "authenticated",
          email: "admin@refine.dev",
        },
      },
    },
    ["Content-Type", "application/json", "Access-Control-Allow-Origin", "*"],
  );

// Mock session response for authenticated regular user
nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
  encodedQueryParams: true,
})
  .get("/auth/v1/session")
  .reply(
    200,
    {
      session: {
        access_token: "test-access-token",
        refresh_token: "test-refresh-token",
        expires_at: 1714039095,
        user: {
          id: "edefac81-2bd1-44d1-b5ed-7abedb96dddf",
          app_metadata: { provider: "email", role: "user" },
          user_metadata: {
            full_name: "Regular User",
            avatar_url: "https://example.com/avatar2.jpg",
          },
          aud: "authenticated",
          email: "user@refine.dev",
        },
      },
    },
    ["Content-Type", "application/json", "Access-Control-Allow-Origin", "*"],
  );

// Mock session response for unauthenticated user
nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
  encodedQueryParams: true,
})
  .get("/auth/v1/session")
  .reply(
    200,
    {
      session: null,
    },
    ["Content-Type", "application/json", "Access-Control-Allow-Origin", "*"],
  );
