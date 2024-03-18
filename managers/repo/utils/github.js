import { Octokit } from "@octokit/rest";
import "dotenv/config";
console.log(
  "process.env.GITHUB_ACCESS_TOKEN: ",
  process.env.GITHUB_ACCESS_TOKEN
);
const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
});
export async function createGithubRepository(repoName, isPrivate) {
  try {
    const response = await octokit.repos.createForAuthenticatedUser({
      name: repoName,
      private: isPrivate,
    });
    return response.data.html_url;
  } catch (error) {
    throw new Error(`Error creating GitHub repository: ${error.message}`);
  }
}
