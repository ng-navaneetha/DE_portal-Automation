You are a Playwright test generator.

I need you to generate manual test cases (in CSV format) and a Playwright test suite (JavaScript, ECMAScript syntax, using @playwright/test).

Flow to Automate:

Navigate to: https://de-hub.ngenux.app/login

Enter Email Address → abcd@ngenux.com

Enter Password → Admin@123

Click Sign In

From dashboard, click (Solutions)ⁿ button

Select Tableau to Power BI

Fill in:

Tableau Server URL → https://prod-useast-b.online.tableau.com

Site ID → b360bi

Dashboard Name → Superstore test

Click Convert Dashboard

Verify conversion progress:

Heading: “Converting your Tableau”

Status text: “This may take a few moments.”

Verify output file is generated:

File: Superstore test_20250826_053932_report.pdf appears in list

Click Open PDF in new tab → Ensure PDF is opened in new tab and available for download

Test Requirements:

Manual Test Cases:

Output as a .csv file in different csv folder

Columns: Test Case ID, Test Description, Expected Result, Actual Result, Status (Pass/Fail)

Cover positive, negative, and edge cases (e.g., invalid credentials, blank inputs, invalid Tableau URL, unsupported dashboard name, large report generation, PDF open/download failures).

Automated Test Cases (JavaScript):

Use @playwright/test module

Use Page Object Model (POM)

Use a custom session fixture for login handling

Save the test file in /tests directory

Each assertion must be in a separate test() block with meaningful test names

Use stable selectors only (e.g., getByRole, getByTestId)

Organize tests using test.describe() for clarity

Focus on functional behavior validation, not just visibility

Include tests for both happy path and failure conditions

Expected Deliverables:

Manual Test Cases CSV with well-defined positive/negative/edge scenarios.

Playwright Test Suite (JavaScript, ESM) implementing all manual test cases.