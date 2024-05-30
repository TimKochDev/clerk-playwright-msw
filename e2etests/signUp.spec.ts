/* eslint-disable testing-library/prefer-screen-queries */
import { randomUUID } from "crypto";

import { test } from "@playwright/test";

const emailAddress = `e2e-${randomUUID()}+clerk_test@bookltn.com`;

test("New user signs up", async ({ page }) => {
  await page.goto("/");

  // Signup
  await page
    .getByRole("textbox", { name: /first name/i })
    .fill("E2E-FirstName");
  await page.getByRole("textbox", { name: /last name/i }).fill("E2E-LastName");
  await page.getByRole("textbox", { name: /email/i }).fill(emailAddress);
  await page.locator("#password-field").fill("e2epassword");

  await page.getByRole("button", { name: /continue/i }).click();
  await page.getByRole("textbox", { name: /digit 1/i }).fill("424242");
});
