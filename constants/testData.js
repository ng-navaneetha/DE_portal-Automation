export const TEST_CONSTANTS = {
  BASE_URL: process.env.BASE_URL || 'https://de-hub.ngenux.app',
  
  CREDENTIALS: {
    VALID: {
      email: process.env.VALID_EMAIL || 'abcd@ngenux.com',
      password: process.env.VALID_PASSWORD || 'Admin@123'
    },
    INVALID: {
      email: process.env.INVALID_EMAIL || 'wrong@ngenux.com',
      password: process.env.INVALID_PASSWORD || 'WrongPass'
    }
  },

  CODE_CONTEXT: {
    // Navigation and UI elements
    TOOLS_BUTTON: '(Tools)ⁿ',
    CODE_CONTEXT_LINK: 'Code Context',
    PARSE_BUTTON: 'Parse',
    START_NEW_BUTTON: 'Start New Conversion',
    BACK_TO_LIST_BUTTON: 'Back to List',
    
    // Tab names
    BROWSE_PROCEDURES_TAB: 'Browse Procedures',
    BUSINESS_DESCRIPTION_TAB: 'Business Description',
    
    // Procedure information
    PROCEDURE_NAME: process.env.PROCEDURE_NAME || 'calculate_average',
    DATABASE_NAME: process.env.DATABASE_NAME || 'ecommerce_db',
    SCHEMA_NAME: process.env.SCHEMA_NAME || 'shopify',
    FULLY_QUALIFIED_NAME: process.env.FULLY_QUALIFIED_NAME || 'sample_data.ecommerce_db.shopify.calculate_average',
    
    // Headings
    PROCEDURE_METADATA_HEADING: 'Procedure Metadata:',
    SQL_CODE_HEADING: 'SQL Code:',
    CONVERSION_SUCCESS_HEADING: 'Conversion Success',
    CONVERTED_CODE_HEADING: 'Converted Code',
    STORED_PROCEDURES_USED_HEADING: 'Stored Procedures Used',
    CONVERSION_RESULTS_HEADING: 'Conversion Results',
    
    // Status and content
    SUCCESS_TEXT: 'Success',
    SUCCESS_STATUS: 'Success',
    SQL_CODE_SNIPPET: 'CREATE OR REPLACE PROCEDURE',
    
    // Business description elements
    DESCRIPTION_TEXT: 'Description',
    PSEUDO_CODE_TEXT: 'Pseudo Code',
    TABLES_USED_TEXT: 'Tables Used',
    LINE_COUNT_TEXT: 'Line Count',
    TOKEN_COUNT_TEXT: 'Token Count'
  },

  TABLEAU: {
    VALID: {
      serverUrl: process.env.TABLEAU_SERVER_URL || 'https://prod-useast-b.online.tableau.com',
      siteId: process.env.TABLEAU_SITE_ID || 'b360bi',
      dashboardName: process.env.TABLEAU_DASHBOARD_NAME || 'Superstore test'
    },
    INVALID: {
      serverUrl: process.env.INVALID_TABLEAU_SERVER_URL || 'invalid-url',
      siteId: process.env.INVALID_TABLEAU_SITE_ID || 'unauthorizedSite',
      dashboardName: process.env.INVALID_TABLEAU_DASHBOARD_NAME || 'UnsupportedDashboard'
    },
    LARGE: {
      serverUrl: process.env.TABLEAU_SERVER_URL || 'https://prod-useast-b.online.tableau.com',
      siteId: process.env.TABLEAU_SITE_ID || 'b360bi',
      dashboardName: process.env.LARGE_TABLEAU_DASHBOARD_NAME || 'Amerisave Dash'
    }
  },

  EXPECTED_FILES: {
    PDF_PATTERN: /Superstore.*\.pdf/,
    LARGE_PDF_PATTERN: /Request failed with status code 504/,
    DEFAULT_PDF_PREFIX: process.env.DEFAULT_PDF_PREFIX || 'Superstore test',
    DEFAULT_PDF_SUFFIX: process.env.DEFAULT_PDF_SUFFIX || '_report.pdf',
    
    // Helper function to generate dynamic PDF name
    generatePdfName: function(dashboardName = null) {
      const name = dashboardName || this.DEFAULT_PDF_PREFIX;
      const timestamp = new Date().toISOString()
        .replace(/[-T:]/g, '')
        .replace(/\..+/, '')
        .slice(0, 8) + '_' + 
        new Date().toISOString()
        .replace(/[-T:]/g, '')
        .replace(/\..+/, '')
        .slice(8, 14);
      return `${name}_${timestamp}${this.DEFAULT_PDF_SUFFIX}`;
    }
  },

  SELECTORS: {
    SOLUTIONS_BUTTON: '(Solutions)ⁿ',
    TABLEAU_LINK: 'Tableau to Power BI',
    CONVERT_BUTTON: 'Convert Dashboard',
    SIGN_IN_BUTTON: 'Sign In'
  },

  CODE_CONTEXT: {
    PROCEDURE_NAME: process.env.TEST_PROCEDURE_NAME || 'calculate_average',
    DATABASE_NAME: process.env.TEST_DATABASE_NAME || 'ecommerce_db',
    SCHEMA_NAME: process.env.TEST_SCHEMA_NAME || 'shopify',
    FULLY_QUALIFIED_NAME: process.env.TEST_FULLY_QUALIFIED_NAME || 'sample_data.ecommerce_db.shopify.calculate_average',
    SQL_CODE_SNIPPET: process.env.TEST_SQL_SNIPPET || 'CREATE OR REPLACE PROCEDURE',
    
    // Selectors for Code Context page
    TOOLS_BUTTON: '(Tools)ⁿ',
    CODE_CONTEXT_LINK: 'Code Context',
    BROWSE_PROCEDURES_TAB: 'Browse Procedures',
    BUSINESS_DESCRIPTION_TAB: 'Business Description',
    
    // Button text
    BACK_TO_LIST_BUTTON: 'Back to List',
    PARSE_BUTTON: 'Parse',
    START_NEW_CONVERSION_BUTTON: 'Start New Conversion',
    
    // Expected headings and text
    PROCEDURE_METADATA_HEADING: 'Procedure Metadata:',
    SQL_CODE_HEADING: 'SQL Code:',
    CONVERSION_RESULTS_HEADING: 'Conversion Results',
    SUCCESS_STATUS: 'Success',
    STORED_PROCEDURES_USED_HEADING: 'Stored Procedures Used',
    
    // Business description elements
    DESCRIPTION_TEXT: 'Description',
    PSEUDO_CODE_TEXT: 'Pseudo Code',
    TABLES_USED_TEXT: 'Tables Used',
    LINE_COUNT_TEXT: 'Line Count',
    TOKEN_COUNT_TEXT: 'Token Count'
  },

  MESSAGES: {
    CONVERSION_PROGRESS: /Converting your Tableau/,
    CONVERSION_STATUS: /This may take a few moments/,
    EMPTY_FORM: /Please fill in all required fields/i,
    VALIDATION_ERROR: /required|validation|blank/i,
    UNAUTHORIZED_ERROR: /The personal access token you provided is invalid.|error|access denied/i,
    INVALID_URL_ERROR: /Must be a valid URL/i,
    UNSUPPORTED_ERROR: /unsupported|error|not found/i,
    DOWNLOAD_ERROR: /download failed|error/i,
    DUPLICATE_ERROR: /duplicate|conflict|unique/i,
    LOGIN_ERROR: /invalid|error|incorrect/i
  },

  TIMEOUTS: {
    DEFAULT: parseInt(process.env.DEFAULT_TIMEOUT) || 30000,
    CONVERSION: parseInt(process.env.CONVERSION_TIMEOUT) || 60000,
    DOWNLOAD: parseInt(process.env.DOWNLOAD_TIMEOUT) || 30000
  },

  // Environment-specific configurations
  ENVIRONMENT: process.env.TEST_ENVIRONMENT || 'development',
  DEBUG_MODE: process.env.DEBUG_MODE === 'true' || false,
  HEADLESS: process.env.HEADLESS !== 'false' // Default to headless unless explicitly set to false
};
