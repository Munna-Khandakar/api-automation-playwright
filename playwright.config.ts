import {defineConfig, devices} from '@playwright/test';
import * as dotenv from "dotenv";
import {TestConfig} from "@type/TestConfig";
import {PROJECT} from "@type/enums/Project";
import {USER} from "@type/enums/User";

dotenv.config();

export default defineConfig<TestConfig>({
    testDir: './src/tests',

    fullyParallel: true,

    forbidOnly: !!process.env.CI,

    retries: process.env.CI ? 2 : 0,

    workers: process.env.CI ? 1 : undefined,

    reporter: 'html',

    use: {
        trace: 'on-first-retry',
    },

    projects: Object.values(PROJECT).map(project => {
        const projectName = project.toUpperCase();
        return {
            name: project,
            use: {
                baseURL: process.env[`${projectName}_BASE_URL`],
                api_tokens: {
                    [USER.SUPERUSER]: process.env[`${projectName}_SUPERUSER_API_TOKEN`],
                    [USER.MODERATOR]: process.env[`${projectName}_MODERATOR_API_TOKEN`],
                    [USER.ADMIN]: process.env[`${projectName}_ADMIN_API_TOKEN`],
                },
                ...devices['Desktop Chrome']
            },
        };
    }),
});
