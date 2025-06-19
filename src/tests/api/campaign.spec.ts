import {expect} from "@playwright/test";
import {test} from "@fixture/request-fixture";
import {USER} from "@type/enums/User";
import {PROJECT} from "@type/enums/Project";

test("[GET] Active Ideas of Campaigns", async ({request, api_tokens}, testInfo) => {

    const projectName = testInfo.project.name;
    test.skip(projectName === PROJECT.UNIT, 'Skipping test for UNIT project');

    await test.step(`As SUPERUSER`, async () => {
        const response = await request.token(api_tokens.SUPERUSER).get("/campaigns/active/ideas");
        expect(response.status()).toBe(200);
    })
    /*
        ### GET USER & TOKEN ###
        const superuserToken = api_tokens.SUPERUSER;
        const isSuperuser = userType === USER.SUPERUSER;
     */
});

test("[GET] Inactive Ideas of Campaigns", async ({request, api_tokens}) => {
    for (const [userType, token] of Object.entries(api_tokens)) {
        await test.step(`As ${userType}`, async () => {
            const response = await request.token(token)
                .get("/campaigns/active/ideas");
            expect(response.status()).toBe(200);
        })
    }
});
