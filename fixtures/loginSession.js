import { TEST_CONSTANTS } from '../constants/testData.js';
import fs from 'fs';
import path from 'path';

const AUTH_FILE = 'fixtures/auth.json';

export async function setupLoginSession(browser) {
  // Check if auth file exists and is recent (less than 24 hours old)
  if (fs.existsSync(AUTH_FILE)) {
    const stats = fs.statSync(AUTH_FILE);
    const ageInHours = (Date.now() - stats.mtime.getTime()) / (1000 * 60 * 60);
    
    if (ageInHours < 24) {
      console.log('Using existing auth session...');
      return;
    }
  }

  console.log('Creating new auth session...');
  const context = await browser.newContext();
  const page = await context.newPage();
  
  await page.goto(`${TEST_CONSTANTS.BASE_URL}/login`);
  await page.getByRole('textbox', { name: 'Email Address' }).fill(TEST_CONSTANTS.CREDENTIALS.VALID.email);
  await page.getByRole('textbox', { name: 'Password' }).fill(TEST_CONSTANTS.CREDENTIALS.VALID.password);
  await page.getByRole('button', { name: TEST_CONSTANTS.SELECTORS.SIGN_IN_BUTTON }).click();
  
  // Wait for successful login redirect
  await page.getByRole('heading', { name: 'Data Engineering Dashboard' }).waitFor();

  // Save authentication state
  await context.storageState({ path: AUTH_FILE });
  console.log('Auth session saved successfully');
  
  await context.close();
}

export async function ensureAuthenticated(page) {
  try {
    // First, try to navigate to the base URL
    await page.goto(TEST_CONSTANTS.BASE_URL, { waitUntil: 'networkidle' });
    
    // Check if we're already authenticated by looking for the dashboard
    const isDashboard = await page.getByRole('heading', { name: 'Data Engineering Dashboard' }).isVisible({ timeout: 3000 });
    
    if (isDashboard) {
      console.log('Already authenticated, proceeding with tests...');
      return;
    }
  } catch (error) {
    // If navigation fails or dashboard not found, proceed with login
  }

  // Check if we're on login page or need to login
  const isLoginPage = await page.getByRole('textbox', { name: 'Email Address' }).isVisible({ timeout: 3000 });
  
  if (isLoginPage) {
    console.log('Login page detected, performing authentication...');
    await page.getByRole('textbox', { name: 'Email Address' }).fill(TEST_CONSTANTS.CREDENTIALS.VALID.email);
    await page.getByRole('textbox', { name: 'Password' }).fill(TEST_CONSTANTS.CREDENTIALS.VALID.password);
    await page.getByRole('button', { name: TEST_CONSTANTS.SELECTORS.SIGN_IN_BUTTON }).click();
    
    // Wait for successful login redirect
    await page.getByRole('heading', { name: 'Data Engineering Dashboard' }).waitFor();
    console.log('Login completed successfully');
  } else {
    // Navigate to login page if we're somewhere else
    await page.goto(`${TEST_CONSTANTS.BASE_URL}/login`);
    await page.getByRole('textbox', { name: 'Email Address' }).fill(TEST_CONSTANTS.CREDENTIALS.VALID.email);
    await page.getByRole('textbox', { name: 'Password' }).fill(TEST_CONSTANTS.CREDENTIALS.VALID.password);
    await page.getByRole('button', { name: TEST_CONSTANTS.SELECTORS.SIGN_IN_BUTTON }).click();
    
    // Wait for successful login redirect
    await page.getByRole('heading', { name: 'Data Engineering Dashboard' }).waitFor();
    console.log('Login completed successfully');
  }
}

export async function loginSession(page) {
  await ensureAuthenticated(page);
}
