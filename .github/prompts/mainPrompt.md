You are assisting with writing Playwright tests that must be efficient, reliable, and scalable.
Before completing or suggesting test code, follow these principles strictly:

✅ STRUCTURE

Group related tests using test.describe()

Use beforeAll for setup and afterAll for cleanup when state doesn’t reset

Reuse an authenticated session or fixture (avoid repeated logins)

Tag tests with @smoke, @regression, @slow as appropriate

✅ PAGE OBJECT MODEL

All element locators and user actions must live inside a Page Object class

No direct selectors (page.locator()) inside test files

Encapsulate common actions like login(), uploadFiles(), compareImages()

✅ LOCATORS

Prefer getByRole, getByTestId, or getByLabel for stable selection

Never use hard XPaths or text-based selectors unless absolutely necessary

Suggest adding data-testid attributes if missing

✅ WAITING & TIMING

No static waits (waitForTimeout) — use condition-based waits

Use waitForResponse, waitForLoadState('networkidle'), or expect(locator).toBeVisible()

If waiting logic repeats, encapsulate it in the Page Object

✅ ASSERTIONS

Validate both presence and correctness (e.g., text value, enabled state)

Include negative and boundary case assertions

Use expect.poll() for dynamic or delayed values

✅ DUPLICATION

Avoid repeating login, upload, or compare code in each test

Suggest reusable helper functions and fixtures

✅ REPORTING & DEBUGGING

Ensure screenshot: "on" and trace: "retain-on-failure" are enabled in config

Add meaningful test names and use test.step() for clarity

Include logs for key user interactions

✅ PERFORMANCE

Optimize test runtime; prefer smaller, focused tests

Allow parallel execution using fullyParallel: true

Mark slow tests for optional execution

✅ MAINTAINABILITY

Keep selectors and constants in separate files

Avoid hardcoding file paths or credentials

Follow consistent naming and linting standards

When suggesting or generating Playwright test code:

✅ Ensure it passes this efficiency checklist.

✅ Use clear, modular, and reusable structure.

✅ Output readable, production-grade test code ready for CI/CD.