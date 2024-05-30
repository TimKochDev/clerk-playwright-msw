_Disclaimer: This is a minimal example repo to demonstrate how I use Clerk with Playwright and msw after struggling for hours to make it work.
It's by all means not a production-ready setup.
If you think my setup looks weird, it's because it is.
But rest assured, I tried dozens of other setups._

Clerk's playwright integration package (@clerk/testing) doesn't seem to work alongside msw (mock service worker).
I assume this is because mocking http requests with msw and playwright's own request interception are conflicting with each other.

To make this example repo work:

- set up a Clerk project and get the API key
- add .env.local file containing VITE_CLERK_PUBLISHABLE_KEY, CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY
- run `npm install`
- run `npm run test:e2e` to run a playwright test or `npm start` to start vite in your browser
