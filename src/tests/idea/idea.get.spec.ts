import {expect} from "@playwright/test";
import {test} from "@fixture/request-fixture";
import {ArrayAssertionUtil} from "@utils/ArrayAssertionUtil";

test.describe("GET", () => {
    test("/v1/idea/link-qualifiers", async ({request, api_tokens}) => {
        for (const [userType, token] of Object.entries(api_tokens)) {
            await test.step(userType, async () => {
                const apiResponse = await request.token(token).get("/v1/idea/link-qualifiers");
                expect(apiResponse.status()).toBe(200);
                const response = await apiResponse.json();
                ArrayAssertionUtil.expectNonEmptyArray(response);
            })
        }
    });

    test("/v1/idea/link/qualifierKeys", async ({request, api_tokens}) => {
        for (const [userType, token] of Object.entries(api_tokens)) {
            await test.step(userType, async () => {
                const apiResponse = await request.token(token).get("/v1/idea/link/qualifierKeys");
                expect(apiResponse.status()).toBe(200);
                const response = await apiResponse.json();
                ArrayAssertionUtil.expectNonEmptyArray(response)
            })
        }
    });

    test("/v1/idea/number/{ideaNumber}", async ({request, api_tokens}) => {
        const ideaNumber = 4160;
        for (const [userType, token] of Object.entries(api_tokens)) {
            await test.step(userType, async () => {
                const apiResponse = await request.token(token).get(`/v1/idea/number/${ideaNumber}`);
                expect(apiResponse.status()).toBe(200);
                const response = await apiResponse.json();
                expect(response).toHaveProperty("ideaNumber", ideaNumber);
            })
        }
    });
})
