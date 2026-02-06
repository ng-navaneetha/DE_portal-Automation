import { test, expect } from "../fixtures/test-base.js";
import { ensureAuthenticated } from "../fixtures/loginSession.js";
import { DYNAMIC_TEST_CONSTANTS } from "../constants/dynamicTestConstants.js";
import { DataCatalogPage } from "../page-objects/dataCatalogPage.js";

test.describe.configure({
  timeout: 120000, // Reduced from 240000 for better performance
  mode: "serial", // Run tests serially to avoid iframe conflicts
});

test.describe("Data Catalog - Complete DBT Flow", () => {
  let dataCatalogPage;

  test.beforeEach(async ({ page }) => {
    // Create a fresh page object for each test to ensure isolation
    dataCatalogPage = new DataCatalogPage(page);
    await ensureAuthenticated(page);
    await page.waitForLoadState("networkidle");
  });

  test.afterEach(async ({ page }) => {
    // Clean up after each test to ensure complete isolation
    try {
      // Clear browser state
      await page.context().clearCookies();
      await page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
      });

      // Clear any iframes or modal states
      await page.evaluate(() => {
        // Force close any open modals or dialogs
        const modals = document.querySelectorAll(
          '[role="dialog"], .modal, .popup',
        );
        modals.forEach((modal) => modal.remove());
      });
    } catch (error) {
      console.log("Cleanup warning:", error.message);
    }

    // Always close the page to ensure fresh state for next test
    if (!page.isClosed()) {
      await page.close();
    }
  });

  // Group basic functionality tests
  test.describe("Basic Authentication and Navigation", () => {
    test("TC_DC_001  Login - should authenticate with valid credentials", async ({
      page,
    }) => {
      await test.step("Verify successful login and dashboard loads", async () => {
        await expect(
          page.getByRole("heading", {
            name: DYNAMIC_TEST_CONSTANTS.CODE_CONTEXT.EXPECTED_CONTENT.HEADINGS
              .DASHBOARD,
          }),
        ).toBeVisible();
      });
    });

    test("TC_DC_002  Data Catalog Navigation - should navigate to Data Catalog page", async ({
      page,
    }) => {
      await test.step("Navigate to Data Catalog", async () => {
        await dataCatalogPage.navigateToDataCatalog();
      });

      await test.step("Verify iframe loads", async () => {
        await expect(dataCatalogPage.getIframe().locator("body")).toBeVisible({
          timeout: 30000,
        });
      });
    });

    test("TC_DC_003 DBT Login - should login with admin credentials", async ({
      page,
    }) => {
      await test.step("Complete DBT login flow", async () => {
        await dataCatalogPage.navigateToDataCatalog();
        await dataCatalogPage.loginToDBTIframe();
      });

      await test.step("Verify login success", async () => {
        await expect(dataCatalogPage.getIframe().locator("body")).toBeVisible({
          timeout: 30000,
        });
      });
    });
  });

  // Group entity detail tests
  test.describe("Entity Details and Properties", () => {
    test.beforeEach(async () => {
      // Each test should setup its own lineage view for better isolation
      await dataCatalogPage.setupLineageView(
        DYNAMIC_TEST_CONSTANTS.LINEAGE_OPTION,
      );
    });

    test("TC_DC_009 Node Details - should show node information", async () => {
      await test.step("Click node and verify selection", async () => {
        await dataCatalogPage.clickSpecificNode(
          DYNAMIC_TEST_CONSTANTS.LINEAGE_SELECTED_VIEW,
        );
      });

      await test.step("Verify node is selected", async () => {
        const node = dataCatalogPage
          .getIframe()
          .getByTestId(DYNAMIC_TEST_CONSTANTS.LINEAGE_SELECTED_VIEW);
        await expect(node).toHaveClass(/selected/);
      });
    });

    test("TC_DC_010 Domain Label Verification", async () => {
      await test.step("Navigate to node details", async () => {
        await dataCatalogPage.clickSpecificNode(
          DYNAMIC_TEST_CONSTANTS.LINEAGE_SELECTED_VIEW,
        );
      });

      await test.step("Verify Domain label visibility", async () => {
        await expect(await dataCatalogPage.verifyDomainLabel()).toBeVisible();
      });
    });

    test("TC_DC_011 Endpoint URL Label Verification", async () => {
      await test.step("Navigate to node details", async () => {
        await dataCatalogPage.clickSpecificNode(
          DYNAMIC_TEST_CONSTANTS.LINEAGE_SELECTED_VIEW,
        );
      });

      await test.step("Verify Endpoint URL label", async () => {
        await expect(
          await dataCatalogPage.verifyEndpointURLLabel(),
        ).toBeVisible();
      });
    });
  });

  // Group lineage interaction tests
  test.describe("Lineage Interaction Flow", () => {
    test.beforeEach(async () => {
      // Each test should setup its own initial state - no shared state
      await dataCatalogPage.completeInitialSetup();
      await dataCatalogPage.navigateToExplore();
    });

    test("TC_DC_005 Lineage Tab Navigation", async () => {
      await test.step("Verify snowflake expansion", async () => {
        await dataCatalogPage.expandSnowflakeTree();
        await dataCatalogPage.expandDatabaseNode();
        await dataCatalogPage.expandSchemaNode();
        await dataCatalogPage.selectDatabase(
          DYNAMIC_TEST_CONSTANTS.SNOWFLAKE_EXPLORE.DATABASE,
        );

        const iframe = dataCatalogPage.getIframe();
        const database = iframe.getByTestId(
          `explore-tree-title-${DYNAMIC_TEST_CONSTANTS.SNOWFLAKE_EXPLORE.DATABASE}`,
        );
        await expect(database).toBeVisible();
      });
    });

    test("TC_DC_007 Verify lineage node selection", async () => {
      await test.step("Complete node selection flow", async () => {
        await dataCatalogPage.expandSnowflakeTree();
        await dataCatalogPage.expandDatabaseNode();
        await dataCatalogPage.expandSchemaNode();
      });

      await test.step("Verify selection", async () => {
        await dataCatalogPage.selectPWODWH();
      });
    });

    // test.describe("Advanced Features", () => {
    //   test("TC_DC_014 @smoke Complete Advanced Features - should verify all tabs and functionalities", async () => {
    //     await test.step("Setup entity details for advanced features testing", async () => {
    //       await dataCatalogPage.setupEntityDetails(
    //         DYNAMIC_TEST_CONSTANTS.LINEAGE_OPTION,
    //         DYNAMIC_TEST_CONSTANTS.LINEAGE_SELECTED_VIEW
    //       );
    //     });

    //     await test.step("Verify entity details page", async () => {
    //       const iframe = dataCatalogPage.getIframe();
    //       await expect(iframe.getByTestId("details")).toBeVisible();
    //     });

    //     // Define features to test in a loop
    //     const featuresToTest = [
    //       {
    //         name: "Lineage tab functionality",
    //         action: async () => await dataCatalogPage.verifyLineage(),
    //         description: "Verify Lineage visibility",
    //       },
    //       {
    //         name: "Activity Feeds and Tasks tab",
    //         action: async () =>
    //           await dataCatalogPage.verifyActivityFeedsAndTasks(),
    //         description: "Verify Activity Feeds visibility",
    //       },
    //       {
    //         name: "Custom Properties tab",
    //         action: async () => {
    //           await dataCatalogPage.clickCustomProperties();
    //           const iframe = dataCatalogPage.getIframe();
    //           return iframe.getByRole("tab", { name: "Custom Properties" });
    //         },
    //         description: "Navigate and verify Custom Properties tab",
    //       },
    //     ];

    //     // Loop through each feature and test it
    //     for (const feature of featuresToTest) {
    //       await test.step(`Verify ${feature.name}`, async () => {
    //         const element = await feature.action();
    //         await expect(element).toBeVisible();
    //       });
    //     }

    //     await test.step("Verify all advanced features are accessible together", async () => {
    //       const iframe = dataCatalogPage.getIframe();
    //       // Verify multiple features are working together using Promise.all for parallel execution
    //       const verificationPromises = [
    //         await expect(await dataCatalogPage.verifyLineage()).toBeVisible(),
    //         await expect(
    //           await dataCatalogPage.verifyActivityFeedsAndTasks()
    //         ).toBeVisible(),
    //         await expect(
    //           iframe.getByRole("tab", { name: "Custom Properties" })
    //         ).toBeVisible(),
    //       ];

    //       await Promise.all(verificationPromises);
    //     });
    //   });
    // });

    // End-to-end workflow test
    test("TC_DC_020 @smoke End-to-End Workflow - should complete full data catalog journey", async () => {
      await test.step("Execute complete workflow efficiently", async () => {
        await dataCatalogPage.expandSnowflakeTree();
        await dataCatalogPage.expandDatabaseNode();
        await dataCatalogPage.expandSchemaNode();
        await dataCatalogPage.selectDatabase(
          DYNAMIC_TEST_CONSTANTS.SNOWFLAKE_EXPLORE.DATABASE,
        );
        await dataCatalogPage.selectPWODWH();
        await dataCatalogPage.selectDIMCLIENT();
        await dataCatalogPage.selectLineageTab();
      });

      await test.step("Verify workflow completion with multiple assertions", async () => {
        const iframe = dataCatalogPage.getIframe();
        const dimClientLineage = iframe.getByTestId('rf__node-9d082670-e735-491a-86d7-8f47871c98cb');
        await dimClientLineage.waitFor({ state: "visible" });

        // Use Promise.all for parallel assertions to improve performance
        await Promise.all([
          await expect(dimClientLineage).toBeVisible()
        ]);
        console.log("Snowflake Lineage is visible.");
      });
    });
  });
});
