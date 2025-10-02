import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import { List } from "./components/List";

function App() {
  return (
    <Refine
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "blog_posts",
        },
      ]}
    >
      <List />
    </Refine>
  );
}

export default App;
