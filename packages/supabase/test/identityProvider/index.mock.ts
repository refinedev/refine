import nock from "nock";

// Mock successful user auth response with identities
nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
  encodedQueryParams: true,
})
  .get("/auth/v1/user")
  .reply(
    200,
    {
      user: {
        id: "bdefac81-2bd1-44d1-b5ed-7abedb96ccce",
        app_metadata: { provider: "email", role: "admin" },
        user_metadata: {
          full_name: "John Doe",
          avatar_url: "https://example.com/avatar.jpg",
        },
        aud: "authenticated",
        email: "info@refine.dev",
        identities: [
          {
            identity_id: "6b8dcf5b-f068-401b-95ae-ddd93d771b74",
            id: "bdefac81-2bd1-44d1-b5ed-7abedb96ccce",
            user_id: "bdefac81-2bd1-44d1-b5ed-7abedb96ccce",
            identity_data: {
              email: "info@refine.dev",
              sub: "bdefac81-2bd1-44d1-b5ed-7abedb96ccce",
              email_verified: true,
              phone_verified: false,
              avatar_url: "https://example.com/avatar.jpg",
              full_name: "John Doe",
              name: "John",
              picture: "https://example.com/picture.jpg",
              provider_id: "google-12345",
              hd: "refine.dev",
            },
            provider: "email",
            last_sign_in_at: "2022-11-25T00:00:00Z",
            created_at: "2022-11-25T00:00:00Z",
            updated_at: "2022-11-25T00:00:00Z",
          },
          {
            identity_id: "9c8dcf5b-f068-401b-95ae-ddd93d771b85",
            id: "bdefac81-2bd1-44d1-b5ed-7abedb96ccce",
            user_id: "bdefac81-2bd1-44d1-b5ed-7abedb96ccce",
            identity_data: {
              email: "info@refine.dev",
              sub: "google-oauth-108641694086011111111",
              email_verified: true,
              name: "John Doe",
              picture: "https://lh3.googleusercontent.com/avatar.jpg",
              provider_id: "108641694086011111111",
            },
            provider: "google",
            last_sign_in_at: "2023-05-15T00:00:00Z",
            created_at: "2023-05-15T00:00:00Z",
            updated_at: "2023-05-15T00:00:00Z",
          },
          {
            identity_id: "5a7dcf5b-f068-401b-95ae-ddd93d771c64",
            id: "bdefac81-2bd1-44d1-b5ed-7abedb96ccce",
            user_id: "bdefac81-2bd1-44d1-b5ed-7abedb96ccce",
            identity_data: {
              email: "info@github.com",
              sub: "github-12345",
              avatar_url: "https://github.com/avatar.jpg",
              name: "refine-dev",
              provider_id: "12345",
            },
            provider: "github",
            last_sign_in_at: "2023-08-10T00:00:00Z",
            created_at: "2023-08-10T00:00:00Z",
            updated_at: "2023-08-10T00:00:00Z",
          },
        ],
      },
    },
    ["Content-Type", "application/json", "Access-Control-Allow-Origin", "*"],
  );

// Mock user session response
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
            full_name: "John Doe",
            avatar_url: "https://example.com/avatar.jpg",
          },
          aud: "authenticated",
          email: "info@refine.dev",
          created_at: "2022-11-25T00:00:00Z",
        },
      },
    },
    ["Content-Type", "application/json", "Access-Control-Allow-Origin", "*"],
  )
  // We need this to be persistent to handle multiple calls
  .persist();

// Mock authorize endpoint for GitHub identity
nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
  encodedQueryParams: true,
})
  .get("/auth/v1/user/identities/authorize")
  .query((params) => params.provider === "github")
  .reply(
    200,
    {
      url: "https://github.com/login/oauth/authorize?client_id=test-client-id&redirect_uri=http%3A%2F%2Flocalhost%2Fidentities",
    },
    ["Content-Type", "application/json", "Access-Control-Allow-Origin", "*"],
  );

// Mock link identity response
nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
  encodedQueryParams: true,
})
  .post("/auth/v1/user/identities/link", {
    provider: "github",
  })
  .reply(
    200,
    {
      url: "https://supabase.com/auth/v1/authorize?provider=github",
    },
    ["Content-Type", "application/json", "Access-Control-Allow-Origin", "*"],
  );

// Mock unlink identity response
nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
  encodedQueryParams: true,
})
  .post("/auth/v1/user/identities/unlink")
  .reply(200, { success: true }, [
    "Content-Type",
    "application/json",
    "Access-Control-Allow-Origin",
    "*",
  ]);

// Mock user update response
nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
  encodedQueryParams: true,
})
  .put("/auth/v1/user")
  .reply(
    200,
    {
      user: {
        id: "bdefac81-2bd1-44d1-b5ed-7abedb96ccce",
        app_metadata: { provider: "email", role: "admin" },
        user_metadata: {
          full_name: "Updated Name",
          avatar_url: "https://example.com/avatar-updated.jpg",
        },
        aud: "authenticated",
        email: "info@refine.dev",
        created_at: "2022-11-25T00:00:00Z",
      },
    },
    ["Content-Type", "application/json", "Access-Control-Allow-Origin", "*"],
  );
