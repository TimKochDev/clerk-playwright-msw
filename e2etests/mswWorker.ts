import { bypass, http } from "msw";
import { setupWorker } from "msw/browser";

// @ts-ignore
const clerkTestingToken = import.meta.env.VITE_CLERK_TESTING_TOKEN as string;

if (!clerkTestingToken)
  throw new Error("Please provide VITE_CLERK_TESTING_TOKEN in .env");
console.log("Clerk testing token:", clerkTestingToken);

export const worker = setupWorker(
  http.all(/clerk.*\/v1\//, ({ request }) => {
    const url = new URL(request.url);
    url.searchParams.set("__clerk_testing_token", clerkTestingToken);

    // Determine the appropriate duplex setting
    let duplexMode: "half" | undefined;
    if (request.bodyUsed) {
      duplexMode = "half"; // or 'full', depending on your specific use case
    }

    // Creating a new Request with the modified URL and original properties, specifying duplex mode
    // @ts-ignore
    const newRequest = new Request(url, {
      body: request.body,
      bodyUsed: request.bodyUsed,
      cache: request.cache,
      credentials: request.credentials,
      duplex: "half",
      headers: request.headers,
      integrity: request.integrity,
      keepalive: request.keepalive,
      method: request.method,
      mode: request.mode,
      redirect: request.redirect,
      referrer: request.referrer,
      referrerPolicy: request.referrerPolicy,
      signal: request.signal,
    } as RequestInit);

    console.log({
      initialRequest: request,
      newRequest,
    });

    // Fetch with the new Request
    return fetch(bypass(newRequest));
  }),
);
