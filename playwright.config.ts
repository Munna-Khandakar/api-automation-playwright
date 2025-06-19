import {defineConfig, devices} from '@playwright/test';
import {TestConfig} from "@type/TestConfig";

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

    projects: [
        {
            name: 'ideas',
            use: {
                baseURL: "https://ideas.ideascale.me",
                api_tokens: {
                    SUPERUSER_API_TOKEN: "#",
                    MODERATOR_API_TOKEN: "#",
                },
                ...devices['Desktop Chrome']
            },
        },
        {
            name: 'unit',
            use: {
                baseURL: "https://ideas.ideascale.me",
                api_tokens: {
                    SUPERUSER_API_TOKEN: "#",
                    MODERATOR_API_TOKEN: "#",
                },
                ...devices['Desktop Chrome']
            },
        },
    ],
});
