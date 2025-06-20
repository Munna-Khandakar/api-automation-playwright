# API Automation

This repository contains automated API test suites built with Playwright, validating integration endpoints for seamless interoperability with third-party applications.
## Installation

Install dependencies:
   ```bash
   npm install
   ```

Set up environment variables by copying the example file and updating with your values:
   ```bash
   cp .env.example .env
   ```

## Environment Configuration

Create a `.env` file in the root directory with the following structure:

```
# Project configurations

# IDEAS project
IDEAS_BASE_URL=https://ideas.ideascale.me
IDEAS_SUPERUSER_API_TOKEN=your_superuser_token_here
IDEAS_MODERATOR_API_TOKEN=your_moderator_token_here
IDEAS_ADMIN_API_TOKEN=your_admin_token_here

# UNIT project
UNIT_BASE_URL=https://ideas.ideascale.me
UNIT_SUPERUSER_API_TOKEN=your_superuser_token_here
UNIT_MODERATOR_API_TOKEN=your_moderator_token_here
UNIT_ADMIN_API_TOKEN=your_admin_token_here
```

Replace the placeholder values with your actual API tokens.

## Usage

### Running Tests

Run all tests:
```bash
npm test
```

Run tests with UI mode:
```bash
npm run test:ui
```

View the HTML test report:
```bash
npm run show-report
```

## Project Structure

```
api-automation/
├── src/
│   ├── fixtures/       # Custom test fixtures
│   ├── tests/          # Test files
│   │   └── api/        # API test files
│   └── type/           # TypeScript type definitions
│       └── enums/      # Enum definitions
├── playwright.config.ts # Playwright configuration
├── .env                # Environment variables (not in version control)
├── .env.example        # Example environment variables
└── package.json        # Project dependencies and scripts
```

## Writing Tests

Example test:

```typescript
import { expect } from "@playwright/test";
import { test } from "@fixture/request-fixture";
import { USER } from "@type/enums/User";
import { PROJECT } from "@type/enums/Project";

test("[GET] Resource endpoint", async ({ request, api_tokens }, testInfo) => {
    const projectName = testInfo.project.name;
    
    // Skip test for specific project
    test.skip(projectName === PROJECT.UNIT, 'Skipping test for UNIT project');

    // Test as a specific user
    await test.step(`As SUPERUSER`, async () => {
        const response = await request.token(api_tokens.SUPERUSER).get("/endpoint");
        expect(response.status()).toBe(200);
    });
    
    // Test with all user roles
    for (const [userType, token] of Object.entries(api_tokens)) {
        await test.step(`As ${userType}`, async () => {
            const response = await request.token(token).get("/endpoint");
            expect(response.status()).toBe(200);
        });
    }
});
```
