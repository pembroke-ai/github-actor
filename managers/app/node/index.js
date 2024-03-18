/**
 * @description
 */

import { exec } from "child_process";
import * as fs from "fs";
import inquirer from "inquirer";

function initializeNodeProject(folderPath) {
  return new Promise((resolve, reject) => {
    exec(`cd ${folderPath} && npm init -y`, (error, stdout, stderr) => {
      if (error) {
        reject(`Error initializing Node.js project: ${error}`);
        return;
      }
      if (stderr) {
        reject(`Error initializing Node.js project: ${stderr}`);
        return;
      }
      resolve(stdout.trim());
    });
  });
}

export function installDependencies(folderPath) {
  return new Promise((resolve, reject) => {
    exec(`cd ${folderPath} && npm i`, (error, stdout, stderr) => {
      if (error) {
        reject(`Error initializing Node.js project: ${error}`);
        return;
      }
      if (stderr) {
        reject(`Error initializing Node.js project: ${stderr}`);
        return;
      }
      resolve(stdout.trim());
    });
  });
}

/**
 *
 * @param {string} folderPath path to the folder where the node project is
 * @param {*} packageList array of packages to be installed
 * @returns
 */
export function installDependencies(folderPath, packageList) {
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

export function uninstallDependencies(folderPath, packageList) {
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
 * @param {*} folderPath
 * @returns
 * @description
 */
export function runTests(folderPath, testScript = "test") {
  return new Promise((resolve, reject) => {
    exec(
      `cd ${folderPath} && npm run ${testScript}}`,
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

async function promptToCreateFolder(folderPath) {
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

export async function initializeNodeProjectWithPrompt(folderPath) {
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
