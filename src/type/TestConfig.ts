import { USER } from "./enums/User";

export type TestConfig = {
    api_tokens: Record<USER, string>;
};