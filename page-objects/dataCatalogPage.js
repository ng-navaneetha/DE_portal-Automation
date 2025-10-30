
export class DataCatalogPage {
  constructor(page) {
    this.page = page;
    this.iframe = null;
  }

  // Initialize iframe locator for reuse - performance optimization
  getIframe() {
    if (!this.iframe) {
      this.iframe = this.page.frameLocator('iframe').first();
    }
    return this.iframe;
  }

  // Navigation methods
  async navigateToDataCatalog() {
   
    await this.page.getByRole('link', { name: 'Data Catalog' }).click();
    await this.page.waitForLoadState('networkidle');
    await this.waitForIframeLoad();
  }

  async waitForIframeLoad() {
    await this.page.locator('iframe').first().waitFor({ state: 'attached', timeout: 30000 });
    await this.getIframe().locator('body').waitFor({ state: 'visible', timeout: 30000 });
  }

  // DBT iframe methods with better error handling and performance
  async loginToDBTIframe() {
    const iframe = this.getIframe();
    
    // Wait for login form to be ready
    await iframe.getByRole('textbox').first().waitFor({ timeout: 30000 });
    
    // Fill login credentials using more resilient selectors
    await iframe.getByRole('textbox').nth(0).fill('admin@open-metadata.org');
    await iframe.getByRole('textbox').nth(1).fill('admin');
    
    // Click login button and wait for navigation
    await Promise.all([
      
      iframe.getByRole('button', { name: /sign in/i }).click()
    ]);
  }

  async closeWhatsNewAlertIfPresent() {
    const iframe = this.getIframe();
    try {
      const alert = iframe.getByTestId('close-whats-new-alert');
      if (await alert.isVisible({ timeout: 3000 })) {
        await alert.click();
      }
    } catch (error) {
      // Alert not present, continue
    }
  }

  async navigateToLineageTab() {
    const iframe = this.getIframe();
    const lineageTab = iframe.getByTestId('app-bar-item-lineage');
    await lineageTab.waitFor({ state: 'visible' });
    await lineageTab.click();
  }

  async clickDropdown() {
    const iframe = this.getIframe();
    
    // Wait for the input element to be present and visible
    const inputElement = iframe.locator('#rc_select_1');
    await inputElement.waitFor({ state: 'visible' });
    
    // Try to find and click the parent select container for better reliability
    try {
      const selectContainer = iframe.locator('.ant-select').has(inputElement);
      await selectContainer.click({ timeout: 10000 });
      console.log('Successfully clicked select container');
    } catch (error) {
      console.log('Trying to click input element directly...');
      // Fallback: click the input element directly
      await inputElement.click({ timeout: 10000 });
      console.log('Successfully clicked input element');
    }
    
    // Wait a moment for the dropdown to open
    await this.page.waitForTimeout(1000);
  }

  async selectNodeSuggestion(lineageOption) {
    const iframe = this.getIframe();
    const option = iframe.getByTestId(lineageOption);
    await option.waitFor({ state: 'visible' });
    await option.click();
  }

  async clickFlowPane() {
    const iframe = this.getIframe();
    const flowPane = iframe.locator('.react-flow__pane');
    await flowPane.waitFor({ state : 'visible' });
    await flowPane.click();
  }

  async clickSpecificNode(node) {
    const iframe = this.getIframe();
    const specificNode = iframe.getByTestId(node);
    await specificNode.waitFor({ state: 'visible' });
    await specificNode.click();
  }

  async handleSwaggerPopup() {
    const iframe = this.getIframe();
    const [popup] = await Promise.all([
      this.page.waitForEvent('popup'),
      iframe.getByRole('link').filter({ hasText: /swagger/i }).click()
    ]);
    
    await popup.waitForLoadState();
    return popup;
  }

  async clickEntityLink() {
    const iframe = this.getIframe();
    const entityLink = iframe.getByTestId('entity-link');
    await entityLink.waitFor({ state: 'visible' });
    await entityLink.click();
  }

  async clickCustomProperties() {
    const iframe = this.getIframe();
    const customProps = iframe.getByRole('tab').filter({ hasText: /custom properties/i });
    await customProps.waitFor({ state: 'visible' });
    await customProps.click();
  }

  // Verification methods with proper waiting
  async verifyDomainLabel() {
    const iframe = this.getIframe();
    return iframe.getByTestId('Domains-label').first();
  }

  async verifyEndpointURLLabel() {
    const iframe = this.getIframe();
    return iframe.getByTestId('Dashboard URL-label').first();
  }

  async verifyServiceField() {
    const iframe = this.getIframe();
    return iframe.getByText('Service').first();
  }

  async verifyLineage() {
    const iframe = this.getIframe();
    return iframe.getByText('Lineage').first();
  }

  async verifyActivityFeedsAndTasks() {
    const iframe = this.getIframe();
    return iframe.getByText('Activity Feeds & Tasks0').first();
  }

  // Reusable workflow methods to eliminate duplication
  async completeInitialSetup() {
    await this.navigateToDataCatalog();
    await this.loginToDBTIframe();
    await this.closeWhatsNewAlertIfPresent();
  }

  async setupLineageView(lineageOption) {
    await this.completeInitialSetup();
    await this.navigateToLineageTab();
    await this.clickDropdown();
    await this.selectNodeSuggestion(lineageOption);
    await this.clickFlowPane();
  }

  async setupEntityDetails(lineageOption, node) {
    await this.setupLineageView(lineageOption);
    await this.clickSpecificNode(node);
    await this.clickEntityLink();
  }
}