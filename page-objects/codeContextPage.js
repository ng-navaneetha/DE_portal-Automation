import { expect } from '@playwright/test';
import { TEST_CONSTANTS } from '../constants/testData.js';

export class CodeContextPage {
  constructor(page) {
    this.page = page;
    
    // Selectors using constants
    this.toolsButton = page.getByRole('button', { name: TEST_CONSTANTS.CODE_CONTEXT.TOOLS_BUTTON }).first();
    this.codeContextLink = page.getByRole('link', { name: TEST_CONSTANTS.CODE_CONTEXT.CODE_CONTEXT_LINK });
    this.browseProceduresTab = page.getByRole('tab', { name: TEST_CONSTANTS.CODE_CONTEXT.BROWSE_PROCEDURES_TAB });
    this.browseTablesTab = page.getByRole('tab', { name: 'Browse Tables' });
    this.directInputTab = page.getByRole('tab', { name: 'Direct Input' });
    this.businessDescriptionTab = page.getByRole('tab', { name: TEST_CONSTANTS.CODE_CONTEXT.BUSINESS_DESCRIPTION_TAB });
    
    // Procedure table and actions
    this.procedureTable = page.locator('table');
    this.procedureRow = page.locator(`tr:has-text("${TEST_CONSTANTS.CODE_CONTEXT.PROCEDURE_NAME}") `);
    this.procedureActionButton = page.locator(`tr:has-text("${TEST_CONSTANTS.CODE_CONTEXT.PROCEDURE_NAME}") button[data-slot="tooltip-trigger"]`);
    
    // Procedure details
    this.procedureMetadataHeading = page.getByRole('heading', { name: TEST_CONSTANTS.CODE_CONTEXT.PROCEDURE_METADATA_HEADING });
    this.fullyQualifiedName = page.getByText(TEST_CONSTANTS.CODE_CONTEXT.FULLY_QUALIFIED_NAME);
    this.databaseName = page.locator(`text=/Database:\\s*${TEST_CONSTANTS.CODE_CONTEXT.DATABASE_NAME}/`);
    this.schemaName = page.locator(`text=/Schema:\\s*${TEST_CONSTANTS.CODE_CONTEXT.SCHEMA_NAME}/`);
    this.sqlCodeHeading = page.getByText(TEST_CONSTANTS.CODE_CONTEXT.SQL_CODE_HEADING);
    this.sqlCodeArea = page.locator('.bg-zinc-900');
    
    // Action buttons
    this.backToListButton = page.getByRole('button', { name: TEST_CONSTANTS.CODE_CONTEXT.BACK_TO_LIST_BUTTON }).first();
    this.parseButton = page.getByRole('button', { name: TEST_CONSTANTS.CODE_CONTEXT.PARSE_BUTTON }).first();
    this.startNewConversionButton = page.getByRole('button', { name: TEST_CONSTANTS.CODE_CONTEXT.START_NEW_BUTTON }).first();
    
    // Conversion results
    this.conversionResultsHeading = page.getByText(TEST_CONSTANTS.CODE_CONTEXT.CONVERSION_RESULTS_HEADING);
    this.successStatus = page.getByText(TEST_CONSTANTS.CODE_CONTEXT.SUCCESS_STATUS);
    this.timestampPattern = page.locator('text=/\\d+\\/\\d+\\/\\d+, \\d+:\\d+:\\d+ [AP]M/');
    
    // Business description elements
    this.descriptionText = page.getByText(TEST_CONSTANTS.CODE_CONTEXT.DESCRIPTION_TEXT);
    this.pseudoCodeText = page.getByText(TEST_CONSTANTS.CODE_CONTEXT.PSEUDO_CODE_TEXT);
    this.tablesUsedText = page.getByText(TEST_CONSTANTS.CODE_CONTEXT.TABLES_USED_TEXT);
    this.lineCountText = page.getByText(TEST_CONSTANTS.CODE_CONTEXT.LINE_COUNT_TEXT);
    this.tokenCountText = page.getByText(TEST_CONSTANTS.CODE_CONTEXT.TOKEN_COUNT_TEXT);
    this.storedProceduresUsedHeading = page.getByText(TEST_CONSTANTS.CODE_CONTEXT.STORED_PROCEDURES_USED_HEADING);
    this.createProcedureText = page.getByText(TEST_CONSTANTS.CODE_CONTEXT.SQL_CODE_SNIPPET);
  }

  // Navigation methods
  async navigateToCodeContext() {
    await this.toolsButton.click();
    await this.codeContextLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async openProcedure() {
    await this.procedureActionButton.click();
    await this.procedureMetadataHeading.waitFor();
  }

  async goBackToList() {
    await this.backToListButton.click();
    await this.browseProceduresTab.waitFor();
  }

  async triggerParse() {
    await this.parseButton.click();
    await this.conversionResultsHeading.waitFor();
  }

  async switchToBusinessDescription() {
    await this.businessDescriptionTab.click();
  }

  async startNewConversion() {
    await this.startNewConversionButton.click();
  }

  // Combined navigation methods for common flows
  async navigateAndOpenProcedure() {
    await this.navigateToCodeContext();
    await this.openProcedure();
  }

  async navigateParseAndSwitchTab() {
    await this.navigateToCodeContext();
    await this.openProcedure();
    await this.triggerParse();
    await this.switchToBusinessDescription();
  }

  // Verification methods
  async verifyBrowseProceduresTabActive() {
    await expect(this.browseProceduresTab).toHaveAttribute('aria-selected', 'true');
  }
  async openCalculateAverageProcedure() {
    await this.procedureActionButton.click();
    
  }

  async verifyProcedureMetadata() {
    await expect(this.procedureMetadataHeading).toBeVisible();
    await expect(this.fullyQualifiedName).toBeVisible();
    await expect(this.databaseName).toBeVisible();
    await expect(this.schemaName.first()).toBeVisible();
  }

  async verifySqlCodeSection() {
    await expect(this.sqlCodeHeading).toBeVisible();
    await expect(this.sqlCodeArea).toBeVisible();
    await expect(this.sqlCodeArea).toContainText('CREATE OR REPLACE PROCEDURE');
  }

  async verifyConversionResults() {
    await expect(this.conversionResultsHeading).toBeVisible();
    await this.page.waitForSelector('text=Success', { timeout: 20000 });
    await expect(this.successStatus).toBeVisible();
    await expect(this.timestampPattern).toBeVisible();
  }

  async verifyBusinessDescriptionContent() {
    await expect(this.descriptionText.first()).toBeVisible();
    await expect(this.pseudoCodeText).toBeVisible();
    await expect(this.tablesUsedText).toBeVisible();
    await expect(this.lineCountText).toBeVisible();
    await expect(this.tokenCountText).toBeVisible();
  }

  async verifyStoredProceduresSection() {
    await expect(this.storedProceduresUsedHeading).toBeVisible();
    await expect(this.createProcedureText).toBeVisible();
  }

  async verifySchemaElementsClickable() {
    // Verify elements are present and potentially clickable
    await expect(this.databaseName).toBeVisible();
    await expect(this.schemaName.first()).toBeVisible();
    
    // Could add more specific clickability checks here
    // such as checking for cursor pointer, href attributes, etc.
  }

  // Complete workflow method
  async executeCompleteWorkflow() {
    await this.navigateToCodeContext();
    await this.verifyBrowseProceduresTabActive();
    
    await this.openCalculateAverageProcedure();
    await this.verifyProcedureMetadata();
    await this.verifySqlCodeSection();
    
    await this.goBackToList();
    await this.openCalculateAverageProcedure();
    
    await this.triggerParse();
    await this.verifyConversionResults();
    await this.verifyBusinessDescriptionContent();
    await this.verifyStoredProceduresSection();
    
    await this.startNewConversion();
  }
}
