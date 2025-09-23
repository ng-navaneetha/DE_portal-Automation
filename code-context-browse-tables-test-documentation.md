# Code Context Browse Tables - Test Documentation

## Overview

This document provides comprehensive testing documentation for the Code Context Browse Tables feature, including both manual test cases and automated Playwright tests. The Browse Tables functionality allows users to explore database tables, view lineage information, and interact with table data.

## Test Flow Summary

The test flow covers the complete user journey for browsing and analyzing database tables in the Code Context module:

1. **Authentication**: Login with credentials (abcd@ngenux.com / admin@123)
2. **Navigation**: Access Code Context through Tools menu → Browse Tables tab
3. **Table Exploration**: Explore database tables and basic interactions
4. **Table Details**: View detailed information about specific tables
5. **Data Lineage**: Visualize and analyze table relationships and lineage
6. **Lineage Assistant**: Interact with AI-powered lineage analysis
7. **Table Data View**: View actual table data with refresh capabilities

## Raw Playwright Script Analysis

The provided script demonstrates a comprehensive Browse Tables workflow:

```javascript
await page.getByRole('button', { name: '(Tools)ⁿ' }).click();
await page.getByRole('link', { name: 'Code Context' }).click();
await page.getByRole('tab', { name: 'Browse Tables' }).click();
await page.getByText('Explore all database tables,').click();
await page.locator('.p-4.align-middle.\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pr-0.px-4').first().click();
await page.getByRole('button', { name: 'Back to Tables' }).click();
// ... continues with detailed table interactions
```

### Key Interaction Patterns

1. **Navigation Flow**: Tools → Code Context → Browse Tables
2. **Table Actions**: Each table row has three action buttons (View, View Lineage, View Table)
3. **Lineage Visualization**: Comprehensive lineage graph with multiple sections
4. **Error Handling**: Lineage Assistant shows error states
5. **Data Display**: Table headers (Column, Type, Description) with refresh capability

## Manual Test Cases

### CSV Format
The manual test cases are stored in: `CSV/code-context-browse-tables-manual-test-cases.csv`

### Test Coverage Overview

#### Navigation & Setup (TC-CC-BT-001 to TC-CC-BT-007)
- Authentication and basic navigation
- Tools menu interaction
- Browse Tables tab activation
- Basic table exploration

#### Table Details & Actions (TC-CC-BT-008 to TC-CC-BT-012)
- Table detail views
- Action button functionality
- Navigation between views

#### Data Lineage Functionality (TC-CC-BT-013 to TC-CC-BT-025)
- Lineage graph visualization
- Entity relationship analysis
- Raw lineage data interaction
- Lineage Assistant features

#### Table Data View (TC-CC-BT-026 to TC-CC-BT-032)
- Table data display
- Column header interaction
- Refresh functionality

#### Extended Coverage (TC-CC-BT-033 to TC-CC-BT-040)
- Table structure validation
- Action button verification
- Search and sorting capabilities
- Error handling scenarios

### Test Case Structure
Each test case includes:
- **Test Case ID**: Unique identifier following pattern TC-CC-BT-XXX
- **Test Description**: Clear description of the test action
- **Expected Result**: What should happen when the test is executed
- **Actual Result**: Field for recording actual outcomes
- **Status**: Pass/Fail/Not Executed

## Automated Playwright Tests

### Test File Location
`tests/code-context-browse-tables.spec.js`

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
- **Stable Selectors**: Prioritizes `getByRole`, `getByText` over CSS selectors

### Test Categories

#### 1. Navigation Tests
```javascript
test('Navigation - Should navigate to Code Context Browse Tables')
```
- Verifies basic navigation flow
- Confirms tab activation
- Validates Browse Tables accessibility

#### 2. Table Exploration Tests
```javascript
test('Table Exploration - Should interact with database table exploration')
```
- Tests database table exploration
- Validates complex CSS selector interactions
- Confirms navigation back to tables

#### 3. Table Details Tests
```javascript
test('Table Details View - Should display table details correctly')
```
- Validates table details display
- Tests View Lineage functionality
- Confirms navigation patterns

#### 4. Data Lineage Tests
```javascript
test('Data Lineage Flow - Should display and interact with lineage visualization')
```
- Tests lineage graph display
- Validates lineage details sections
- Confirms entity relationship visualization

#### 5. Entity Interaction Tests
```javascript
test('Entity Interaction - Should interact with entity details')
```
- Tests entity-specific interactions
- Validates JSON data accessibility
- Confirms instruction sections

#### 6. Lineage Assistant Tests
```javascript
test('Lineage Assistant - Should interact with lineage assistant functionality')
```
- Tests AI assistant features
- Validates error message display
- Confirms textbox interactions

#### 7. Table Data View Tests
```javascript
test('Table Data View - Should display and interact with table data')
```
- Tests table data display
- Validates refresh functionality
- Confirms column header interactions

#### 8. Complete Workflow Tests
```javascript
test('Complete Flow - Should execute the full Browse Tables workflow')
```
- Executes end-to-end workflow
- Validates all major components
- Confirms complete user journey

#### 9. Edge Cases and Negative Tests
```javascript
test('Negative Test - Should handle table actions gracefully when no data')
test('Edge Case - Should handle lineage errors appropriately')
test('Accessibility - Should maintain proper accessibility standards')
```
- Tests error handling
- Validates edge case scenarios
- Confirms accessibility compliance

### Test Best Practices Applied

#### Locator Strategy
- **Primary**: `getByRole()` for accessibility and stability
- **Secondary**: `getByText()` for content verification
- **Complex CSS**: Used only when necessary (e.g., `.p-4.align-middle.\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pr-0.px-4`)

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
- Visibility and accessibility checks
- State validation (aria-selected, focus states)

## Key Features Tested

### 1. Database Table Management
- **Table Listing**: Browse all available database tables
- **Table Actions**: Three-button action system per table row
- **Table Details**: Comprehensive metadata display

### 2. Data Lineage Visualization
- **Lineage Graph**: Interactive visual representation
- **Entity Relationships**: Central entity and related connections
- **Raw Data Access**: JSON lineage data viewing

### 3. Lineage Assistant
- **AI Integration**: Question-based lineage analysis
- **Error Handling**: Graceful error state management
- **User Guidance**: Example questions and instructions

### 4. Table Data Interaction
- **Data Display**: Column-based table data presentation
- **Refresh Capability**: Real-time data updates
- **Header Interaction**: Sortable column headers

## Configuration and Setup

### Prerequisites
1. Playwright installed and configured
2. Test environment with valid credentials
3. Application accessible at base URL
4. Authentication fixture properly configured
5. Database tables available for testing

### Running Tests

#### Manual Tests
1. Open CSV file: `CSV/code-context-browse-tables-manual-test-cases.csv`
2. Execute each test case step by step
3. Record actual results and status

#### Automated Tests
```bash
# Run all Browse Tables tests
npx playwright test code-context-browse-tables.spec.js

# Run specific test category
npx playwright test code-context-browse-tables.spec.js -g "Navigation"

# Run with debug mode
npx playwright test code-context-browse-tables.spec.js --debug

# Generate report
npx playwright test --reporter=html
```

### Environment Variables
Ensure the following are configured:
- `ENV_FILE`: Points to environment configuration
- Base URL for the application
- Test credentials (if not hardcoded)
- Database connection settings

## Specific UI Elements and Interactions

### Complex Selector Handling
The script includes a complex CSS selector:
```javascript
page.locator('.p-4.align-middle.\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pr-0.px-4')
```
This selector targets specific table row elements with:
- Tailwind CSS padding classes
- Alignment utilities
- Complex CSS-in-JS patterns
- Checkbox role selectors

### Table Row Structure
```
Postgres airflow_db public ab_permission View View Lineage View Table
```
Each table row contains:
- **Database**: Postgres
- **Schema**: airflow_db public
- **Table Name**: ab_permission
- **Actions**: Three buttons (View, View Lineage, View Table)

### Lineage Sections
The lineage view includes multiple organized sections:
1. **Data Lineage**: Main heading and overview
2. **Lineage Graph**: Visual representation
3. **Lineage Details**: Detailed information
4. **Central Entity**: Focus entity information
5. **Instructions**: User guidance
6. **Raw Lineage Data**: JSON data access
7. **Lineage Assistant**: AI-powered analysis

## Coverage Analysis

### Positive Test Coverage
- ✅ Complete navigation workflow
- ✅ Table exploration and selection
- ✅ Table details viewing
- ✅ Lineage visualization
- ✅ Entity interaction
- ✅ Lineage Assistant functionality
- ✅ Table data viewing and refresh

### Negative Test Coverage
- ✅ Empty table state handling
- ✅ Lineage error scenarios
- ✅ Missing data graceful handling
- ⚠️ Network connectivity issues
- ⚠️ Database connection failures

### Edge Case Coverage
- ✅ Complex CSS selector handling
- ✅ Multiple action button interactions
- ✅ Error message display and interaction
- ⚠️ Large dataset handling
- ⚠️ Performance under load

### Accessibility Coverage
- ✅ Role-based element selection
- ✅ Tab navigation functionality
- ✅ Heading hierarchy validation
- ✅ Button accessibility verification
- ⚠️ Screen reader compatibility
- ⚠️ Keyboard-only navigation

## Maintenance Notes

### Future Enhancements
1. **API Testing**: Add tests for backend table metadata APIs
2. **Performance Testing**: Validate load times for large table lists
3. **Visual Testing**: Add screenshot comparison for lineage graphs
4. **Data Validation**: Test actual table data accuracy
5. **Cross-browser Testing**: Ensure compatibility across browsers

### Known Issues and Considerations
1. **Complex CSS Selectors**: The script uses complex Tailwind-based selectors that may be brittle
2. **Error State Testing**: Limited coverage of various error scenarios
3. **Lineage Graph Interaction**: Visual elements may need more specific testing
4. **Performance**: Large datasets may impact test execution time

### Selector Maintenance
- **Monitor CSS Changes**: Complex selectors may break with UI updates
- **Prefer Data Attributes**: Add data-testid attributes for critical elements
- **Regular Review**: Periodic assessment of selector stability

## Troubleshooting

### Common Issues

#### Complex Selector Failures
```javascript
// Problematic selector
page.locator('.p-4.align-middle.\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pr-0.px-4')

// Alternative approach
page.getByRole('row').first()
```

#### Lineage Graph Not Loading
- Check network requests for lineage data
- Verify database connectivity
- Validate permissions for lineage access

#### Table Data Refresh Issues
- Confirm Refresh button functionality
- Check for loading states
- Validate data update indicators

### Debug Commands
```bash
# Run with headed browser for visual debugging
npx playwright test code-context-browse-tables.spec.js --headed

# Generate trace for failed tests
npx playwright test code-context-browse-tables.spec.js --trace on

# Step through test execution
npx playwright test code-context-browse-tables.spec.js --debug
```

## Conclusion

This comprehensive test suite provides thorough coverage of the Code Context Browse Tables functionality, combining both manual verification processes and automated regression testing. The implementation follows Playwright best practices while handling the complexity of modern web applications with intricate CSS selectors and dynamic content.

Key strengths of this test suite:
- **Complete workflow coverage** from navigation to data interaction
- **Robust error handling** for various failure scenarios
- **Accessibility-first approach** using semantic selectors
- **Modular structure** allowing easy maintenance and extension
- **Real-world complexity** handling complex CSS and dynamic content

Regular execution of these tests will help ensure:
- Feature functionality remains intact across releases
- UI changes don't break core workflows
- New features integrate properly with existing functionality
- Performance characteristics remain acceptable
- Accessibility standards are maintained

The combination of manual and automated testing provides comprehensive quality assurance for this critical data exploration feature.