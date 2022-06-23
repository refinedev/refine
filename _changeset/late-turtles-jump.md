---
"@pankod/refine-cloud": minor
---

Add HOC `withCloud` function. This function, your application will communicate with the refine cloud. Check out the `examples/cloud` folder for more.

```
import { Refine } from "@pankod/refine-core";
import { withCloud } from "@pankod/refine-cloud";

const RefineWithCloud = withCloud(Refine, {
    baseUrl: process.env.REACT_APP_REFINE_BASE_URL as string,
    clientId: process.env.REACT_APP_REFINE_CLIENT_ID as string,
});

const App: React.FC = () => {
    return (
        <RefineWithCloud
            LoginPage={LoginPage}
            routerProvider={routerProvider}
            dataProvider={dataProvider(API_URL)}
            resources={[
                {
                    name: "posts",
                    list: PostList,
                    create: PostCreate,
                    edit: PostEdit,
                    show: PostShow,
                    canDelete: true,
                },
            ]}
            notificationProvider={notificationProvider}
            Layout={Layout}
            catchAll={<ErrorComponent />}
        />
    );
};

export default App;
```
