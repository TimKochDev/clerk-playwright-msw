/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");

require("dotenv").config({ path: ".env.local" });

// Define the file path
const filePath = path.join(__dirname, ".clerkTestingToken");

async function fetchAndWriteTestingToken() {
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  };
  const data = await fetch("https://api.clerk.com/v1/testing_tokens", options)
    .then((res) => res.json())
    .then((data) => data.token);

  // Write data to the file, creating the file if it doesn't exist, or overwriting it if it does
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("File has been written successfully");
    }
  });
}

fetchAndWriteTestingToken();
