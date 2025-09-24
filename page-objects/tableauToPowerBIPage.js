import { expect } from '@playwright/test';
import { TEST_CONSTANTS } from '../constants/testData.js';

export class TableauToPowerBIPage {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto(`${TEST_CONSTANTS.BASE_URL}/tableau-to-powerbi`);
  }

  async fillTableauDetails({ serverUrl, siteId, dashboardName }) {
    await this.page.getByRole('textbox', { name: 'Tableau Server URL' }).fill(serverUrl);
    await this.page.getByRole('textbox', { name: 'Site ID' }).fill(siteId);
    await this.page.getByRole('textbox', { name: 'Dashboard Name' }).fill(dashboardName);
  }

  async convertDashboard() {
    await this.page.getByRole('button', { name: TEST_CONSTANTS.SELECTORS.CONVERT_BUTTON }).click();
  }

  async expectConversionProgress() {
    await expect(this.page.getByRole('heading', { name: TEST_CONSTANTS.MESSAGES.CONVERSION_PROGRESS })).toBeVisible();
    await expect(this.page.getByText(TEST_CONSTANTS.MESSAGES.CONVERSION_STATUS)).toBeVisible();
  }

  async waitForConversionCompletion() {
    // Wait for the conversion to complete and success status to appear
    await expect(this.page.getByText('Success',{ exact: true })).toBeVisible({ timeout: 30000 });
    console.log('✅ Conversion completed successfully');
  }

  async expectOutputMessage() {
      // Fallback for other types
      await expect(this.page.getByText("Your Tableau dashboard has been successfully converted to a Power BI report    ")).toBeVisible();
    
  }

  async expectDynamicOutputFile(dashboardName) {
    // Wait for any PDF file with the dashboard name pattern
    console.log(`Looking for PDF file with dashboard name: "${dashboardName}"`);
    
    // Give time for file generation after conversion
    await this.page.waitForTimeout(3000);
    
    // Look for the generated PDF filename pattern: {dashboardName} test_{date}_{time}_report.pdf
    const pdfPattern = new RegExp(`${dashboardName}\\s+test_\\d{8}_\\d{6}_report\\.pdf`, 'i');
    await expect(this.page.getByText(pdfPattern)).toBeVisible({ timeout: 15000 });
    
    // Verify the browser security message appears
    await expect(this.page.getByText("If the preview doesn't appear, your browser might be blocking the PDF display for security reasons")).toBeVisible();
    
    // Verify the action text appears
    await expect(this.page.getByText("Please use the buttons below to open or download the PDF directly")).toBeVisible();
    
    // Verify the "Open PDF in new tab" button/link is available
    await expect(this.page.getByText("Open PDF in new tab")).toBeVisible();
  }

  async openPdfInNewTab() {
    // Check if clicking the link triggers a download instead of opening new tab
    const downloadPromise = this.page.waitForEvent('download', { timeout: 5000 }).catch(() => null);
    const newPagePromise = this.page.context().waitForEvent('page', { timeout: 5000 }).catch(() => null);
    
    // Click the "Open PDF in new tab" link
    await this.page.getByText('Open PDF in new tab').click();
    
    // Wait for either download or new page
    const [download, newPage] = await Promise.all([downloadPromise, newPagePromise]);
    
    if (download) {
      // PDF was downloaded instead of opening in new tab
      console.log('✅ PDF download detected:', download.suggestedFilename());
      expect(download.suggestedFilename()).toMatch(/\.pdf$/);
      return { type: 'download', download: download };
    } else if (newPage) {
      // PDF opened in new tab
      console.log('✅ PDF opened in new tab');
      return { type: 'newPage', page: newPage };
    } else {
      throw new Error('Neither download nor new page was detected');
    }
  }

  async expectPdfDownloadAvailable() {
    const downloadPromise = this.page.waitForEvent('download');
    await this.page.getByRole('button', { name: /Download/ }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.pdf$/);
    return download;
  }

  async expectCompleteConversionResult(dashboardName) {
    // Comprehensive check for all conversion result elements
    await this.expectDynamicOutputFile(dashboardName);
    
    // Additional checks for the complete page state
    await expect(this.page.getByText("Open PDF in new tab")).toBeVisible();
    
    // Log the successful conversion
    console.log(`✅ Conversion completed successfully for dashboard: ${dashboardName}`);
  }

  async expectSolutionsNavigation() {
    await this.page.getByRole('button', { name: TEST_CONSTANTS.SELECTORS.SOLUTIONS_BUTTON }).click();
    await expect(this.page.getByRole('link', { name: TEST_CONSTANTS.SELECTORS.TABLEAU_LINK })).toBeVisible();
    await this.page.getByRole('link', { name: TEST_CONSTANTS.SELECTORS.TABLEAU_LINK }).click();
  }
}
    
   