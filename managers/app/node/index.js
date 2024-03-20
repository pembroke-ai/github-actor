/**
 * @description This file contains the base functions to manage a node application
 */

import { exec } from "child_process";
import * as fs from "fs";
import { promptToCreateFolder } from "./utils.js";

/**
 *
 * @param {string} folderPath Path to the folder where you want the root of your NodeJS project to be
 * @returns Promise
 */
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

/**
 *
 * @param {string} folderPath Path to the folder where you want the root of your NodeJS project to be
 * @returns
 */
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
 * @param {string[]} packageList array of packages to be installed
 * @returns
 */
export function addNewPackage(folderPath, packageList) {
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
 * @param {string} folderPath
 * @param {string} testScript script to run the tests
 * @returns
 * @description Runs the specified script in the NodeJS project, by default this is intended to run tests
 */
export function runScripts(folderPath, script = "test") {
  return new Promise((resolve, reject) => {
    exec(`cd ${folderPath} && npm run ${script}`, (error, stdout, stderr) => {
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

export function runNodeFile(folderPath, fileName = "index.js") {
  return new Promise((resolve, reject) => {
    exec(`cd ${folderPath} && node ${fileName}`, (error, stdout, stderr) => {
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
