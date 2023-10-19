---
"@refinedev/nestjs-query": patch
---

fixed: `dataProvider.custom` uses diffrent client istance.
From now on, `dataProvider.custom` uses the same client istance as other `dataProvider` methods.
