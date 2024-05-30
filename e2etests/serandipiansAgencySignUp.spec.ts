/* eslint-disable testing-library/prefer-screen-queries */
import { randomUUID } from "crypto";

import { test } from "@playwright/test";

const emailAddress = `e2e-serandipians-${randomUUID()}+clerk_test@bookltn.com`;

test("New user signs up, registers agency, requests invitation to Serandipians", async ({
  page,
}) => {
  await page.goto("/signup/serandipians");

  // Signup
  await page
    .getByRole("textbox", { name: /first name/i })
    .fill("E2E-FirstName");
  await page.getByRole("textbox", { name: /last name/i }).fill("E2E-LastName");
  await page.getByRole("textbox", { name: /email/i }).fill(emailAddress);
  await page.locator("#password-field").fill("e2epassword");

  await page.getByRole("button", { name: /continue/i }).click();
  await page.getByRole("textbox", { name: /digit 1/i }).fill("424242");

  // Register travel agency
  // await page
  //   .getByRole("textbox", { name: /travel agency/i })
  //   .fill("E2E-TravelAgencyName");
});
