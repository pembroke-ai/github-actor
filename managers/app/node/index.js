/**
 * @description This file contains the base functions to manage a node application
 */

import { exec } from "child_process";
import * as fs from "fs";
import inquirer from "inquirer";
import { parseErrorMessage } from "./utils.js";

/**
 *
 * @param {string} folderPath Path to the folder where you want the root of your NodeJS project to be
 * @returns Promise
 */
export function initializeNodeProject({ folderPath }) {
  return new Promise((resolve, reject) => {
    exec(
      `mkdir -p ${folderPath} && cd ${folderPath} && npm init -y && npm i`,
      (error, stdout, stderr) => {
        if (error) {
          reject(`Error initializing Node.js project: ${error}`);
          return;
        }
        if (stderr) {
          reject(`Error initializing Node.js project: ${stderr}`);
          return;
        }
        resolve(stdout.trim());
      }
    );
  });
}

// /**
//  *
//  * @param {string} folderPath Path to the folder where you want the root of your NodeJS project to be
//  * @returns
//  */
// function installDependencies(folderPath) {
//   return new Promise((resolve, reject) => {
//     exec(`cd ${folderPath} && npm i`, (error, stdout, stderr) => {
//       if (error) {
//         reject(`Error initializing Node.js project: ${error}`);
//         return;
//       }
//       if (stderr) {
//         reject(`Error initializing Node.js project: ${stderr}`);
//         return;
//       }
//       resolve(stdout.trim());
//     });
//   });
// }

/**
 *
 * @param {string} folderPath path to the folder where the node project is
 * @param {string[]} packageList array of packages to be installed
 * @returns
 */
export function installDependencies({ folderPath, packageList }) {
  return new Promise((resolve, reject) => {
    exec(
      `cd ${folderPath} && npm i ${packageList.join(" ")}`,
      (error, stdout, stderr) => {
        if (error) {
          reject(`Error initializing Node.js project: ${error}`);
          return;
        }
        if (stderr) {
          reject(`Error initializing Node.js project: ${stderr}`);
          return;
        }
        resolve(stdout.trim());
      }
    );
  });
}

/**
 *
 * @param {string} folderPath path to the folder where the node project is
 * @param {string[]} packageList array of packages to be uninstalled
 * @returns
 */
export function uninstallDependencies({ folderPath, packageList }) {
  return new Promise((resolve, reject) => {
    exec(
      `cd ${folderPath} && npm remove ${packageList.join(" ")}`,
      (error, stdout, stderr) => {
        if (error) {
          reject(`Error initializing Node.js project: ${error}`);
          return;
        }
        if (stderr) {
          reject(`Error initializing Node.js project: ${stderr}`);
          return;
        }
        resolve(stdout.trim());
      }
    );
  });
}

/**
 *
 * @param {string} folderPath
 * @param {string} testScript script to run the tests
 * @returns
 * @description Runs the specified script in the NodeJS project, by default this is intended to run tests
 */
export function runScripts({ folderPath, testScript = "test" }) {
  return new Promise((resolve, reject) => {
    let script = `npm run ${testScript}`;
    if (testScript.includes("node")) {
      script = testScript;
    }

    console.log("Running script: ", script);

    exec(`cd ${folderPath} && ${script}`, (error, stdout, stderr) => {
      console.log(`stdout: ${stdout}`);
      if (error) {
        console.error(`exec error: ${error}`);
        reject(`Error running script: ${error}`);
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        // Decide whether to reject based on your criteria for stderr
        reject(`Error running script: ${stderr}`);
      }
      if (parseErrorMessage(stdout.trim()).isError) {
        reject(
          `Error running script: ${
            parseErrorMessage(stdout.trim()).errorMessage
          }`
        );
      }
      resolve(stdout.trim());
    });
  });
}

export async function promptToCreateFolder({ folderPath }) {
  const answers = await inquirer.prompt([
    {
      type: "confirm",
      name: "createFolder",
      message: `Folder "${folderPath}" does not exist. Do you want to create it?`,
      default: true,
    },
  ]);

  return answers.createFolder;
}

export async function initializeNodeProjectWithPrompt({ folderPath }) {
  try {
    const folderExists = fs.existsSync(folderPath);
    if (!folderExists) {
      const shouldCreateFolder = await promptToCreateFolder(folderPath);
      if (!shouldCreateFolder) {
        console.log("Operation cancelled by user.");
        return;
      }
      fs.mkdirSync(folderPath, { recursive: true });
    }
    await initializeNodeProject(folderPath);
    console.log("Node.js project initialized successfully.");
  } catch (error) {
    console.error(error);
  }
}
