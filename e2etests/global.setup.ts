import { clerkSetup } from "@clerk/testing/playwright";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function globalSetup() {
  if (!process.env.CLERK_SECRET_KEY) {
    throw new Error(
      "Please provide E2E_CLERK_USER_USERNAME and E2E_CLERK_USER_PASSWORD environment variables.",
    );
  }

  console.log("Global setup");
  await clerkSetup({ debug: true });
}

export default globalSetup;
