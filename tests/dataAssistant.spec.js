import { test, expect } from "../fixtures/test-base.js";
import { ensureAuthenticated } from "../fixtures/loginSession.js";
import { DataAssistantPage } from "../page-objects/DataAssistantPage.js";

test.describe("@smoke Data Assistant Flow", () => {
  test("Complete Data Assistant workflow - Catalog, Tables, Procedures, and Lineage", async ({ page }) => {
    const dataAssistantPage = new DataAssistantPage(page);

    await test.step("Authenticate and open Data Assistant", async () => {
      await ensureAuthenticated(page);
      await page.waitForLoadState("networkidle");
      await dataAssistantPage.openDataAssistant();
    });

    await test.step("Explore Data Catalog", async () => {
      await dataAssistantPage.exploreDataCatalog();
    });

    await test.step("View Tables and Get Details", async () => {
      await dataAssistantPage.viewTablesAndDetails();
    });

    await test.step("Navigate Stored Procedures and Return to Main Menu", async () => {
      await dataAssistantPage.viewStoredProcedures();
    });

    await test.step("Explore Data Lineage and Examples", async () => {
      await dataAssistantPage.exploreLineage();
      await dataAssistantPage.viewExampleLineage();
    });

    await test.step("Close Data Assistant", async () => {

        await page.close();
    });
  });
});
