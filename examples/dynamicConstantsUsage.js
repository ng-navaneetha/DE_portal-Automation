/**
 * Example Usage of Dynamic Test Constants
 * This file demonstrates how to use the dynamic constants in your tests
 */

import { test, expect } from '@playwright/test';
import { TestConfigManager, SMOKE_CONFIG, DEBUG_CONFIG } from '../constants/testConfigManager.js';
import { DYNAMIC_TEST_CONSTANTS, DYNAMIC_HELPERS } from '../constants/dynamicTestConstants.js';

// Example 1: Basic usage with default configuration
test.describe('Example: Basic Dynamic Constants Usage', () => {
  const config = new TestConfigManager('default');
  
  test.beforeEach(async ({ page }) => {
    // Use dynamic base URL
    await page.goto(config.getConfig().baseUrl);
    await page.waitForLoadState('networkidle');
  });

  test('Navigate using dynamic selectors', async ({ page }) => {
    const selectors = config.getSelectors();
    const expectedContent = config.getExpectedContent();
    const procedureData = config.getProcedureData();
    
    // Use dynamic selectors
    await page.getByRole('button', { name: selectors.TOOLS_BUTTON }).click();
    await page.getByRole('link', { name: selectors.CODE_CONTEXT_LINK }).click();
    
    // Use dynamic procedure data
    await page.locator(`tr:has-text("${procedureData.name}") button[data-slot="tooltip-trigger"]`).click();
    
    // Use dynamic expected content
    await expect(page.getByRole('heading', { name: expectedContent.HEADINGS.PROCEDURE_METADATA })).toBeVisible();
  });
});

// Example 2: Smoke test configuration
test.describe('Example: Smoke Test Configuration', () => {
  const config = SMOKE_CONFIG;
  
  test('Smoke test with optimized timeouts', async ({ page }) => {
    await page.goto(config.getConfig().baseUrl);
    
    // Use smoke test specific timeout
    await expect(page.getByRole('heading', { name: 'Data Engineering Dashboard' }))
      .toBeVisible({ timeout: config.getTimeout('ASSERTION') });
  });
});

// Example 3: Multi-procedure testing
test.describe('Example: Multi-Procedure Testing', () => {
  const config = new TestConfigManager('multiProcedure');
  
  test('Test multiple procedures', async ({ page }) => {
    await page.goto(config.getConfig().baseUrl);
    const procedures = config.getAllProcedures();
    
    for (const procedure of procedures) {
      test.step(`Testing procedure: ${procedure.name}`, async () => {
        // Navigate to Code Context
        await page.getByRole('button', { name: config.getSelectors().TOOLS_BUTTON }).click();
        await page.getByRole('link', { name: config.getSelectors().CODE_CONTEXT_LINK }).click();
        
        // Test each procedure
        await page.locator(`tr:has-text("${procedure.name}") button[data-slot="tooltip-trigger"]`).click();
        await expect(page.getByText(procedure.fullyQualifiedName)).toBeVisible();
        
        // Go back for next procedure
        await page.getByRole('button', { name: config.getSelectors().BACK_TO_LIST_BUTTON }).click();
      });
    }
  });
});

// Example 4: Environment-specific configuration
test.describe('Example: Environment-specific Tests', () => {
  test('Adapt behavior based on environment', async ({ page }) => {
    const envConfig = DYNAMIC_HELPERS.getEnvConfig();
    
    if (envConfig.isCI) {
      // CI-specific behavior
      test.setTimeout(60000);
    }
    
    if (envConfig.debugMode) {
      // Debug-specific behavior
      await page.setViewportSize({ width: 1920, height: 1080 });
    }
    
    await page.goto(envConfig.baseUrl);
    
    // Use environment-specific credentials
    const credentials = DYNAMIC_HELPERS.getCredentials('USER');
    console.log(`Testing with user: ${credentials.email}`);
  });
});

// Example 5: Dynamic test data generation
test.describe('Example: Dynamic Test Data', () => {
  test('Generate unique test data', async ({ page }) => {
    const config = new TestConfigManager('default');
    const testData = config.generateTestData();
    
    console.log('Test Data:', testData);
    // Output: Test Data: {
    //   timestamp: '2025-09-08T10-30-45-123Z',
    //   testId: 'test-default-2025-09-08T10-30-45-123Z',
    //   sessionId: 'session-1725791445123',
    //   runId: 'local-2025-09-08T10-30-45-123Z'
    // }
  });
});

// Example 6: Configuration switching during runtime
test.describe('Example: Runtime Configuration Switching', () => {
  test('Switch between configurations', async ({ page }) => {
    // Start with default config
    let config = new TestConfigManager('default');
    await page.goto(config.getConfig().baseUrl);
    
    // Switch to debug mode for detailed inspection
    if (process.env.ENABLE_DEBUG === 'true') {
      config = DEBUG_CONFIG;
      await page.waitForTimeout(config.getConfig().slowMo);
    }
    
    // Use the current configuration
    const timeout = config.getTimeout('ASSERTION');
    await expect(page.getByRole('heading', { name: 'Data Engineering Dashboard' }))
      .toBeVisible({ timeout });
  });
});
