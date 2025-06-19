import {test as base} from '@playwright/test';
import {TestConfig} from "@type/TestConfig";
import {CustomAPIRequestContext} from "@type/CustomAPIRequestContext";

const basePath = '/a/rest';

export const test = base.extend<TestConfig & { request: CustomAPIRequestContext }>({
    api_tokens: [{
        SUPERUSER: "",
        MODERATOR: "",
        ADMIN: "",
    }, {option: true}],

    // Override the built-in request fixture to prepend the common base path
    request: async ({request}, use) => {
        const createRequestWrapper = (customToken?: string) => {
            return {
                token: (token: string) => {
                    return createRequestWrapper(token);
                },

                get: (url: string, options?: any) => {
                    const fullUrl = url.startsWith('http') ? url : `${basePath}${url}`;
                    const updatedOptions = customToken ? {
                        ...options,
                        headers: {
                            ...(options?.headers || {}),
                            api_token: customToken
                        }
                    } : options;

                    return request.get(fullUrl, updatedOptions);
                },

                post: (url: string, options?: any) => {
                    const fullUrl = url.startsWith('http') ? url : `${basePath}${url}`;
                    const updatedOptions = customToken ? {
                        ...options,
                        headers: {
                            ...(options?.headers || {}),
                            api_token: customToken
                        }
                    } : options;

                    return request.post(fullUrl, updatedOptions);
                },

                put: (url: string, options?: any) => {
                    const fullUrl = url.startsWith('http') ? url : `${basePath}${url}`;
                    const updatedOptions = customToken ? {
                        ...options,
                        headers: {
                            ...(options?.headers || {}),
                            api_token: customToken
                        }
                    } : options;

                    return request.put(fullUrl, updatedOptions);
                },

                delete: (url: string, options?: any) => {
                    const fullUrl = url.startsWith('http') ? url : `${basePath}${url}`;
                    const updatedOptions = customToken ? {
                        ...options,
                        headers: {
                            ...(options?.headers || {}),
                            api_token: customToken
                        }
                    } : options;

                    return request.delete(fullUrl, updatedOptions);
                },

                patch: (url: string, options?: any) => {
                    const fullUrl = url.startsWith('http') ? url : `${basePath}${url}`;
                    const updatedOptions = customToken ? {
                        ...options,
                        headers: {
                            ...(options?.headers || {}),
                            api_token: customToken
                        }
                    } : options;

                    return request.patch(fullUrl, updatedOptions);
                },

                fetch: (url: string, options?: any) => {
                    const fullUrl = url.startsWith('http') ? url : `${basePath}${url}`;
                    const updatedOptions = customToken ? {
                        ...options,
                        headers: {
                            ...(options?.headers || {}),
                            api_token: customToken
                        }
                    } : options;

                    return request.fetch(fullUrl, updatedOptions);
                }
            };
        };

        // Create the initial wrapper with no token
        const wrappedRequest = createRequestWrapper();

        await use(wrappedRequest as any);
    }
});
