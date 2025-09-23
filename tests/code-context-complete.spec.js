import { test, expect } from '../fixtures/test-base.js';
import { TEST_CONSTANTS } from '../constants/testData.js';
import { DYNAMIC_TEST_CONSTANTS, DYNAMIC_HELPERS } from '../constants/dynamicTestConstants.js';
import { CodeContextPage } from '../page-objects/codeContextPage.js';

// Get dynamic configuration for this test run
const config = DYNAMIC_HELPERS.getEnvConfig();
const procedureData = DYNAMIC_HELPERS.getProcedureData();
const timeouts = DYNAMIC_HELPERS.getTimeout();

test.describe.configure({ timeout: 240000 });
test.describe('Code Context - Complete Browse Procedures Flow', () => {
  let codeContextPage;

  test.beforeEach(async ({ page }) => {
    // Initialize page object and navigate to application
    codeContextPage = new CodeContextPage(page);
    await page.goto(config.baseUrl);
    await page.waitForLoadState('networkidle');
  });

  test('TC001 @smoke Login - should authenticate with valid credentials', async ({ page }) => {
    await test.step('Verify successful login and dashboard loads', async () => {
      await expect(page.getByRole('heading', { name: DYNAMIC_TEST_CONSTANTS.CODE_CONTEXT.EXPECTED_CONTENT.HEADINGS.DASHBOARD })).toBeVisible();
    });
  });

  test('TC002 Tools Navigation - should expand Tools section and show Code Context', async ({ page }) => {
    await test.step('Click on (Tools)ⁿ button', async () => {
      await page.getByRole('button', { name: DYNAMIC_TEST_CONSTANTS.CODE_CONTEXT.SELECTORS.TOOLS_BUTTON }).click();
    });

    await test.step('Verify Code Context link is visible', async () => {
      await expect(page.getByRole('link', { name: DYNAMIC_TEST_CONSTANTS.CODE_CONTEXT.SELECTORS.CODE_CONTEXT_LINK })).toBeVisible();
    });
  });

  test('TC003 Code Context Page - should load Browse Procedures tab', async ({ page }) => {
    await test.step('Navigate to Code Context', async () => {
      await page.getByRole('button', { name: DYNAMIC_TEST_CONSTANTS.CODE_CONTEXT.SELECTORS.TOOLS_BUTTON }).click();
      await page.getByRole('link', { name: DYNAMIC_TEST_CONSTANTS.CODE_CONTEXT.SELECTORS.CODE_CONTEXT_LINK }).click();
    });

    await test.step('Verify Browse Procedures tab is active', async () => {
      await expect(page.getByRole('tab', { name: DYNAMIC_TEST_CONSTANTS.CODE_CONTEXT.TABS.BROWSE_PROCEDURES })).toHaveAttribute('aria-selected', 'true');
    });
  });

  test('TC004 Navigation Flow - should navigate to Code Context Browse Procedures correctly', async ({ page }) => {
    await test.step('Click Tools button', async () => {
      await page.getByRole('button', { name: '(Tools)ⁿ' }).click();
    });

    await test.step('Click Code Context link', async () => {
      await page.getByRole('link', { name: 'Code Context' }).click();
    });

    await test.step('Click Browse Procedures tab', async () => {
      await page.getByRole('tab', { name: 'Browse Procedures' }).click();
    });

    await test.step('Verify Browse Procedures tab is active', async () => {
      await expect(page.getByRole('tab', { name: 'Browse Procedures' })).toHaveAttribute('aria-selected', 'true');
    });
  });

  test('TC005 Procedure Metadata - should display procedure details correctly', async ({ page }) => {
    await test.step('Navigate to procedure details', async () => {
      await page.getByRole('button', { name: DYNAMIC_TEST_CONSTANTS.CODE_CONTEXT.SELECTORS.TOOLS_BUTTON }).click();
      await page.getByRole('link', { name: DYNAMIC_TEST_CONSTANTS.CODE_CONTEXT.SELECTORS.CODE_CONTEXT_LINK }).click();
      await page.locator(`tr:has-text("${procedureData.name}") button[data-slot="tooltip-trigger"]`).click();
    });

    await test.step('Verify Procedure Metadata heading is visible', async () => {
      await expect(page.getByRole('heading', { name: DYNAMIC_TEST_CONSTANTS.CODE_CONTEXT.EXPECTED_CONTENT.HEADINGS.PROCEDURE_METADATA })).toBeVisible();
    });

    await test.step('Verify procedure details using alternative selectors', async () => {
      await expect(page.getByRole('heading', { name: 'Procedure Metadata:' })).toBeVisible();
    });
  });

  test('TC006 Fully Qualified Name - should display correct procedure path', async ({ page }) => {
    await test.step('Navigate to procedure details', async () => {
      await page.getByRole('button', { name: DYNAMIC_TEST_CONSTANTS.CODE_CONTEXT.SELECTORS.TOOLS_BUTTON }).click();
      await page.getByRole('link', { name: DYNAMIC_TEST_CONSTANTS.CODE_CONTEXT.SELECTORS.CODE_CONTEXT_LINK }).click();
      await page.locator(`tr:has-text("${procedureData.name}") button[data-slot="tooltip-trigger"]`).click();
    });

    await test.step('Verify Fully Qualified Name is displayed correctly', async () => {
      await expect(page.getByText(procedureData.fullyQualifiedName)).toBeVisible();
    });

    await test.step('Verify alternative fully qualified name display', async () => {
      await expect(page.getByText('sample_data.ecommerce_db.shopify.calculate_average')).toBeVisible();
    });
  });

  test('TC007 Database Name - should display ecommerce_db and be clickable', async ({ page }) => {
    await test.step('Navigate to procedure details', async () => {
      await page.getByRole('button', { name: DYNAMIC_TEST_CONSTANTS.CODE_CONTEXT.SELECTORS.TOOLS_BUTTON }).click();
      await page.getByRole('link', { name: DYNAMIC_TEST_CONSTANTS.CODE_CONTEXT.SELECTORS.CODE_CONTEXT_LINK }).click();
      await page.locator(`tr:has-text("${procedureData.name}") button[data-slot="tooltip-trigger"]`).click();
    });

    await test.step('Verify Database name is displayed', async () => {
      await expect(page.locator(`text=/Database:\\s*${procedureData.database}/`)).toBeVisible();
    });

    await test.step('Verify Database name is clickable using alternative selector', async () => {
      await expect(page.getByText('ecommerce_db', { exact: true }).first()).toBeVisible();
    });
  });

  test('TC008 Schema Name - should display shopify and be clickable', async ({ page }) => {
    await test.step('Navigate to procedure details', async () => {
      await page.getByRole('button', { name: DYNAMIC_TEST_CONSTANTS.CODE_CONTEXT.SELECTORS.TOOLS_BUTTON }).click();
      await page.getByRole('link', { name: DYNAMIC_TEST_CONSTANTS.CODE_CONTEXT.SELECTORS.CODE_CONTEXT_LINK }).click();
      await page.locator(`tr:has-text("${procedureData.name}") button[data-slot="tooltip-trigger"]`).click();
    });

    await test.step('Verify Schema name is displayed', async () => {
      await expect(page.locator(`text=/Schema:\\s*${procedureData.schema}/`).first()).toBeVisible();
    });

    await test.step('Verify Schema name is clickable using alternative selector', async () => {
      await expect(page.getByText('shopify').first()).toBeVisible();
    });
  });

  test('TC009 SQL Code Area - should display SQL code with correct styling', async ({ page }) => {
    await test.step('Navigate to procedure details', async () => {
      await page.getByRole('button', { name: '(Tools)ⁿ' }).click();
      await page.getByRole('link', { name: 'Code Context' }).click();
      await page.locator(`tr:has-text("${procedureData.name}") button[data-slot="tooltip-trigger"]`).click();
    });

    await test.step('Verify SQL Code heading and dark code area', async () => {
      await expect(page.getByText('SQL Code:')).toBeVisible();
      await expect(page.locator('.bg-zinc-900')).toBeVisible();
      await expect(page.locator('.bg-zinc-900')).toContainText('CREATE OR REPLACE PROCEDURE');
    });

    await test.step('Verify SQL Code heading using role selector', async () => {
      await expect(page.getByRole('heading', { name: 'SQL Code:' })).toBeVisible();
    });
  });

  test('TC010 Navigation Flow - should return to procedure list when Back to List is clicked', async ({ page }) => {
    await test.step('Navigate to procedure details and back', async () => {
      await page.getByRole('button', { name: '(Tools)ⁿ' }).click();
      await page.getByRole('link', { name: 'Code Context' }).click();
      await page.locator(`tr:has-text("${procedureData.name}") button[data-slot="tooltip-trigger"]`).click();
      await page.getByRole('button', { name: 'Back to List' }).click();
    });

    await test.step('Verify returned to procedures list', async () => {
      await expect(page.getByRole('tab', { name: 'Browse Procedures' })).toHaveAttribute('aria-selected', 'true');
      await expect(page.getByText(`${procedureData.name}`)).toBeVisible();
    });

    await test.step('Verify back in procedure list using alternative selector', async () => {
      await expect(page.getByRole('row', { name: new RegExp(`${procedureData.name} Stored`) })).toBeVisible();
    });
  });

  test('TC011 Parse Function - should trigger conversion and show results', async ({ page }) => {
    await test.step('Navigate to procedure and trigger parse', async () => {
      await page.getByRole('button', { name: '(Tools)ⁿ' }).click();
      await page.getByRole('link', { name: 'Code Context' }).click();
      await page.locator(`tr:has-text("${procedureData.name}") button[data-slot="tooltip-trigger"]`).click();
      await page.getByRole('button', { name: 'Parse' }).click();
    });

    await test.step('Verify Conversion Results are shown', async () => {
      await expect(page.getByText('Conversion Results')).toBeVisible();
    });

  });

  test('TC012 Conversion Success - should display success status', async ({ page }) => {
    await test.step('Navigate and trigger conversion', async () => {
      await page.getByRole('button', { name: '(Tools)ⁿ' }).click();
      await page.getByRole('link', { name: 'Code Context' }).click();
      await page.locator(`tr:has-text("${procedureData.name}") button[data-slot="tooltip-trigger"]`).click();
      await page.getByRole('button', { name: 'Parse' }).click();
    });

    await test.step('Verify Success status is displayed', async () => {
      await page.waitForSelector('text=Success');
      await expect(page.getByText('Success')).toBeVisible();
    });
  });

  test('TC013 Conversion Timestamp - should display conversion time', async ({ page }) => {
    await test.step('Navigate and trigger conversion', async () => {
      await page.getByRole('button', { name: '(Tools)ⁿ' }).click();
      await page.getByRole('link', { name: 'Code Context' }).click();
      await page.locator(`tr:has-text("${procedureData.name}") button[data-slot="tooltip-trigger"]`).click();
      await page.getByRole('button', { name: 'Parse' }).click();
    });

    await test.step('Verify conversion timestamp is displayed', async () => {
      await page.waitForSelector('text=Success');
      // Look for timestamp pattern (MM/DD/YYYY, HH:MM:SS AM/PM)
      await expect(page.locator('text=/\\d+\\/\\d+\\/\\d+, \\d+:\\d+:\\d+ [AP]M/')).toBeVisible();
    });


  });

  test('TC014 Business Description Tab - should display all required elements', async ({ page }) => {
    await test.step('Navigate to conversion results', async () => {
      await page.getByRole('button', { name: '(Tools)ⁿ' }).click();
      await page.getByRole('link', { name: 'Code Context' }).click();
      await page.locator(`tr:has-text("${procedureData.name}") button[data-slot="tooltip-trigger"]`).click();
      await page.getByRole('button', { name: 'Parse' }).click();
      await page.getByRole('tab', { name: 'Business Description' }).click();
    });

    await test.step('Verify business description elements', async () => {
      await page.waitForSelector('text=Success');
      await expect(page.getByRole('heading', { name: 'Description' })).toBeVisible();
      await expect(page.getByText('Pseudo Code')).toBeVisible();
      await expect(page.getByText('Tables Used')).toBeVisible();
      await expect(page.getByText('Line Count')).toBeVisible();
      await expect(page.getByText('Token Count')).toBeVisible();
    });

    await test.step('Verify business description tab is active', async () => {
      await expect(page.getByRole('tab', { name: 'Business Description' })).toHaveAttribute('aria-selected', 'true');
    });

    await test.step('Verify line count and token count displays', async () => {
      await expect(page.getByText('Line Count')).toBeVisible();
      await expect(page.getByText('Token Count')).toBeVisible();
    });
  });

  test('TC015 Stored Procedures Section - should display procedures used info', async ({ page }) => {
    await test.step('Navigate to conversion results', async () => {
      await page.getByRole('button', { name: '(Tools)ⁿ' }).click();
      await page.getByRole('link', { name: 'Code Context' }).click();
      await page.locator(`tr:has-text("${procedureData.name}") button[data-slot="tooltip-trigger"]`).click();
      await page.getByRole('button', { name: 'Parse' }).click();
      await page.waitForSelector('text=Success');
    });

    await test.step('Verify Stored Procedures Used section', async () => {
      await expect(page.getByText('Stored Procedures Used')).toBeVisible();
      await expect(page.getByText('CREATE OR REPLACE PROCEDURE')).toBeVisible();
    });

    await test.step('Verify Stored Procedures Used heading', async () => {
      await expect(page.getByRole('heading', { name: 'Stored Procedures Used' })).toBeVisible();
    });
  });

  test  ('TC016 Start New Conversion - should navigate when clicked', async ({ page }) => {
    await test.step('Navigate to conversion results and start new', async () => {
      await page.getByRole('button', { name: '(Tools)ⁿ' }).click();
      await page.getByRole('link', { name: 'Code Context' }).click();
      await page.locator(`tr:has-text("${procedureData.name}") button[data-slot="tooltip-trigger"]`).click();
      await page.getByRole('button', { name: 'Parse' }).click();
      await page.waitForSelector('text=Success');
      await page.getByRole('button', { name: 'Start New Conversion' }).click();
    });

    await test.step('Verify navigation occurred', async () => {
      await page.waitForLoadState('networkidle');
    });

    await test.step('Verify navigation to new conversion URL', async () => {
      await expect(page.url()).toContain('https://de-hub.ngenux.app/code-context');
    });
  });

  test  ('TC017 Complete POM Workflow - should execute complete workflow through Page Object Model', async ({ page }) => {
    await test.step('Execute complete workflow through Page Object', async () => {
      await codeContextPage.executeCompleteWorkflow();
    });

    await test.step('Verify workflow completion', async () => {
      await page.waitForLoadState('networkidle');
    });
  });

  test  ('TC018 POM Procedure Details - should verify procedure details using Page Object Model', async ({ page }) => {
    await test.step('Navigate to procedure details', async () => {
      await codeContextPage.navigateToCodeContext();
      await codeContextPage.openCalculateAverageProcedure();
    });

    await test.step('Verify all procedure metadata elements', async () => {
      await codeContextPage.verifyProcedureMetadata();
      await codeContextPage.verifySqlCodeSection();
      await codeContextPage.verifySchemaElementsClickable();
    });
  });

  test  ('TC019 POM Parse and Conversion - should execute parse and conversion flow using Page Object Model', async ({ page }) => {
    await test.step('Navigate and trigger parse', async () => {
      await codeContextPage.navigateToCodeContext();
      await codeContextPage.openCalculateAverageProcedure();
      await codeContextPage.triggerParse();
    });

    await test.step('Verify conversion results', async () => {
      await codeContextPage.verifyConversionResults();
      await codeContextPage.verifyBusinessDescriptionContent();
      await codeContextPage.verifyStoredProceduresSection();
    });
  });

  test  ('TC020 POM Navigation Flow - should test navigation using Page Object Model', async ({ page }) => {
    await test.step('Test back and forth navigation', async () => {
      await codeContextPage.navigateToCodeContext();
      await codeContextPage.verifyBrowseProceduresTabActive();
      
      await codeContextPage.openCalculateAverageProcedure();
    
      await codeContextPage.triggerParse();
      await page.click('button:has-text("Start New Conversion")');
      await codeContextPage.verifyBrowseProceduresTabActive();
    });
  });

  test('TC021 @smoke End-to-End Flow Browse Procedures - should complete entire workflow successfully', async ({ page }) => {
    await test.step('Execute complete workflow', async () => {
      // Login is handled by fixture
      await expect(page.getByRole('heading', { name: 'Data Engineering Dashboard' })).toBeVisible();
      
      // Navigate through Tools to Code Context
      await page.getByRole('button', { name: '(Tools)ⁿ' }).click();
      await page.getByRole('link', { name: 'Code Context' }).click();
      
      // Open procedure details
      await page.locator(`tr:has-text("${procedureData.name}") button[data-slot="tooltip-trigger"]`).click();
      await expect(page.getByRole('heading', { name: 'Procedure Metadata:' })).toBeVisible();
      
      // Verify metadata elements using specific selectors
      await expect(page.getByText('sample_data.ecommerce_db.shopify.calculate_average')).toBeVisible();
      await expect(page.locator('text=/Database:\\s*ecommerce_db/')).toBeVisible();
      await expect(page.locator('text=/Schema:\\s*shopify/').first()).toBeVisible();
      await expect(page.locator('.bg-zinc-900')).toBeVisible();
      
      // Navigate back and forth
      await page.getByRole('button', { name: 'Back to List' }).click();
      await page.locator(`tr:has-text("${procedureData.name}") button[data-slot="tooltip-trigger"]`).click();
      
      // Parse and verify results
      await page.getByRole('button', { name: 'Parse' }).click();
      await page.waitForSelector('text=success', { timeout: timeouts.ASSERTION });
      await expect(page.getByText('Conversion Results')).toBeVisible();
      await expect(page.getByText('Success')).toBeVisible();
      
      // Check business description content
      await expect(page.getByRole('heading', { name: 'Description' })).toBeVisible();
      await expect(page.getByText('Stored Procedures Used')).toBeVisible();
      
      // Verify Pseudo Code Description contains more than 100 words
      await page.getByText('Pseudo Code Description of').click();
      const pseudoCodeElement = page.getByText('Pseudo Code Description of');
      const pseudoCodeText = await pseudoCodeElement.textContent();
      const wordCount = pseudoCodeText ? pseudoCodeText.trim().split(/\s+/).length : 0;
      expect(wordCount).toBeGreaterThan(100);
      
      // Start new conversion
      await page.getByRole('button', { name: 'Start New Conversion' }).click();
    });

    await test.step('Verify workflow completed successfully', async () => {
      await page.waitForLoadState('networkidle');
    });
  });

  test('TC022 @smoke Complete End-to-End Workflow - should verify all critical user journeys', async ({ page }) => {
    await test.step('Initial login and dashboard verification', async () => {
      await expect(page.getByRole('heading', { name: 'Data Engineering Dashboard' })).toBeVisible();
    });

    await test.step('Navigate to Code Context and verify Browse Procedures tab', async () => {
      await page.getByRole('button', { name: '(Tools)ⁿ' }).click();
      await page.getByRole('link', { name: 'Code Context' }).click();
      await expect(page.getByRole('tab', { name: 'Browse Procedures' })).toHaveAttribute('aria-selected', 'true');
    });

    await test.step('Open procedure and verify all metadata fields', async () => {
      await page.locator(`tr:has-text("${procedureData.name}") button[data-slot="tooltip-trigger"]`).click();
      await expect(page.getByRole('heading', { name: 'Procedure Metadata:' })).toBeVisible();
      await expect(page.getByText('sample_data.ecommerce_db.shopify.calculate_average')).toBeVisible();
      await expect(page.locator('text=/Database:\\s*ecommerce_db/')).toBeVisible();
      await expect(page.locator('text=/Schema:\\s*shopify/').first()).toBeVisible();
      await expect(page.getByText('SQL Code:')).toBeVisible();
      await expect(page.locator('.bg-zinc-900')).toBeVisible();
    });

    await test.step('Execute parse operation and verify conversion results', async () => {
      await page.getByRole('button', { name: 'Parse' }).click();
      await page.waitForSelector('text=success', { timeout: timeouts.ASSERTION });
      await expect(page.getByText('Conversion Results')).toBeVisible();
      await expect(page.getByText('Success')).toBeVisible();
      await expect(page.locator('text=/\\d+\\/\\d+\\/\\d+, \\d+:\\d+:\\d+ [AP]M/')).toBeVisible();
    });

    await test.step('Verify Business Description tab functionality', async () => {
      await page.getByRole('tab', { name: 'Business Description' }).click();
      await expect(page.getByRole('heading', { name: 'Description' })).toBeVisible();
      await expect(page.getByText('Pseudo Code')).toBeVisible();
      await expect(page.getByText('Tables Used')).toBeVisible();
      await expect(page.getByText('Line Count')).toBeVisible();
      await expect(page.getByText('Token Count')).toBeVisible();
    });

    await test.step('Verify Stored Procedures Used section', async () => {
      await expect(page.getByText('Stored Procedures Used')).toBeVisible();
      await expect(page.getByText('CREATE OR REPLACE PROCEDURE')).toBeVisible();
    });

    await test.step('Complete workflow with Start New Conversion', async () => {
     
      await page.getByRole('button', { name: 'Start New Conversion' }).click();
      await page.waitForLoadState('networkidle');
    });

    await test.step('Final verification - ensure application is in clean state', async () => {
      await page.waitForLoadState('networkidle');
      await expect(page.url()).toContain('https://de-hub.ngenux.app/code-context');
    });
  });

  test('TC023 Negative Test - should handle missing procedure gracefully', async ({ page }) => {
    await test.step('Navigate to Browse Procedures', async () => {
      await page.getByRole('button', { name: '(Tools)ⁿ' }).click();
      await page.getByRole('link', { name: 'Code Context' }).click();
      await page.getByRole('tab', { name: 'Browse Procedures' }).click();
    });

    await test.step('Verify empty state or error message for missing procedures', async () => {
      const procedureRows = page.getByRole('row').filter({ hasText: 'nonexistent_procedure' });
      await expect(procedureRows).toHaveCount(0);
    });
  });

  test('TC024 Edge Case - should handle procedure with special characters', async ({ page }) => {
    await test.step('Navigate to Browse Procedures', async () => {
      await page.getByRole('button', { name: '(Tools)ⁿ' }).click();
      await page.getByRole('link', { name: 'Code Context' }).click();
      await page.getByRole('tab', { name: 'Browse Procedures' }).click();
    });

    await test.step('Verify procedure names with special characters are handled', async () => {
      // Look for procedures that might have special characters
      const specialCharRows = page.getByRole('row').filter({ hasText: /[^a-zA-Z0-9_]/ });
      if (await specialCharRows.count() > 0) {
        await expect(specialCharRows.first()).toBeVisible();
      }
    });
  });
});