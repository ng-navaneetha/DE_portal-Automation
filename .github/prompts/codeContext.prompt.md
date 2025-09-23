You are a Playwright test generator.

Use the provided screenshots (PNG files) for output assertions.

Follow this exact flow step by step:
login with 'abcd@ngenux.com', admin@123
1. Click on the button with role 'button' and name '(Tools)ⁿ'
2. Click on the link 'Code Context'
3. Click on the tab 'Browse Procedures'
4. From the row 'calculate_average Stored', click its action button
5. Verify 'Procedure Metadata:' heading is visible
6. Verify 'Fully Qualified Name:sample_data.ecommerce_db.shopify.calculate_average' is displayed
7. Verify 'Fully Qualified Name:sample_data.ecommerce_db.shopify.calculate_averageDatabase' is displayed
8. Verify 'ecommerce_db' and 'shopify' schema names are clickable
9. Verify 'SQL Code:' heading and SQL code area with class '.bg-zinc-900'
10. Navigate back to the list
11. Again open 'calculate_average Stored' row and click Parse
12. Verify 'Conversion Results', 'Success', and converted procedure metadata are shown
13. Verify the conversion timestamp text
14. Switch to 'Business Description' tab
15. Verify the description, pseudo code, tables used, line count, and token count
16. Verify 'Stored Procedures Used' heading and SQL code snippet 'CREATE OR REPLACE PROCEDURE'
17. Click 'Start New Conversion' and confirm navigation

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
   - Use a custom session fixture for login(import { test, expect } from '../fixtures/test-base.js';
   )
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