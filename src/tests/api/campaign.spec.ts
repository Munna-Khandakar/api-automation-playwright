import {expect, test} from "@playwright/test";

test.only("[GET] Active Ideas of Campaigns", async ({request}) => {
    const response = await request.get("/a/rest/v1/campaigns/active/ideas");
    expect(response.status()).toBe(200);
});