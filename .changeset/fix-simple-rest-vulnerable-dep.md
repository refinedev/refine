---
"@refinedev/simple-rest": patch
---

fix(simple-rest): issue with vulnerable `decode-uri-component` dependency. #7601

We had a vulnerability (GHSA-vcc3-ghjq-m6fr / CVE-2026-45822) where `@refinedev/simple-rest` pulled in `decode-uri-component@<0.5.0` via `query-string@7`. Replaced `query-string` with `qs` to eliminate the security vulnerability while preserving full CommonJS (CJS) and ESM dual module compatibility.

Fixes #7601
