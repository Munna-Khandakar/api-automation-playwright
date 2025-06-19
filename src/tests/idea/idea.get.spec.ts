import {expect} from "@playwright/test";
import {test} from "@fixture/request-fixture";
import {ArrayAssertionUtil} from "@utils/ArrayAssertionUtil";

test.describe("GET", () => {
    test("Get idea submission form for campaign", async ({request, api_tokens}) => {
        const campaignId = 188;
        for (const [userType, token] of Object.entries(api_tokens)) {
            await test.step(userType, async () => {
                const apiResponse = await request.token(token).get(`/idea-form/campaigns/${campaignId}`);
                expect(apiResponse.status()).toBe(200);
                const response = await apiResponse.json();
                const formFields = response.formFields;
                ArrayAssertionUtil.expectNonEmptyArray(formFields);
                ArrayAssertionUtil.expectArrayWithFieldValue(formFields, "key", "title");
                ArrayAssertionUtil.expectArrayWithFieldValue(formFields, "key", "text");
            })
        }
    });

    test("Get contributors for idea form", async ({request, api_tokens}) => {
        const campaignId = 188;
        for (const [userType, token] of Object.entries(api_tokens)) {
            await test.step(userType, async () => {
                const apiResponse = await request.token(token).get(`/idea-form/campaigns/${campaignId}/contributors`);
                expect(apiResponse.status()).toBe(200);
                const response = await apiResponse.json();
                const content = response.content;
                ArrayAssertionUtil.expectNonEmptyArray(content);
                ArrayAssertionUtil.expectArrayWithFieldValue(content, "email", "rob.hoehn@ideascale.com");
                ArrayAssertionUtil.expectArrayWithFieldValue(content, "userName", "robhoehn");
            })
        }
    });

    test("Get on behalf of members for idea form", async ({request, api_tokens}) => {
        const campaignId = 188;
        for (const [userType, token] of Object.entries(api_tokens)) {
            await test.step(userType, async () => {
                const apiResponse = await request.token(token).get(`/idea-form/campaigns/${campaignId}/on-behalf-of-members`);
                expect(apiResponse.status()).toBe(200);
                const response = await apiResponse.json();
                const content = response.content;
                ArrayAssertionUtil.expectNonEmptyArray(content);
                ArrayAssertionUtil.expectArrayWithFieldValue(content, "email", "rob.hoehn@ideascale.com");
                ArrayAssertionUtil.expectArrayWithFieldValue(content, "userName", "robhoehn");
            })
        }
    });

    test("Get draft ideas", async ({request, api_tokens}) => {
        for (const [userType, token] of Object.entries(api_tokens)) {
            await test.step(userType, async () => {
                const apiResponse = await request.token(token).get("/idea-form/drafts");
                expect(apiResponse.status()).toBe(200);
                const response = await apiResponse.json();
                const data = response.data;
                ArrayAssertionUtil.expectNonEmptyArray(data);
                ArrayAssertionUtil.expectArrayWithFieldValue(data, "title", "This is a daft Idea");
                ArrayAssertionUtil.expectArrayWithFieldValue(data, "submitterId", "17409");
                ArrayAssertionUtil.expectArrayWithFieldValue(data, "canDelete", true);
            })
        }
    });

    test("Get draft idea form", async ({request, api_tokens}) => {
        const ideaId = 49495;
        for (const [userType, token] of Object.entries(api_tokens)) {
            await test.step(userType, async () => {
                const apiResponse = await request.token(token).get(`/idea-form/drafts/${ideaId}`);
                expect(apiResponse.status()).toBe(200);
                const response = await apiResponse.json();
                const formFields = response.formFields;
                ArrayAssertionUtil.expectNonEmptyArray(formFields);
                ArrayAssertionUtil.expectArrayWithFieldValue(formFields, "key", "title");
                ArrayAssertionUtil.expectArrayWithFieldValue(formFields, "value", "This is a daft Idea");
            })
        }
    });


    test("Get idea link qualifiers", async ({request, api_tokens}) => {
        for (const [userType, token] of Object.entries(api_tokens)) {
            await test.step(userType, async () => {
                const apiResponse = await request.token(token).get("/idea/link-qualifiers");
                expect(apiResponse.status()).toBe(200);
                const response = await apiResponse.json();
                ArrayAssertionUtil.expectNonEmptyArray(response);
                ArrayAssertionUtil.expectArrayWithFieldValue(response, "qualifierKey", "similar-to")
                ArrayAssertionUtil.expectArrayWithFieldValue(response, "qualifierName", "Similar to")
            })
        }
    });

    test("Get idea link qualifier keys", async ({request, api_tokens}) => {
        for (const [userType, token] of Object.entries(api_tokens)) {
            await test.step(userType, async () => {
                const apiResponse = await request.token(token).get("/idea/link/qualifierKeys");
                expect(apiResponse.status()).toBe(200);
                const response = await apiResponse.json();
                ArrayAssertionUtil.expectNonEmptyArray(response)
                ArrayAssertionUtil.expectArrayContains(response, "similar-to")
            })
        }
    });

    test("Get idea by number", async ({request, api_tokens}) => {
        const ideaNumber = 4160;
        for (const [userType, token] of Object.entries(api_tokens)) {
            await test.step(userType, async () => {
                const apiResponse = await request.token(token).get(`/idea/number/${ideaNumber}`);
                expect(apiResponse.status()).toBe(200);
                const response = await apiResponse.json();
                expect(response).toHaveProperty("ideaNumber", ideaNumber);
            })
        }
    });

    test("Get idea order keys", async ({request, api_tokens}) => {
        for (const [userType, token] of Object.entries(api_tokens)) {
            await test.step(userType, async () => {
                const apiResponse = await request.token(token).get("/idea/orderKeys");
                expect(apiResponse.status()).toBe(200);
                const response = await apiResponse.json();
                ArrayAssertionUtil.expectNonEmptyArray(response)
                ArrayAssertionUtil.expectArrayContains(response, ["date-down", "date-up", "votes-down", "votes-up"])
            })
        }
    });

    test("Get all stages in this community", async ({request, api_tokens}) => {
        for (const [userType, token] of Object.entries(api_tokens)) {
            await test.step(userType, async () => {
                const apiResponse = await request.token(token).get("/idea/status/all");
                expect(apiResponse.status()).toBe(200);
                const response = await apiResponse.json();
                ArrayAssertionUtil.expectNonEmptyArray(response);
                ArrayAssertionUtil.expectArrayWithFieldValue(response, "key", "new")
                ArrayAssertionUtil.expectArrayWithFieldValue(response, "label", "Pending Approval")
            })
        }
    });

    test("Get all interactive stages in this community", async ({request, api_tokens}) => {
        for (const [userType, token] of Object.entries(api_tokens)) {
            await test.step(userType, async () => {
                const apiResponse = await request.token(token).get("/idea/status/all/interactive");
                expect(apiResponse.status()).toBe(200);
                const response = await apiResponse.json();
                ArrayAssertionUtil.expectNonEmptyArray(response);
                ArrayAssertionUtil.expectArrayWithFieldValue(response, "key", "stage-ideate4fd899")
                ArrayAssertionUtil.expectArrayWithFieldValue(response, "label", "Open for voting")
            })
        }
    });
})
