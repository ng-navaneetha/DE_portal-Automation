import { test, expect } from '../fixtures/test-base.js';
import { TableauToPowerBIPage } from '../page-objects/tableauToPowerBIPage.js';
import { ensureAuthenticated } from '../fixtures/loginSession.js';
import { TEST_CONSTANTS } from '../constants/testData.js';

test.describe('Tableau to Power BI Conversion', () => {
  let tableauPage;

  test.beforeEach(async ({ page }) => {
    tableauPage = new TableauToPowerBIPage(page);
    // Ensure authentication - will use stored session if valid, login if needed
    await ensureAuthenticated(page);
  });

  test.afterEach(async ({ page }) => {
    // Clear cookies and local storage to ensure clean state for next test
    await page.close();
  });

  test('@smoke Happy Path - Convert Tableau dashboard and download PDF', async ({ page }) => {

    await tableauPage.expectSolutionsNavigation();
    await tableauPage.fillTableauDetails(TEST_CONSTANTS.TABLEAU.VALID);
    await tableauPage.convertDashboard();
    await tableauPage.expectConversionProgress();
    await tableauPage.waitForConversionCompletion();
    await tableauPage.expectOutputMessage();
    const pdfResult = await tableauPage.openPdfInNewTab();
    
    if (pdfResult.type === 'download') {
      // PDF was downloaded - verify the download
      expect(pdfResult.download.suggestedFilename()).toMatch(/\.pdf$/);
      console.log('✅ PDF downloaded successfully:', pdfResult.download.suggestedFilename());
    } else if (pdfResult.type === 'newPage') {
      // PDF opened in new tab - verify URL and close
      await expect(pdfResult.page).toHaveURL(/.*\.pdf$/);
      await pdfResult.page.close();
      console.log('✅ PDF opened in new tab successfully');
    }
  });

  test('Negative - Blank inputs', async ({ page }) => {
    
    await tableauPage.navigate();
    await tableauPage.fillTableauDetails({ serverUrl: '', siteId: '', dashboardName: '' });
    // convertdashbord button is empty
    await expect(page.getByRole('button', { name: TEST_CONSTANTS.SELECTORS.CONVERT_BUTTON })).toBeDisabled();
  });

  test('Negative - Invalid Tableau URL', async ({ page }) => {
    await tableauPage.navigate();
    await tableauPage.fillTableauDetails(TEST_CONSTANTS.TABLEAU.INVALID);
    // await tableauPage.convertDashboard();
    await expect(page.getByText('Must be a valid URL').first()).toBeVisible();
    await expect(page.getByRole('button', { name: TEST_CONSTANTS.SELECTORS.CONVERT_BUTTON })).toBeDisabled();


  });

  test('Negative - Unsupported dashboard name', async ({ page }) => {
    await tableauPage.navigate();
    await tableauPage.fillTableauDetails({
      serverUrl: TEST_CONSTANTS.TABLEAU.VALID.serverUrl,
      siteId: TEST_CONSTANTS.TABLEAU.VALID.siteId,
      dashboardName: TEST_CONSTANTS.TABLEAU.INVALID.dashboardName
    });
    await tableauPage.convertDashboard();
    await expect(page.getByText(TEST_CONSTANTS.MESSAGES.UNSUPPORTED_ERROR)).toBeVisible();
    //"No workbook or datasource named 'SalesPerformance2024' found." THIS ERROR MESSAGE IS VISIBLE, WHERE DASHBOARD NAME IS DYNAMIC
    await expect(page.getByText(new RegExp(`No workbook or datasource named.*${TEST_CONSTANTS.TABLEAU.INVALID.dashboardName}.*found`))).toBeVisible();

  });

  // test('Edge - Large report generation', async ({ page }) => {
  //   await tableauPage.navigate();
  //   await tableauPage.fillTableauDetails(TEST_CONSTANTS.TABLEAU.LARGE);
  //   await tableauPage.convertDashboard();
  //   await tableauPage.expectConversionProgress();
  //   await tableauPage.waitForConversionCompletion();
  //   await tableauPage.expectOutputFile(TEST_CONSTANTS.EXPECTED_FILES.LARGE_PDF_PATTERN);
  // });


  test('Unauthorized access to Tableau', async ({ page }) => {
    await tableauPage.navigate();
    await tableauPage.fillTableauDetails({
      serverUrl: TEST_CONSTANTS.TABLEAU.VALID.serverUrl,
      siteId: TEST_CONSTANTS.TABLEAU.INVALID.siteId,
      dashboardName: TEST_CONSTANTS.TABLEAU.VALID.dashboardName
    });
    await tableauPage.convertDashboard();
    await expect(page.getByText(TEST_CONSTANTS.MESSAGES.UNAUTHORIZED_ERROR)).toBeVisible();
  });


  test('UI element presence after login', async ({ page }) => {
    await expect(page.getByRole('button', { name: TEST_CONSTANTS.SELECTORS.SOLUTIONS_BUTTON })).toBeVisible();
    await page.getByRole('button', { name: TEST_CONSTANTS.SELECTORS.SOLUTIONS_BUTTON }).click();
    await expect(page.getByRole('link', { name: TEST_CONSTANTS.SELECTORS.TABLEAU_LINK })).toBeVisible();
  });

  test('Empty Dashboard Name field', async ({ page }) => {
    await tableauPage.navigate();
    await tableauPage.fillTableauDetails({
      serverUrl: TEST_CONSTANTS.TABLEAU.VALID.serverUrl,
      siteId: TEST_CONSTANTS.TABLEAU.VALID.siteId,
      dashboardName: ''
    });
    await expect(page.getByRole('button', { name: TEST_CONSTANTS.SELECTORS.CONVERT_BUTTON })).toBeDisabled();
  });

  test('Logout and re-login behavior', async ({ page }) => {
    // Simulate logout
    await page.goto(`${TEST_CONSTANTS.BASE_URL}`);
    await ensureAuthenticated(page);
    await page.getByRole('button', { name: 'U', exact: true }).click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();
    await expect(page.getByRole('heading', { name: 'Enterprise Data Platform' })).toBeVisible();
  });

  test('UI - Verify page heading and description', async ({ page }) => {
    await tableauPage.navigate();
    // Verify main heading
    await expect(page.getByRole('heading', { name: 'Tableau to Power BI Converter' })).toBeVisible();
    // Verify description text
    await expect(page.getByText('Convert your Tableau dashboards to Power BI reports with just a few clicks')).toBeVisible();
  });

  test('UI - Verify 3-step process indicators', async ({ page }) => {
    await tableauPage.navigate();
    // Verify step indicators are visible
    await expect(page.getByText('1')).toBeVisible();
    await expect(page.getByText('Enter Tableau Details')).toBeVisible();
    await expect(page.getByText('2')).toBeVisible();
    await expect(page.getByText('Converting')).toBeVisible();
    await expect(page.getByText('3')).toBeVisible();
    await expect(page.getByText('Download')).toBeVisible();
  
  });

  test('UI - Verify form field labels and placeholders', async ({ page }) => {
    await tableauPage.navigate();
    // Verify section heading
    await expect(page.getByRole('heading', { name: 'Enter Tableau Dashboard Details' })).toBeVisible();
    // Verify description
    await expect(page.getByText('Provide the required information below to convert your Tableau dashboard to a Power BI report.')).toBeVisible();
    
    // Verify field labels
    await expect(page.getByText('Tableau Server URL')).toBeVisible();
    await expect(page.getByText('Site ID')).toBeVisible();
    await expect(page.getByText('Dashboard Name')).toBeVisible();
    
    // Verify placeholder text
    await expect(page.getByPlaceholder('https://your-tableau-server.tableau.com')).toBeVisible();
    await expect(page.getByPlaceholder('your-site-id')).toBeVisible();
    await expect(page.getByPlaceholder('SalesDashboard')).toBeVisible();
  });

  test('UI - Verify help icons and tooltips', async ({ page }) => {
    await tableauPage.navigate();
    // Check for help/info icons next to fields
    const helpIcons = page.locator('[data-slot="tooltip-trigger"]');
    await expect(helpIcons).toHaveCount(4); // One for each field
    
    // Test tooltip on hover (if implemented)
    await helpIcons.nth(1).hover();
    // Verify tooltip appears with expected content
    await expect(page.locator('[data-slot="tooltip-content"]')).toBeVisible();
    await expect(page.getByText('Enter your Tableau server URL')).toBeVisible();

    //for 2nd icon hover "Enter your Tableau site ID:", 3rd icon hover"Enter the name of your Tableau dashboard"
    await helpIcons.nth(2).hover();
    await expect(page.getByText('Enter your Tableau site ID')).toBeVisible();
    await helpIcons.nth(3).hover();
    await expect(page.getByText('Enter the name of your Tableau dashboard')).toBeVisible();
  });

  test('UI - Convert button states', async ({ page }) => {
    await tableauPage.navigate();
    
    // Initially button should be enabled but might show validation on click
    const convertButton = page.getByRole('button', { name: 'Convert Dashboard' });
    await expect(convertButton).toBeVisible();
    
    // Fill partial data and verify button behavior
    await page.getByRole('textbox', { name: 'Tableau Server URL' }).fill('https://test.tableau.com');
    await expect(convertButton).toBeVisible();
    
    // Fill all required fields
    await tableauPage.fillTableauDetails(TEST_CONSTANTS.TABLEAU.VALID);
    await expect(convertButton).toBeEnabled();
  });

  test('Form validation - Invalid URL format', async ({ page }) => {
    await tableauPage.navigate();
    
    // Test invalid URL format
    await page.getByRole('textbox', { name: 'Tableau Server URL' }).fill('not-a-valid-url');
    await page.getByRole('textbox', { name: 'Site ID' }).fill('test-site');
    await page.getByRole('textbox', { name: 'Dashboard Name' }).fill('TestDash');
    
    // Should show URL validation error
    await expect(page.getByText(TEST_CONSTANTS.MESSAGES.INVALID_URL_ERROR)).toBeVisible();
  });

  test('Form validation - Special characters in fields', async ({ page }) => {
    await tableauPage.navigate();
    
    // Test special characters in dashboard name
    await tableauPage.fillTableauDetails({
      serverUrl: TEST_CONSTANTS.TABLEAU.VALID.serverUrl,
      siteId: TEST_CONSTANTS.TABLEAU.VALID.siteId,
      dashboardName: 'Test@#$%Dashboard!'
    });
    
    await tableauPage.convertDashboard();
    // Should handle or validate special characters appropriately
    await tableauPage.expectConversionProgress();
  });

  test('UI - Step progression visual feedback', async ({ page }) => {
    await tableauPage.navigate();
    await tableauPage.fillTableauDetails(TEST_CONSTANTS.TABLEAU.VALID);
    
    // Step 1 should be active initially - check for primary styling on the step circle
    const step1Circle = page.locator('ol li:first-child div.rounded-full');
    await expect(step1Circle).toHaveClass(/bg-primary/);
    await expect(step1Circle).toHaveClass(/border-primary/);
    
    await tableauPage.convertDashboard();
    
    // Step 2 should become active during conversion - check for primary styling on the step circle
    const step2Circle = page.locator('ol li:nth-child(2) div.rounded-full');
    await expect(step2Circle).toHaveClass(/bg-primary/);
    await expect(step2Circle).toHaveClass(/border-primary/);
    await expect(page.locator('ol li:nth-child(2) span').getByText('Converting')).toBeVisible();
    
    // Wait for conversion to complete and step 3 to become active
    await tableauPage.expectConversionProgress();
    await tableauPage.waitForConversionCompletion();
    
    // Step 3 (Download) should eventually become active - check for primary styling on the step circle
    const step3Circle = page.locator('ol li:last-child div.rounded-full');
    await expect(step3Circle).toHaveClass(/bg-primary/);
    await expect(step3Circle).toHaveClass(/border-primary/);
    await expect(page.locator('ol li:last-child span').getByText('Download')).toBeVisible();
  });


  test('Responsive design - Mobile view', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await tableauPage.navigate();
    
    // Verify elements are still visible and accessible on mobile
    await expect(page.getByRole('heading', { name: 'Tableau to Power BI Converter' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Tableau Server URL' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Convert Dashboard' })).toBeVisible();
    
    // Test form interaction on mobile
    await tableauPage.fillTableauDetails(TEST_CONSTANTS.TABLEAU.VALID);
    await expect(page.getByRole('button', { name: 'Convert Dashboard' })).toBeEnabled();
  });
});
