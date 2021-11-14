// Resources: https://daily.dev/blog/creating-a-killer-github-profile-readme-part-2

require("isomorphic-unfetch");
const { promises: fs } = require("fs");
const path = require("path");

async function main() {
  //read the file
  const readmeTemplate = (
    await fs.readFile(path.join(process.cwd(), "./README.template.md"))
  ).toString("utf-8");

  // Make call to lotr api
  const lotr_quote = await (
    await fetch("https://lotr-random-quote-api.herokuapp.com/api/quote")
  ).json();

  //debug
  console.log(lotr_quote);

  //replace the placeholder with the actual data
  const readme = readmeTemplate
    .replace("{lotr_quote}", lotr_quote.quote)
    .replace("{lotr_author}", `- ${lotr_quote.author}`);

  //write the readme file with the new data
  await fs.writeFile("README.md", readme);
}

main();
