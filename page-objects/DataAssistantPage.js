import { expect } from '@playwright/test';

export class DataAssistantPage {
  constructor(page) {
    this.page = page;
    
    // Locators
    this.toggleDataAssistantBtn = this.page.getByRole('button', { name: 'Toggle Data Assistant' });
    this.showDataCatalogBtn = this.page.getByRole('button', { name: 'Show data catalog' });
    this.showTablesBtn = this.page.getByRole('button', { name: 'Show tables' });
    this.getTableDetailsBtn = this.page.getByRole('button', { name: 'Get table details' });
    this.showStoredProceduresBtns = this.page.getByRole('button', { name: 'Show stored procedures' });
    this.backToMainMenuBtns = this.page.getByRole('button', { name: 'Back to main menu' });
    this.lineageBtn = this.page.getByRole('button', { name: 'Lineage', exact: true });
    this.showExampleBtn = this.page.getByRole('button', { name: 'Show me an example' });
    this.backToLineageBtn = this.page.getByRole('button', { name: 'Back to lineage' });
  }

  // Actions
  async openDataAssistant() {
    await this.toggleDataAssistantBtn.click();
    await expect(this.showDataCatalogBtn).toBeVisible();
  }

  async exploreDataCatalog() {
    await this.showDataCatalogBtn.click();
    await expect(this.page.getByText('Our data catalog contains all')).toBeVisible();
  }

  async viewTablesAndDetails() {
    await this.showTablesBtn.click();
    // await expect(this.page.getByText('Here are some tables from your data catalog:')).toBeVisible();
    await this.getTableDetailsBtn.click();
  }

  async viewStoredProcedures() {
    await this.showStoredProceduresBtns.first().click();
    await this.backToMainMenuBtns.first().click();
  }

  async exploreLineage() {
    await expect(this.page.getByText('What would you like help with')).toBeVisible();
    await this.lineageBtn.click();
    await expect(this.page.getByText('Data lineage shows how data')).toBeVisible();
  }

  async viewExampleLineage() {
    await this.showExampleBtn.click();
    await expect(this.page.getByText("Here's a sample lineage")).toBeVisible();
    await this.backToLineageBtn.click();
    await expect(this.page.getByText('Data lineage shows how data')).toBeVisible();
  }
}
