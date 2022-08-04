---
"@pankod/refine-appwrite": major
---

- Added `databaseId` support 
- Upgraded Appwrite SDK to 9


```tsx
import { Refine, AuthProvider } from "@pankod/refine-core";
import { Account, Appwrite, Storage } from "@pankod/refine-appwrite";

const APPWRITE_URL = "https://YOUR_COOL_APPWRITE_URL";
const APPWRITE_PROJECT = "YOUR_PROJECT_ID";

const appwriteClient = new Appwrite();

appwriteClient.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT);

<Refine
    dataProvider={dataProvider(appwriteClient, {
        databaseId: "default",
    })}
    liveProvider={liveProvider(appwriteClient, {
        databaseId: "default",
    })}
    ...
    ...
/>
```