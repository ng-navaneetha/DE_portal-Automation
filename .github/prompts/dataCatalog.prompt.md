You are a Playwright test generator.

Use the provided screenshots (PNG files) for output assertions.

Follow this exact flow step by step:
login with 'abcd@ngenux.com', admin@123
1. Click on the link 'Data Catalog'
2. Inside the iframe titled "DBT":
   - Fill '* Email' textbox with 'admin@open-metadata.org'
   - Fill '* Password Forgot Password' textbox with 'admin'
   - Click the 'login' button
3. Close the 'What's New' alert (testId='close-whats-new-alert')
4. Click the 'Lineage' tab (testId='app-bar-item-lineage')
5. Click the dropdown (id='rc_select_1')
6. Select 'node-suggestion-ometa_api_service.tables' from the list
7. Click on the '.react-flow__pane' area to focus the graph
8. Click node with testId='rf__node-3d68b9e2-a07b-467b-a7fa-c6745296f34a'
9. Verify the following UI elements appear:
   - 'Domain-label'
   - 'Endpoint URL-label'
   - 'Service' field visible
10. Click the link that opens `https://docs.open-metadata.org/swagger.html#tag/Tables` in a popup and handle it using `waitForEvent('popup')`
11. Verify entity details:
   - Click 'entity-link'
   - Verify 'Activity Feeds & Tasks0' is visible
   - Click 'Custom Properties' section

Deliverables:
1. **Manual Test Cases** in CSV format with columns: in CSV folder which is in root folder
   - Test Case ID
   - Test Description
   - Expected Result
   - Actual Result
   - Status (Pass/Fail)

2. **Automated Playwright Tests** in JavaScript that:
   - Use @playwright/test
   - Follow Page Object Model
   - Use a custom session fixture for login (import { test, expect } from '../fixtures/test-base.js';)
   - Use ECMAScript syntax (import/export)
   - Write one assertion per test() with descriptive names
   - Use stable selectors (getByRole, getByTestId)
   - Organize with test.describe()
   - Save test file in /tests directory
   - Verify both positive, negative, and edge cases

Important:
- Cover all steps in the flow.
- Verify not just element presence but correct behavior and outcome.
- Assertions must match the UI state from screenshots.
- Generate both CSV manual test cases and Playwright code in one response.
