import { test as baseTest, expect } from '@playwright/test';
import { setupLoginSession } from './loginSession.js';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load environment variables
const envFile = process.env.ENV_FILE || '.env.test';
dotenv.config({ path: path.resolve(envFile) });

const AUTH_FILE = 'fixtures/auth.json';

// Global setup - run once before all tests
let authSetupDone = false;

// Extend base test to include login fixture
export const test = baseTest.extend({
  // Create authenticated context with conditional login
  storageState: async ({ browser }, use, testInfo) => {
    // Only run setup once globally
    if (!authSetupDone) {
      await setupLoginSession(browser);
      authSetupDone = true;
    }
    
    // Check if auth file exists
    if (fs.existsSync(AUTH_FILE)) {
      await use(AUTH_FILE);
    } else {
      // Fallback: create new auth if file doesn't exist
      await setupLoginSession(browser);
      await use(AUTH_FILE);
    }
  }
});

export { expect };
