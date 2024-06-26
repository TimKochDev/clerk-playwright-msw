import fs from "fs";

import { defineConfig, devices } from "@playwright/test";

/** Read environment variables from file. https://github.com/motdotla/dotenv */
// require('dotenv').config();

const clerkTestingToken = fs.readFileSync(".clerkTestingToken", "utf-8").trim();

/** See https://playwright.dev/docs/test-configuration. */
export default defineConfig({
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Run tests in files in parallel */
  fullyParallel: true,

  globalSetup: "./e2etests/global.setup.ts",

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  testDir: "./e2etests",

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "http://localhost:4173",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "npx vite --port 4173",
    env: {
      VITE_CLERK_TESTING_TOKEN: clerkTestingToken,
      VITE_MSW: "true",
      VITE_TEST: process.env.testFromGlobalSetup || "nope",
    },
    url: "http://localhost:4173",
  },

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
});
