import nock from "nock";

// Mock successful login response with email/password
nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
  encodedQueryParams: true,
})
  .post("/auth/v1/token", {
    email: "info@refine.dev",
    password: "refine-supabase",
    gotrue_meta_security: {},
  })
  .query({ grant_type: "password" })
  .reply(
    200,
    {
      access_token: "test-access-token",
      token_type: "bearer",
      expires_in: 3600,
      expires_at: 1714039095,
      refresh_token: "test-refresh-token",
      user: {
        id: "bdefac81-2bd1-44d1-b5ed-7abedb96ccce",
        app_metadata: { provider: "email", role: "admin" },
        user_metadata: { full_name: "Test User" },
        aud: "authenticated",
        email: "info@refine.dev",
      },
    },
    ["Content-Type", "application/json", "Access-Control-Allow-Origin", "*"],
  );

// Mock failed login response
nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
  encodedQueryParams: true,
})
  .post("/auth/v1/token", {
    email: "wrong@refine.dev",
    password: "wrong-password",
    gotrue_meta_security: {},
  })
  .query({ grant_type: "password" })
  .reply(
    400,
    {
      error: "invalid_grant",
      error_description: "Invalid login credentials",
    },
    ["Content-Type", "application/json", "Access-Control-Allow-Origin", "*"],
  );

// Mock logout response
nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
  encodedQueryParams: true,
})
  .post("/auth/v1/logout")
  .query({ scope: "global" })
  .reply(204, "", [
    "Content-Type",
    "application/json",
    "Access-Control-Allow-Origin",
    "*",
  ]);

// Mock password reset request
nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
  encodedQueryParams: true,
})
  .post("/auth/v1/recover", {
    email: "info@refine.dev",
    gotrue_meta_security: {},
  })
  .reply(200, {}, [
    "Content-Type",
    "application/json",
    "Access-Control-Allow-Origin",
    "*",
  ]);

// Mock update password
nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
  encodedQueryParams: true,
})
  .put("/auth/v1/user", {
    password: "new-password",
  })
  .reply(
    200,
    {
      id: "bdefac81-2bd1-44d1-b5ed-7abedb96ccce",
      app_metadata: { provider: "email" },
      user_metadata: {},
      aud: "authenticated",
      email: "info@refine.dev",
    },
    ["Content-Type", "application/json", "Access-Control-Allow-Origin", "*"],
  );

// Mock successful registration
nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
  encodedQueryParams: true,
})
  .post("/auth/v1/signup", {
    email: "new@refine.dev",
    password: "new-password",
    gotrue_meta_security: {},
    options: {
      data: {},
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  })
  .reply(
    200,
    {
      id: "edefac81-2bd1-44d1-b5ed-7abedb96dddf",
      app_metadata: { provider: "email" },
      user_metadata: {},
      aud: "authenticated",
      email: "new@refine.dev",
      email_confirmed_at: null, // Email not confirmed
    },
    ["Content-Type", "application/json", "Access-Control-Allow-Origin", "*"],
  );

// Mock verify token hash
nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
  encodedQueryParams: true,
})
  .post("/auth/v1/verify", {
    type: "recovery",
    token_hash: "valid-token-hash",
  })
  .reply(200, {}, [
    "Content-Type",
    "application/json",
    "Access-Control-Allow-Origin",
    "*",
  ]);

// Mock failed verify token hash
nock("https://iwdfzvfqbtokqetmbmbp.supabase.co:443", {
  encodedQueryParams: true,
})
  .post("/auth/v1/verify", {
    type: "recovery",
    token_hash: "invalid-token-hash",
  })
  .reply(
    400,
    {
      error: "invalid_token",
      error_description: "Invalid token",
    },
    ["Content-Type", "application/json", "Access-Control-Allow-Origin", "*"],
  );

// Mock successful session check
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
        expires_at: 2714039095, // Future date
        user: {
          id: "bdefac81-2bd1-44d1-b5ed-7abedb96ccce",
          app_metadata: { provider: "email" },
          user_metadata: {},
          aud: "authenticated",
          email: "info@refine.dev",
        },
      },
    },
    ["Content-Type", "application/json", "Access-Control-Allow-Origin", "*"],
  );

// Mock expired session check
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
        expires_at: 1614039095, // Past date
        user: {
          id: "bdefac81-2bd1-44d1-b5ed-7abedb96ccce",
          app_metadata: { provider: "email" },
          user_metadata: {},
          aud: "authenticated",
          email: "info@refine.dev",
        },
      },
    },
    ["Content-Type", "application/json", "Access-Control-Allow-Origin", "*"],
  );

// Mock no session check
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
