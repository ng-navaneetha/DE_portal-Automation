/**
 * Test Configuration Manager
 * Utility for managing and switching between different test configurations
 */

import { DYNAMIC_TEST_CONSTANTS, DYNAMIC_HELPERS } from './dynamicTestConstants.js';

export class TestConfigManager {
  constructor(scenario = 'default') {
    this.scenario = scenario;
    this.config = this.loadConfiguration(scenario);
  }

  /**
   * Load configuration based on scenario
   * @param {string} scenario - Test scenario name
   * @returns {object} Configuration object
   */
  loadConfiguration(scenario) {
    const baseConfig = DYNAMIC_HELPERS.getEnvConfig();
    
    const scenarios = {
      // Default configuration
      default: {
        ...baseConfig,
        procedure: DYNAMIC_HELPERS.getProcedureData('CALCULATE_AVERAGE'),
        timeouts: DYNAMIC_TEST_CONSTANTS.CONFIG.TIMEOUTS,
        retries: 1
      },

      // Smoke test configuration - faster, less comprehensive
      smoke: {
        ...baseConfig,
        procedure: DYNAMIC_HELPERS.getProcedureData('CALCULATE_AVERAGE'),
        timeouts: {
          ...DYNAMIC_TEST_CONSTANTS.CONFIG.TIMEOUTS,
          DEFAULT: 15000, // Reduced timeout for smoke tests
          ASSERTION: 3000
        },
        retries: 0,
        headless: true
      },

      // Regression test configuration - comprehensive
      regression: {
        ...baseConfig,
        procedure: DYNAMIC_HELPERS.getProcedureData('CALCULATE_AVERAGE'),
        timeouts: {
          ...DYNAMIC_TEST_CONSTANTS.CONFIG.TIMEOUTS,
          DEFAULT: 45000, // Extended timeout for thorough testing
          PARSE_OPERATION: 60000
        },
        retries: 2,
        screenshot: true
      },

      // Multi-procedure testing
      multiProcedure: {
        ...baseConfig,
        procedures: [
          DYNAMIC_HELPERS.getProcedureData('CALCULATE_AVERAGE'),
          DYNAMIC_HELPERS.getProcedureData('SAMPLE_PROC_2')
        ],
        timeouts: DYNAMIC_TEST_CONSTANTS.CONFIG.TIMEOUTS,
        retries: 1
      },

      // CI/CD configuration
      ci: {
        ...baseConfig,
        timeouts: {
          ...DYNAMIC_TEST_CONSTANTS.CONFIG.TIMEOUTS,
          DEFAULT: 60000 // Extended for CI environment
        },
        retries: 3,
        headless: true,
        screenshot: true,
        video: true
      },

      // Development/Debug configuration
      debug: {
        ...baseConfig,
        timeouts: {
          ...DYNAMIC_TEST_CONSTANTS.CONFIG.TIMEOUTS,
          DEFAULT: 120000 // Very long timeout for debugging
        },
        retries: 0,
        headless: false,
        slowMo: 1000,
        screenshot: true
      }
    };

    return scenarios[scenario] || scenarios.default;
  }

  /**
   * Get current configuration
   */
  getConfig() {
    return this.config;
  }

  /**
   * Get procedure data for current scenario
   */
  getProcedureData() {
    return this.config.procedure || this.config.procedures?.[0];
  }

  /**
   * Get all procedures for multi-procedure scenarios
   */
  getAllProcedures() {
    return this.config.procedures || [this.config.procedure];
  }

  /**
   * Get timeout for specific operation
   */
  getTimeout(operation = 'DEFAULT') {
    return this.config.timeouts[operation.toUpperCase()] || this.config.timeouts.DEFAULT;
  }

  /**
   * Get selectors from dynamic constants
   */
  getSelectors() {
    return DYNAMIC_TEST_CONSTANTS.CODE_CONTEXT.SELECTORS;
  }

  /**
   * Get expected content
   */
  getExpectedContent() {
    return DYNAMIC_TEST_CONSTANTS.CODE_CONTEXT.EXPECTED_CONTENT;
  }

  /**
   * Generate test data for current run
   */
  generateTestData() {
    return DYNAMIC_HELPERS.generateTestData(this.scenario);
  }

  /**
   * Check if feature is enabled for current scenario
   */
  isFeatureEnabled(feature) {
    const features = {
      screenshot: this.config.screenshot || false,
      video: this.config.video || false,
      tracing: this.config.tracing || false,
      slowMo: this.config.slowMo > 0
    };
    
    return features[feature] || false;
  }

  /**
   * Get browser configuration
   */
  getBrowserConfig() {
    return {
      headless: this.config.headless,
      slowMo: this.config.slowMo || 0,
      viewport: DYNAMIC_TEST_CONSTANTS.BROWSER.CHROMIUM.viewport
    };
  }

  /**
   * Create configuration for specific test type
   */
  static createConfig(testType, overrides = {}) {
    const manager = new TestConfigManager(testType);
    return {
      ...manager.getConfig(),
      ...overrides
    };
  }

  /**
   * Get configuration for parallel execution
   */
  static getParallelConfig(workerIndex = 0, totalWorkers = 1) {
    const baseConfig = new TestConfigManager().getConfig();
    
    return {
      ...baseConfig,
      workerIndex,
      totalWorkers,
      // Adjust timeouts for parallel execution
      timeouts: {
        ...baseConfig.timeouts,
        DEFAULT: baseConfig.timeouts.DEFAULT * 1.5 // Account for resource contention
      }
    };
  }
}

// Pre-configured instances for common scenarios
export const SMOKE_CONFIG = new TestConfigManager('smoke');
export const REGRESSION_CONFIG = new TestConfigManager('regression');
export const CI_CONFIG = new TestConfigManager('ci');
export const DEBUG_CONFIG = new TestConfigManager('debug');

// Helper function to get config based on environment
export function getConfigForEnvironment() {
  const env = process.env.NODE_ENV || 'test';
  const isCI = process.env.CI === 'true';
  const isDebug = process.env.DEBUG === 'true';
  
  if (isCI) return CI_CONFIG;
  if (isDebug) return DEBUG_CONFIG;
  if (env === 'production') return REGRESSION_CONFIG;
  
  return new TestConfigManager('default');
}

export default TestConfigManager;
