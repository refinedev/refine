"use client";

import dataProviderSimpleRest from "@refinedev/simple-rest";

export const API_URL = "https://api.fake-rest.refine.dev";

export const dataProvider = dataProviderSimpleRest(API_URL);
