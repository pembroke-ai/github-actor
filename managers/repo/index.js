/**
 * @description Contains the functions to manage a github repository
 * @author techsavvyash
 */

import { exec } from "child_process";
import inquirer from "inquirer";
import * as fs from "fs";
import { createGithubRepository } from "./utils/github.js";
import {
  promptForCommitMessage,
  promptForRepositoryDetails,
} from "../utils/input.js";

/**
 *
 * @param {string} folderPath
 * @returns void
 * @description Initialises a github repo at the specified path
 */
export function initializeGitRepository(folderPath) {
  return new Promise((resolve, reject) => {
    fs.access(folderPath, fs.constants.F_OK, (err) => {
      if (err) {
        console.log(`Folder "${folderPath}" doesn't exist.`);
        inquirer
          .prompt([
            {
              type: "list",
              name: "createFolder",
              message: "Do you want to create the folder?",
              choices: ["Yes", "No"],
            },
          ])
          .then((answers) => {
            if (answers.createFolder === "Yes") {
              fs.mkdir(folderPath, { recursive: true }, (err) => {
                if (err) {
                  reject(`Error creating folder: ${err}`);
                } else {
                  exec(`git init ${folderPath}`, (error, stdout, stderr) => {
                    if (error) {
                      reject(`Error initializing Git repository: ${error}`);
                      return;
                    }
                    if (stderr) {
                      reject(`Error initializing Git repository: ${stderr}`);
                      return;
                    }
                    resolve(stdout.trim());
                  });
                }
              });
            } else {
              reject("Operation cancelled by user.");
            }
          });
      } else {
        exec(`git init ${folderPath}`, (error, stdout, stderr) => {
          if (error) {
            reject(`Error initializing Git repository: ${error}`);
            return;
          }
          if (stderr) {
            reject(`Error initializing Git repository: ${stderr}`);
            return;
          }
          resolve(stdout.trim());
        });
      }
    });
  });
}

/**
 *
 * @param {string} remoteName
 * @param {string} remoteUrl
 * @returns void
 * @description add a remote with specified name and url to the github repo path
 */
function addRemoteToGitRepository(remoteName, remoteUrl, folderPath = ".") {
  return new Promise((resolve, reject) => {
    exec(
      `cd ${folderPath} && git remote add ${remoteName} ${remoteUrl}`,
      (error, stdout, stderr) => {
        if (error) {
          reject(`Error adding remote: ${error}`);
          return;
        }
        if (stderr) {
          reject(`Error adding remote: ${stderr}`);
          return;
        }
        resolve(stdout.trim());
      }
    );
  });
}

/**
 * @description add a remote to a github repo by creating one dynamically
 */
export async function addRemote(folderPath) {
  let remoteName;
  let remoteUrl;

  if (!process.argv[2]) {
    const { repoName, originName, createPrivate } =
      await promptForRepositoryDetails();
    remoteUrl = await createGithubRepository(repoName, createPrivate);
    remoteName = originName || "origin"; // Default remote name is origin
  } else {
    remoteName = process.argv[2];
    remoteUrl = process.argv[3];
  }

  try {
    await addRemoteToGitRepository(remoteName, remoteUrl, folderPath);
    console.log(`Remote "${remoteName}" added successfully.`);
    return remoteName;
  } catch (error) {
    console.error(error);
  }
}

function addChanges(folderPath = ".") {
  return new Promise((resolve, reject) => {
    exec(`cd ${folderPath} && git add .`, (error, stdout, stderr) => {
      if (error) {
        reject(`Error adding changes: ${error}`);
        return;
      }
      if (stderr) {
        reject(`Error adding changes: ${stderr}`);
        return;
      }
      resolve(stdout.trim());
    });
  });
}

function commitChanges(commitMessage, folderPath = ".") {
  return new Promise((resolve, reject) => {
    exec(
      `cd ${folderPath} && git commit -m "${commitMessage}"`,
      (error, stdout, stderr) => {
        if (error) {
          reject(`Error committing changes: ${error}`);
          return;
        }
        if (stderr) {
          reject(`Error committing changes: ${stderr}`);
          return;
        }
        resolve(stdout.trim());
      }
    );
  });
}

export async function addAndCommitChanges(folderPath) {
  try {
    await addChanges(folderPath);
    const commitMessage = await promptForCommitMessage();
    await commitChanges(commitMessage, folderPath);
    console.log("Changes added and committed successfully.");
  } catch (error) {
    console.error(error);
  }
}

export function pushChanges(
  remoteName = "origin",
  branchName = "main",
  folderPath = "."
) {
  return new Promise((resolve, reject) => {
    exec(
      `cd ${folderPath} && git push ${remoteName} ${branchName}`,
      (error, stdout, stderr) => {
        if (error) {
          reject(`Error pushing changes: ${error}`);
          return;
        }
        if (stderr) {
          reject(`Error pushing changes: ${stderr}`);
          return;
        }
        resolve(stdout.trim());
      }
    );
  });
}
