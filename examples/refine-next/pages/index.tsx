import React from "react";

import { Refine } from "@pankod/refine";

import dataProvider from "@pankod/refine-simple-rest";

const API_URL = "https://api.fake-rest.refine.dev";

const Home: React.FC = () => {
    return <Refine dataProvider={dataProvider(API_URL)}></Refine>;
};

export default Home;
