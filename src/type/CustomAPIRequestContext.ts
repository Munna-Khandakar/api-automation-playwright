import {APIRequestContext} from "@playwright/test";

export type CustomAPIRequestContext = {
    token: (token: string) => CustomAPIRequestContext
} & APIRequestContext;