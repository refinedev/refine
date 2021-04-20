import {Admin} from "@pankod/refine"
import dataProvider from "@pankod/refine-json-server"

function App() {
  return (
    <Admin dataProvider={dataProvider("https://readmin-fake-rest.pankod.com/")}/>
  );
}

export default App;
