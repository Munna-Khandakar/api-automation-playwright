import {APIRequestContext, test as base} from '@playwright/test';

const basePath = '/a/rest/v1';

export type TestOptions = {
    api_tokens: {
        SUPERUSER_API_TOKEN: string;
        MODERATOR_API_TOKEN: string;
    }
};

export const test = base.extend<TestOptions, { api: APIRequestContext }>({
    api_tokens: [{
        SUPERUSER_API_TOKEN: "",
        MODERATOR_API_TOKEN: ""
    }, {option: true}],

    // Override the built-in request fixture to prepend the common base path
    request: async ({request}, use) => {

        const wrappedRequest = {
            get: (url: string, options?: any) => {
                const fullUrl = url.startsWith('http') ? url : `${basePath}${url}`;
                return request.get(fullUrl, options);
            },
            post: (url: string, options?: any) => {
                const fullUrl = url.startsWith('http') ? url : `${basePath}${url}`;
                return request.post(fullUrl, options);
            },
            put: (url: string, options?: any) => {
                const fullUrl = url.startsWith('http') ? url : `${basePath}${url}`;
                return request.put(fullUrl, options);
            },
            delete: (url: string, options?: any) => {
                const fullUrl = url.startsWith('http') ? url : `${basePath}${url}`;
                return request.delete(fullUrl, options);
            },
            patch: (url: string, options?: any) => {
                const fullUrl = url.startsWith('http') ? url : `${basePath}${url}`;
                return request.patch(fullUrl, options);
            },
            fetch: (url: string, options?: any) => {
                const fullUrl = url.startsWith('http') ? url : `${basePath}${url}`;
                return request.fetch(fullUrl, options);
            }
        };

        await use(wrappedRequest as any);
    }
});
