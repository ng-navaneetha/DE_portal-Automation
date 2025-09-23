/**
 * Dynamic Test Constants Configuration
 * This file provides configurable constants that can be dynamically adjusted
 * based on environment variables, test scenarios, or runtime parameters
 */

// Environment Configuration
const ENV = process.env.NODE_ENV || 'test';
const TEST_ENV = process.env.TEST_ENV || 'dev';

// Base Configuration
export const DYNAMIC_CONFIG = {
  // Environment Settings
  ENVIRONMENT: {
    NODE_ENV: ENV,
    TEST_ENV: TEST_ENV,
    IS_CI: process.env.CI === 'true',
    DEBUG_MODE: process.env.DEBUG === 'true',
    HEADLESS: process.env.HEADLESS !== 'false'
  },

  // Application URLs
  BASE_URLS: {
    dev: 'https://de-hub.ngenux.app',
    staging: 'https://staging-de-hub.ngenux.app',
    prod: 'https://prod-de-hub.ngenux.app',
    local: 'http://localhost:3000'
  },

  // Timeout Configuration
  TIMEOUTS: {
    DEFAULT: parseInt(process.env.DEFAULT_TIMEOUT) || 30000,
    NAVIGATION: parseInt(process.env.NAVIGATION_TIMEOUT) || 10000,
    ASSERTION: parseInt(process.env.ASSERTION_TIMEOUT) || 5000,
    API: parseInt(process.env.API_TIMEOUT) || 15000,
    PARSE_OPERATION: parseInt(process.env.PARSE_TIMEOUT) || 45000
  },

  // User Credentials (Environment-specific)
  CREDENTIALS: {
    ADMIN: {
      email: process.env.ADMIN_EMAIL || 'admin@ngenux.com',
      password: process.env.ADMIN_PASSWORD || 'Admin@123'
    },
    USER: {
      email: process.env.USER_EMAIL || 'abcd@ngenux.com',
      password: process.env.USER_PASSWORD || 'Admin@123'
    },
    READONLY: {
      email: process.env.READONLY_EMAIL || 'readonly@ngenux.com',
      password: process.env.READONLY_PASSWORD || 'ReadOnly@123'
    }
  }
};

// Code Context Configuration
export const CODE_CONTEXT_CONFIG = {
  // UI Elements
  SELECTORS: {
    TOOLS_BUTTON: '(Tools)ⁿ',
    CODE_CONTEXT_LINK: 'Code Context',
    PARSE_BUTTON: 'Parse',
    START_NEW_BUTTON: 'Start New Conversion',
    BACK_TO_LIST_BUTTON: 'Back to List'
  },

  // Tab Configuration
  TABS: {
    BROWSE_PROCEDURES: 'Browse Procedures',
    BROWSE_TABLES: 'Browse Tables',
    DIRECT_INPUT: 'Direct Input',
    BUSINESS_DESCRIPTION: 'Business Description'
  },

  // Test Data Sets (Multiple scenarios)
  TEST_PROCEDURES: {
    CALCULATE_AVERAGE: {
      name: process.env.PROCEDURE_NAME || 'calculate_average',
      database: process.env.DATABASE_NAME || 'ecommerce_db',
      schema: process.env.SCHEMA_NAME || 'shopify',
      fullyQualifiedName: process.env.FULLY_QUALIFIED_NAME || 'sample_data.ecommerce_db.shopify.calculate_average',
      description: 'Test procedure for calculating averages'
    },
    SAMPLE_PROC_2: {
      name: process.env.PROCEDURE_NAME_2 || 'sample_procedure',
      database: process.env.DATABASE_NAME_2 || 'test_db',
      schema: process.env.SCHEMA_NAME_2 || 'public',
      fullyQualifiedName: process.env.FULLY_QUALIFIED_NAME_2 || 'test_data.test_db.public.sample_procedure',
      description: 'Secondary test procedure'
    }
  },

  // Expected Content
  EXPECTED_CONTENT: {
    HEADINGS: {
      DASHBOARD: 'Data Engineering Dashboard',
      PROCEDURE_METADATA: 'Procedure Metadata:',
      SQL_CODE: 'SQL Code:',
      CONVERSION_RESULTS: 'Conversion Results',
      STORED_PROCEDURES_USED: 'Stored Procedures Used'
    },
    STATUS: {
      SUCCESS: 'Success',
      FAILED: 'Failed',
      PENDING: 'Pending',
      IN_PROGRESS: 'In Progress'
    },
    BUSINESS_DESCRIPTION: {
      DESCRIPTION: 'Description',
      PSEUDO_CODE: 'Pseudo Code',
      TABLES_USED: 'Tables Used',
      LINE_COUNT: 'Line Count',
      TOKEN_COUNT: 'Token Count'
    }
  },

  // SQL Patterns
  SQL_PATTERNS: {
    CREATE_PROCEDURE: 'CREATE OR REPLACE PROCEDURE',
    CREATE_FUNCTION: 'CREATE OR REPLACE FUNCTION',
    SELECT_STATEMENT: 'SELECT',
    INSERT_STATEMENT: 'INSERT',
    UPDATE_STATEMENT: 'UPDATE',
    DELETE_STATEMENT: 'DELETE'
  }
};

// Test Scenarios Configuration
export const TEST_SCENARIOS = {
  SMOKE_TESTS: {
    enabled: process.env.RUN_SMOKE_TESTS !== 'false',
    tags: ['@smoke'],
    timeout: DYNAMIC_CONFIG.TIMEOUTS.DEFAULT
  },
  REGRESSION_TESTS: {
    enabled: process.env.RUN_REGRESSION_TESTS !== 'false',
    tags: ['@regression'],
    timeout: DYNAMIC_CONFIG.TIMEOUTS.DEFAULT * 2
  },
  E2E_TESTS: {
    enabled: process.env.RUN_E2E_TESTS !== 'false',
    tags: ['@e2e', '@smoke'],
    timeout: DYNAMIC_CONFIG.TIMEOUTS.DEFAULT * 3
  }
};

// Browser Configuration
export const BROWSER_CONFIG = {
  CHROMIUM: {
    headless: DYNAMIC_CONFIG.ENVIRONMENT.HEADLESS,
    slowMo: parseInt(process.env.SLOW_MO) || 0,
    viewport: {
      width: parseInt(process.env.VIEWPORT_WIDTH) || 1920,
      height: parseInt(process.env.VIEWPORT_HEIGHT) || 1080
    }
  },
  FIREFOX: {
    headless: DYNAMIC_CONFIG.ENVIRONMENT.HEADLESS,
    slowMo: parseInt(process.env.SLOW_MO) || 0
  },
  WEBKIT: {
    headless: DYNAMIC_CONFIG.ENVIRONMENT.HEADLESS,
    slowMo: parseInt(process.env.SLOW_MO) || 0
  }
};

// Dynamic Helper Functions
export const DYNAMIC_HELPERS = {
  // Get base URL based on environment
  getBaseUrl: () => {
    const envUrl = process.env.BASE_URL;
    if (envUrl) return envUrl;
    
    return DYNAMIC_CONFIG.BASE_URLS[TEST_ENV] || DYNAMIC_CONFIG.BASE_URLS.dev;
  },

  // Get credentials based on user type
  getCredentials: (userType = 'USER') => {
    return DYNAMIC_CONFIG.CREDENTIALS[userType.toUpperCase()] || DYNAMIC_CONFIG.CREDENTIALS.USER;
  },

  // Get procedure data based on scenario
  getProcedureData: (procedureName = 'CALCULATE_AVERAGE') => {
    return CODE_CONTEXT_CONFIG.TEST_PROCEDURES[procedureName.toUpperCase()] || 
           CODE_CONTEXT_CONFIG.TEST_PROCEDURES.CALCULATE_AVERAGE;
  },

  // Get timeout based on operation
  getTimeout: (operation = 'DEFAULT') => {
    return DYNAMIC_CONFIG.TIMEOUTS[operation.toUpperCase()] || DYNAMIC_CONFIG.TIMEOUTS.DEFAULT;
  },

  // Generate dynamic test data
  generateTestData: (scenario) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    return {
      timestamp,
      testId: `test-${scenario}-${timestamp}`,
      sessionId: `session-${Date.now()}`,
      runId: process.env.BUILD_NUMBER || `local-${timestamp}`
    };
  },

  // Environment-specific configurations
  getEnvConfig: () => {
    return {
      baseUrl: DYNAMIC_HELPERS.getBaseUrl(),
      credentials: DYNAMIC_HELPERS.getCredentials(),
      timeouts: DYNAMIC_CONFIG.TIMEOUTS,
      isCI: DYNAMIC_CONFIG.ENVIRONMENT.IS_CI,
      debugMode: DYNAMIC_CONFIG.ENVIRONMENT.DEBUG_MODE
    };
  }
};

// Export all configurations as a single object for easy import
export const DYNAMIC_TEST_CONSTANTS = {
  CONFIG: DYNAMIC_CONFIG,
  CODE_CONTEXT: CODE_CONTEXT_CONFIG,
  SCENARIOS: TEST_SCENARIOS,
  BROWSER: BROWSER_CONFIG,
  HELPERS: DYNAMIC_HELPERS
};

// Legacy compatibility - export individual components
export default DYNAMIC_TEST_CONSTANTS;
