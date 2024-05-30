import {
  ClerkProvider,
  SignUp,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import { createBrowserHistory } from "history";
import { createRoot } from "react-dom/client";

const container = document.getElementById("erw-root");
const root = createRoot(container);

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
async function enableMocking() {
  if (!import.meta.env.VITE_MSW) {
    return;
  }
  console.log("Enable msw mocking");
  return import("../e2etests/mswWorker").then(({ worker }) => {
    return worker.start({ onUnhandledRequest: "warn" });
  });
}

const history = createBrowserHistory();

enableMocking().then(() => {
  root.render(
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      routerPush={history.push}
      routerReplace={history.replace}
    >
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignUp />
      </SignedOut>
    </ClerkProvider>,
  );
});
