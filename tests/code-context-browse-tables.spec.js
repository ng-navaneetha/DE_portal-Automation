// import { test, expect } from '../fixtures/test-base.js';
// import { CodeContextPage } from '../page-objects/codeContextPage.js';
// import { TEST_CONSTANTS } from '../constants/testData.js';
// import { DYNAMIC_HELPERS } from '../constants/dynamicTestConstants.js';


// // Get dynamic configuration for this test run
// const config = DYNAMIC_HELPERS.getEnvConfig();
// const procedureData = DYNAMIC_HELPERS.getProcedureData();
// const timeouts = DYNAMIC_HELPERS.getTimeout();


// test.describe.configure({timeout: 120000});
// test.describe('Code Context - Browse Tables Complete Flow',  () => {
//   let codeContextPage;


//   test.beforeEach(async ({ page }) => {
//     // Initialize page object and navigate to application
//     codeContextPage = new CodeContextPage(page);
//     await page.goto(config.baseUrl);
//     await page.waitForLoadState('networkidle');
//   });
//   test('Navigation - Should navigate to Code Context Browse Tables', async ({ page }) => {
//     await test.step('Click Tools button', async () => {
//       await page.getByRole('button', { name: '(Tools)ⁿ' }).click();
//     });

//     await test.step('Click Code Context link', async () => {
//       await page.getByRole('link', { name: 'Code Context' }).click();
//     });

//     await test.step('Click Browse Tables tab', async () => {
//       await page.getByRole('tab', { name: 'Browse Tables' }).click();
//     });

//     await test.step('Verify Browse Tables tab is active', async () => {
//       await expect(page.getByRole('tab', { name: 'Browse Tables' })).toHaveAttribute('aria-selected', 'true');
//     });
//   });

//   test('Table Exploration - Should interact with database table exploration', async ({ page }) => {
//     await test.step('Navigate to Browse Tables', async () => {
//       await page.getByRole('button', { name: '(Tools)ⁿ' }).click();
//       await page.getByRole('link', { name: 'Code Context' }).click();
//       await page.getByRole('tab', { name: 'Browse Tables' }).click();
//     });

//     await test.step('Click on Explore all database tables text', async () => {
//       await page.getByText('Explore all database tables,').click();
//     });

//     await test.step('Click on first table row', async () => {
//       await page.locator('.p-4.align-middle.\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pr-0.px-4').first().click();
//     });

//     await test.step('Navigate back to tables', async () => {
//       await page.getByRole('button', { name: 'Back to Tables' }).click();
//     });

//     await test.step('Verify back in tables list', async () => {
//       await expect(page.getByRole('tab', { name: 'Browse Tables' })).toHaveAttribute('aria-selected', 'true');
//     });
//   });

//   test('Table Details View - Should display table details correctly', async ({ page }) => {
//     await test.step('Navigate to Browse Tables', async () => {
//       await page.getByRole('button', { name: '(Tools)ⁿ' }).click();
//       await page.getByRole('link', { name: 'Code Context' }).click();
//       await page.getByRole('tab', { name: 'Browse Tables' }).click();
//     });

//     await test.step('Click first action button for ab_permission table', async () => {
//       await page.getByRole('row', { name: 'Postgres airflow_db public ab_permission View View Lineage View Table' })
//         .getByRole('button').first().click();
//     });

//     await test.step('Click Table Details text', async () => {
//       await page.getByText('Table Details', { exact: true }).click();
//     });

//     await test.step('Verify Table Details is accessible', async () => {
//       await expect(page.getByText('Table Details', { exact: true })).toBeVisible();
//     });

//     await test.step('Click View Lineage button', async () => {
//       await page.getByRole('button', { name: 'View Lineage' }).click();
//     });

//     await test.step('Navigate back to tables from details', async () => {
//       await page.getByRole('button', { name: 'Back to Tables' }).click();
//     });
//   });

//   test('Data Lineage Flow - Should display and interact with lineage visualization', async ({ page }) => {
//     await test.step('Navigate to Browse Tables and open lineage', async () => {
//       await page.getByRole('button', { name: '(Tools)ⁿ' }).click();
//       await page.getByRole('link', { name: 'Code Context' }).click();
//       await page.getByRole('tab', { name: 'Browse Tables' }).click();
//       await page.getByRole('row', { name: 'Postgres airflow_db public ab_permission View View Lineage View Table' })
//         .getByRole('button').nth(1).click();
//     });

//     await test.step('Verify Data Lineage heading', async () => {
//       await page.getByRole('heading', { name: 'Data Lineage' }).click();
//       await expect(page.getByRole('heading', { name: 'Data Lineage' })).toBeVisible();
//     });

//     await test.step('Interact with Lineage Graph', async () => {
//       await page.locator('div').filter({ hasText: /^Lineage Graph$/ }).first().click();
//       await expect(page.locator('div').filter({ hasText: /^Lineage Graph$/ })).toBeVisible();
//     });

//     await test.step('Verify Lineage Details section', async () => {
//       await page.getByRole('heading', { name: 'Lineage Details' }).click();
//       await expect(page.getByRole('heading', { name: 'Lineage Details' })).toBeVisible();
//     });

//     await test.step('Verify Central Entity section', async () => {
//       await page.getByRole('heading', { name: 'Central Entity' }).click();
//       await expect(page.getByRole('heading', { name: 'Central Entity' })).toBeVisible();
//     });
//   });

//   test('Entity Interaction - Should interact with entity details', async ({ page }) => {
//     await test.step('Navigate to lineage view', async () => {
//       await page.getByRole('button', { name: '(Tools)ⁿ' }).click();
//       await page.getByRole('link', { name: 'Code Context' }).click();
//       await page.getByRole('tab', { name: 'Browse Tables' }).click();
//       await page.getByRole('row', { name: 'Postgres airflow_db public ab_permission View View Lineage View Table' })
//         .getByRole('button').nth(1).click();
//     });

//     await test.step('Click on ab_permission entity', async () => {
//       await page.getByRole('paragraph').filter({ hasText: /^ab_permission$/ }).click();
//       await expect(page.getByRole('paragraph').filter({ hasText: /^ab_permission$/ })).toBeVisible();
//     });

//     await test.step('Verify Instructions section', async () => {
//       await page.getByRole('heading', { name: 'Instructions' }).click();
//       await expect(page.getByRole('heading', { name: 'Instructions' })).toBeVisible();
//     });

//     await test.step('Verify Raw Lineage Data section', async () => {
//       await page.getByRole('heading', { name: 'Raw Lineage Data' }).click();
//       await expect(page.getByRole('heading', { name: 'Raw Lineage Data' })).toBeVisible();
//     });

//     await test.step('Click on lineage JSON data', async () => {
//       await page.getByText('{ "entity": { "id": "6d416195').click();
//       await expect(page.getByText('{ "entity": { "id": "6d416195')).toBeVisible();
//     });
//   });

//   test('Lineage Assistant - Should interact with lineage assistant functionality', async ({ page }) => {
//     await test.step('Navigate to lineage view', async () => {
//       await page.getByRole('button', { name: '(Tools)ⁿ' }).click();
//       await page.getByRole('link', { name: 'Code Context' }).click();
//       await page.getByRole('tab', { name: 'Browse Tables' }).click();
//       await page.getByRole('row', { name: 'Postgres airflow_db public ab_permission View View Lineage View Table' })
//         .getByRole('button').nth(1).click();
//     });

//     await test.step('Verify Lineage Assistant heading', async () => {
//       await page.getByRole('heading', { name: 'Lineage Assistant' }).click();
//       await expect(page.getByRole('heading', { name: 'Lineage Assistant' })).toBeVisible();
//     });

//     await test.step('Verify error message display', async () => {
//       await page.locator('div').filter({ hasText: /^Error uploading lineage data\. Please try again\.$/ }).first().click();
//       await expect(page.locator('div').filter({ hasText: /^Error uploading lineage data\. Please try again\.$/ })).toBeVisible();
//     });

//     await test.step('Interact with Lineage Assistant textbox', async () => {
//       await page.getByRole('textbox', { name: 'Ask a question about your' }).click();
//       await expect(page.getByRole('textbox', { name: 'Ask a question about your' })).toBeFocused();
//     });

//     await test.step('Verify example questions text', async () => {
//       await page.getByText('Try these example questions:').click();
//       await expect(page.getByText('Try these example questions:')).toBeVisible();
//     });
//   });

//   test('Table Data View - Should display and interact with table data', async ({ page }) => {
//     await test.step('Navigate to Browse Tables', async () => {
//       await page.getByRole('button', { name: '(Tools)ⁿ' }).click();
//       await page.getByRole('link', { name: 'Code Context' }).click();
//       await page.getByRole('tab', { name: 'Browse Tables' }).click();
//     });

//     await test.step('Navigate back from lineage assistant', async () => {
//       // First open lineage, then navigate back to ensure we're in the right state
//       await page.getByRole('row', { name: 'Postgres airflow_db public ab_permission View View Lineage View Table' })
//         .getByRole('button').nth(1).click();
//       await page.getByRole('button', { name: 'Back to Tables' }).click();
//     });

//     await test.step('Click Browse Tables tab', async () => {
//       await page.getByRole('tab', { name: 'Browse Tables' }).click();
//     });

//     await test.step('Click third action button for table data view', async () => {
//       await page.getByRole('row', { name: 'Postgres airflow_db public ab_permission View View Lineage View Table' })
//         .getByRole('button').nth(2).click();
//     });

//     await test.step('Click Refresh button', async () => {
//       await page.getByRole('button', { name: 'Refresh' }).click();
//     });

//     await test.step('Verify table headers are accessible', async () => {
//       await page.getByRole('cell', { name: 'Column' }).click();
//       await expect(page.getByRole('cell', { name: 'Column' })).toBeVisible();

//       await page.getByRole('cell', { name: 'Type' }).click();
//       await expect(page.getByRole('cell', { name: 'Type' })).toBeVisible();

//       await page.getByRole('cell', { name: 'Description' }).click();
//       await expect(page.getByRole('cell', { name: 'Description' })).toBeVisible();
//     });
//   });

//   test('Complete Flow - Should execute the full Browse Tables workflow', async ({ page }) => {
//     await test.step('Complete navigation flow', async () => {
//       await page.getByRole('button', { name: '(Tools)ⁿ' }).click();
//       await page.getByRole('link', { name: 'Code Context' }).click();
//       await page.getByRole('tab', { name: 'Browse Tables' }).click();
//     });

//     await test.step('Execute table exploration', async () => {
//       await page.getByText('Explore all database tables,').click();
//       await page.locator('.p-4.align-middle.\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pr-0.px-4').first().click();
//       await page.getByRole('button', { name: 'Back to Tables' }).click();
//     });

//     await test.step('Execute table details flow', async () => {
//       await page.getByRole('row', { name: 'Postgres airflow_db public ab_permission View View Lineage View Table' })
//         .getByRole('button').first().click();
//       await page.getByText('Table Details', { exact: true }).click();
//       await page.getByRole('button', { name: 'View Lineage' }).click();
//       await page.getByRole('button', { name: 'Back to Tables' }).click();
//     });

//     await test.step('Execute lineage flow', async () => {
//       await page.getByRole('tab', { name: 'Browse Tables' }).click();
//       await page.getByRole('row', { name: 'Postgres airflow_db public ab_permission View View Lineage View Table' })
//         .getByRole('button').nth(1).click();
      
//       // Verify all lineage sections
//       await expect(page.getByRole('heading', { name: 'Data Lineage' })).toBeVisible();
//       await expect(page.getByRole('heading', { name: 'Lineage Details' })).toBeVisible();
//       await expect(page.getByRole('heading', { name: 'Central Entity' })).toBeVisible();
//       await expect(page.getByRole('heading', { name: 'Instructions' })).toBeVisible();
//       await expect(page.getByRole('heading', { name: 'Raw Lineage Data' })).toBeVisible();
//       await expect(page.getByRole('heading', { name: 'Lineage Assistant' })).toBeVisible();
//     });

//     await test.step('Execute table data view flow', async () => {
//       await page.getByRole('button', { name: 'Back to Tables' }).click();
//       await page.getByRole('tab', { name: 'Browse Tables' }).click();
//       await page.getByRole('row', { name: 'Postgres airflow_db public ab_permission View View Lineage View Table' })
//         .getByRole('button').nth(2).click();
      
//       // Verify table data view
//       await page.getByRole('button', { name: 'Refresh' }).click();
//       await expect(page.getByRole('cell', { name: 'Column' })).toBeVisible();
//       await expect(page.getByRole('cell', { name: 'Type' })).toBeVisible();
//       await expect(page.getByRole('cell', { name: 'Description' })).toBeVisible();
//     });
//   });

//   test('Negative Test - Should handle table actions gracefully when no data', async ({ page }) => {
//     await test.step('Navigate to Browse Tables', async () => {
//       await page.getByRole('button', { name: '(Tools)ⁿ' }).click();
//       await page.getByRole('link', { name: 'Code Context' }).click();
//       await page.getByRole('tab', { name: 'Browse Tables' }).click();
//     });

//     await test.step('Verify empty state handling', async () => {
//       // Check if there are any tables, if not verify empty state
//       const tableRows = page.getByRole('row').filter({ hasText: /View View Lineage View Table/ });
//       const rowCount = await tableRows.count();
      
//       if (rowCount === 0) {
//         // Verify empty state message or placeholder
//         await expect(page.getByText(/No tables found/i)).toBeVisible();
//       } else {
//         // If tables exist, verify they have proper structure
//         await expect(tableRows.first()).toBeVisible();
//       }
//     });
//   });

//   test('Edge Case - Should handle lineage errors appropriately', async ({ page }) => {
//     await test.step('Navigate to lineage view', async () => {
//       await page.getByRole('button', { name: '(Tools)ⁿ' }).click();
//       await page.getByRole('link', { name: 'Code Context' }).click();
//       await page.getByRole('tab', { name: 'Browse Tables' }).click();
//       await page.getByRole('row', { name: 'Postgres airflow_db public ab_permission View View Lineage View Table' })
//         .getByRole('button').nth(1).click();
//     });

//     await test.step('Verify error handling in Lineage Assistant', async () => {
//       const errorMessage = page.locator('div').filter({ hasText: /^Error uploading lineage data\. Please try again\.$/ });
//       await expect(errorMessage).toBeVisible();
//     });

//     await test.step('Verify error message is properly styled and actionable', async () => {
//       const errorDiv = page.locator('div').filter({ hasText: /^Error uploading lineage data\. Please try again\.$/ }).first();
//       await errorDiv.click();
//       await expect(errorDiv).toBeVisible();
//     });
//   });

//   test('Accessibility - Should maintain proper accessibility standards', async ({ page }) => {
//     await test.step('Navigate to Browse Tables', async () => {
//       await page.getByRole('button', { name: '(Tools)ⁿ' }).click();
//       await page.getByRole('link', { name: 'Code Context' }).click();
//       await page.getByRole('tab', { name: 'Browse Tables' }).click();
//     });

//     await test.step('Verify tab navigation works correctly', async () => {
//       await expect(page.getByRole('tab', { name: 'Browse Tables' })).toHaveAttribute('aria-selected', 'true');
//     });

//     await test.step('Verify button roles and accessibility', async () => {
//       const actionButtons = page.getByRole('row', { name: 'Postgres airflow_db public ab_permission View View Lineage View Table' })
//         .getByRole('button');
      
//       await expect(actionButtons.first()).toBeVisible();
//       await expect(actionButtons.nth(1)).toBeVisible();
//       await expect(actionButtons.nth(2)).toBeVisible();
//     });

//     await test.step('Verify heading hierarchy in lineage view', async () => {
//       await page.getByRole('row', { name: 'Postgres airflow_db public ab_permission View View Lineage View Table' })
//         .getByRole('button').nth(1).click();
      
//       await expect(page.getByRole('heading', { name: 'Data Lineage' })).toBeVisible();
//       await expect(page.getByRole('heading', { name: 'Lineage Details' })).toBeVisible();
//       await expect(page.getByRole('heading', { name: 'Central Entity' })).toBeVisible();
//     });
//   });
// });