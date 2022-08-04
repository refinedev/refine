---
"@pankod/refine-appwrite": major
---

- Added `databaseId` support. The Default value is `default` for backward compability
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

## Breaking changes of Appwrite SDK

### Usage of Storage
```tsx
//old way
import { Appwrite } from "@pankod/refine-appwrite";
const appwriteClient = new Appwrite();

appwriteClient.storage.createFile(
    "BUCKET_NAME",
    rcFile.name,
    rcFile,
);

//new way
const appwriteClient = new Appwrite();
const storage = new Storage(appwriteClient);
const { $id } = await storage.createFile(
    "BUCKET_NAME",
    rcFile.name,
    rcFile,
);
```