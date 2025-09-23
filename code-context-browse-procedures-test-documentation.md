# Code Context Browse Procedures - Test Documentation

## Overview

This document provides comprehensive testing documentation for the Code Context Browse Procedures feature, including both manual test cases and automated Playwright tests.

## Test Flow Summary

The test flow covers the complete user journey for browsing and analyzing stored procedures in the Code Context module:

1. **Authentication**: Login with credentials (abcd@ngenux.com / admin@123)
2. **Navigation**: Access Code Context through Tools menu
3. **Browse Procedures**: View and interact with stored procedures list
4. **Procedure Details**: View metadata, SQL code, and procedure information
5. **Parse Functionality**: Convert procedures and view conversion results
6. **Business Description**: Analyze business logic and procedure usage
7. **New Conversion**: Start new conversion processes

## Raw Playwright Script Analysis

The original script provided includes both Browse Tables and Browse Procedures interactions. Here's the breakdown:

### Browse Tables Flow
```javascript
await page.getByRole('button', { name: '(Tools)ⁿ' }).click();
await page.getByRole('link', { name: 'Code Context' }).click();
await page.getByRole('tab', { name: 'Browse Tables' }).click();
await page.getByText('Explore all database tables,').click();
await page.locator('.p-4.align-middle.\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pr-0.px-4').first().click();
// ... additional Browse Tables interactions
```

### Browse Procedures Flow (Main Focus)
The main test flow as described in the requirements:

1. Login with 'abcd@ngenux.com', admin@123
2. Click on the button with role 'button' and name '(Tools)ⁿ'
3. Click on the link 'Code Context'
4. Click on the tab 'Browse Procedures'
5. From the row 'calculate_average Stored', click its action button
6. Verify 'Procedure Metadata:' heading is visible
7. Verify 'Fully Qualified Name:sample_data.ecommerce_db.shopify.calculate_average' is displayed
8. Verify 'Fully Qualified Name:sample_data.ecommerce_db.shopify.calculate_averageDatabase' is displayed
9. Verify 'ecommerce_db' and 'shopify' schema names are clickable
10. Verify 'SQL Code:' heading and SQL code area with class '.bg-zinc-900'
11. Navigate back to the list
12. Again open 'calculate_average Stored' row and click Parse
13. Verify 'Conversion Results', 'Success', and converted procedure metadata are shown
14. Verify the conversion timestamp text
15. Switch to 'Business Description' tab
16. Verify the description, pseudo code, tables used, line count, and token count
17. Verify 'Stored Procedures Used' heading and SQL code snippet 'CREATE OR REPLACE PROCEDURE'
18. Click 'Start New Conversion' and confirm navigation

## Manual Test Cases

### CSV Format
The manual test cases are stored in: `CSV/code-context-browse-procedures-manual-test-cases.csv`

### Key Test Categories

#### Authentication & Navigation (TC-CC-BT-001 to TC-CC-BT-003)
- Login validation
- Tools menu access
- Code Context navigation

#### Browse Tables Functionality (TC-CC-BT-004 to TC-CC-BT-031)
- Table browsing and interaction
- Lineage visualization
- Data viewing and refresh

#### Browse Procedures Core Flow (TC-CC-BP-001 to TC-CC-BP-024)
- Procedure listing and selection
- Metadata verification
- SQL code display
- Parse functionality
- Business description analysis
- Conversion workflow

### Test Case Structure
Each test case includes:
- **Test Case ID**: Unique identifier following pattern TC-CC-[BT/BP]-XXX
- **Test Description**: Clear description of the test action
- **Expected Result**: What should happen when the test is executed
- **Actual Result**: Field for recording actual outcomes
- **Status**: Pass/Fail/Not Executed

## Automated Playwright Tests

### Test File Location
`tests/code-context-browse-procedures.spec.js`

### Test Architecture

#### Dependencies
```javascript
import { test, expect } from '../fixtures/test-base.js';
import { CodeContextPage } from '../page-objects/codeContextPage.js';
```

#### Test Structure
- **Page Object Model**: Uses `CodeContextPage` class for element selectors
- **Custom Fixture**: Leverages `test-base.js` for authenticated sessions
- **ECMAScript Syntax**: Modern import/export statements
- **Stable Selectors**: Prioritizes `getByRole`, `getByTestId` over CSS selectors

### Test Categories

#### 1. Navigation Tests
```javascript
test('Navigation - Should navigate to Code Context Browse Procedures')
```
- Verifies basic navigation flow
- Confirms tab activation

#### 2. Procedure Details Tests
```javascript
test('Procedure Details - Should display procedure metadata correctly')
```
- Validates metadata display
- Checks fully qualified names
- Verifies clickable elements

#### 3. SQL Code Display Tests
```javascript
test('SQL Code Display - Should show SQL code area with correct styling')
```
- Confirms SQL code heading
- Validates styling classes

#### 4. Parse Functionality Tests
```javascript
test('Parse Functionality - Should parse procedure and show conversion results')
```
- Tests conversion process
- Validates success indicators
- Checks timestamp display

#### 5. Business Description Tests
```javascript
test('Business Description Tab - Should display business description correctly')
```
- Validates tab switching
- Checks content sections
- Verifies metrics display

#### 6. Edge Cases and Negative Tests
```javascript
test('Negative Test - Should handle missing procedure gracefully')
test('Edge Case - Should handle procedure with special characters')
```
- Tests error handling
- Validates edge case scenarios

### Test Best Practices Applied

#### Locator Strategy
- **Primary**: `getByRole()` for accessibility and stability
- **Secondary**: `getByText()` for content verification
- **Fallback**: CSS classes only when necessary (e.g., `.bg-zinc-900`)

#### Test Steps Organization
```javascript
await test.step('Click Tools button', async () => {
  await page.getByRole('button', { name: '(Tools)ⁿ' }).click();
});
```
- Clear step descriptions
- Logical grouping of actions
- Improved reporting and debugging

#### Assertions
- Auto-retrying web-first assertions
- Specific content verification
- State validation (aria-selected, visibility)

## Configuration and Setup

### Prerequisites
1. Playwright installed and configured
2. Test environment with valid credentials
3. Application accessible at base URL
4. Authentication fixture properly configured

### Running Tests

#### Manual Tests
1. Open CSV file: `CSV/code-context-browse-procedures-manual-test-cases.csv`
2. Execute each test case step by step
3. Record actual results and status

#### Automated Tests
```bash
# Run all Browse Procedures tests
npx playwright test code-context-browse-procedures.spec.js

# Run specific test
npx playwright test code-context-browse-procedures.spec.js -g "Navigation"

# Run with debug mode
npx playwright test code-context-browse-procedures.spec.js --debug

# Generate report
npx playwright test --reporter=html
```

### Environment Variables
Ensure the following are configured:
- `ENV_FILE`: Points to environment configuration
- Base URL for the application
- Test credentials (if not hardcoded)

## Coverage Analysis

### Positive Test Coverage
- ✅ Basic navigation flow
- ✅ Procedure metadata display
- ✅ SQL code visualization
- ✅ Parse functionality
- ✅ Business description tab
- ✅ Conversion workflow

### Negative Test Coverage
- ✅ Missing procedure handling
- ✅ Special character support
- ⚠️ Network error scenarios
- ⚠️ Invalid procedure data

### Edge Case Coverage
- ✅ Empty procedure lists
- ✅ Long procedure names
- ⚠️ Large SQL code blocks
- ⚠️ Concurrent user scenarios

## Maintenance Notes

### Future Enhancements
1. **API Testing**: Add tests for backend procedure parsing APIs
2. **Performance Testing**: Validate load times for large procedures
3. **Cross-browser Testing**: Ensure compatibility across browsers
4. **Mobile Testing**: Validate responsive design
5. **Accessibility Testing**: Comprehensive ARIA and keyboard navigation tests

### Known Issues
1. **Timestamp Validation**: Current test uses generic selector - needs specific data-testid
2. **Navigation Confirmation**: New conversion flow URL pattern needs validation
3. **Error Handling**: More robust error state testing needed

### Selector Maintenance
- Monitor for UI changes that might break selectors
- Prefer data-testid attributes for critical elements
- Regular review of CSS class-based selectors

## Troubleshooting

### Common Issues

#### Authentication Failures
- Verify credentials in test configuration
- Check if auth.json file exists and is valid
- Ensure login session setup is properly configured

#### Element Not Found
- Check if UI has changed (element names, roles)
- Verify timing - add proper waits if needed
- Confirm element is actually visible in current test state

#### Test Flakiness
- Review wait conditions
- Check for race conditions in navigation
- Validate element stability before interaction

### Debug Commands
```bash
# Run with headed browser for visual debugging
npx playwright test --headed

# Generate trace for failed tests
npx playwright test --trace on

# Step through test execution
npx playwright test --debug
```

## Conclusion

This test suite provides comprehensive coverage of the Code Context Browse Procedures functionality, combining both manual verification processes and automated regression testing. The implementation follows Playwright best practices and provides a solid foundation for maintaining quality assurance of this critical feature.

Regular execution of these tests will help ensure:
- Feature functionality remains intact
- UI changes don't break core workflows
- New features integrate properly with existing functionality
- Performance characteristics remain acceptable

The modular structure allows for easy extension and maintenance as the feature evolves.