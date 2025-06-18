import {expect} from "@playwright/test";
import {test} from "../../fixtures/request-fixture";

test("[GET] Active Ideas of Campaigns", async ({request, api_tokens}) => {
    for (const [userType, token] of Object.entries(api_tokens)) {
        await test.step(`As ${userType}`, async () => {
            const response = await request.get("/campaigns/active/ideas", {
                headers: {api_token: token}
            });
            expect(response.status()).toBe(200);
        })
    }
});


test("[GET] Inactive Ideas of Campaigns", async ({request, api_tokens}) => {
    for (const [userType, token] of Object.entries(api_tokens)) {
        await test.step(`As ${userType}`, async () => {
            const response = await request.get("/campaigns/active/ideas", {
                headers: {api_token: token}
            });
            expect(response.status()).toBe(200);
        })
    }
});
