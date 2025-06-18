import {test, expect} from "@playwright/test";

test("GET: User Profile", async ({request}) => {
    const response = await request.get("https://reqres.in/api/users/2");
    expect(response.status()).toBe(200);

    const text = await response.text();
    expect(text).toContain("Janet");
});

test("POST: Create User", async ({request}) => {
    const response = await request.post("https://reqres.in/api/users", {
        headers: {
            "x-api-key": "reqres-free-v1"
        },
        data: {
            name: "Munna Khandakar",
            job: "Software Engineer"
        }
    });
    expect(response.status()).toBe(201);
})

test("PUT: Update User", async ({request}) => {
    const response = await request.put("https://reqres.in/api/users/2", {
        headers: {
            "x-api-key": "reqres-free-v1"
        },
        data: {
            name: "Munna Khandakar",
            job: "Software Engineer"
        }
    });
    expect(response.status()).toBe(200);
});

test("DELETE: Delete User", async ({request}) => {
    const response = await request.delete("https://reqres.in/api/users/2", {
        headers: {
            "x-api-key": "reqres-free-v1"
        }
    });
    expect(response.status()).toBe(204);
});