/**
 * @description This file contains the functions to manage the contents of a file
 */

import * as fs from "fs";

/**
 *
 * @param {string} folderPath path to the folder where the file is stored
 * @param {string} fileName name of the file
 * @param {string} fileContent content to the added to the file
 * @param {string} encoding text encoding format
 * @returns void
 * @description This function creates/overwrites the file with the specified name in the given folder with the passed contents
 */
export function addNewFile(
  { folderPath,
    fileName,
    fileContent,
    encoding = "utf-8" }
) {
  try {
    console.log("Writing to file...", folderPath + fileName, encoding);
    fs.writeFileSync(folderPath + "/" + fileName, fileContent, encoding);
  } catch (err) {
    console.error("Error writing to file at ", folderPath + fileName);
  }
  return;
}

/**
 *
 * @param {string} filePath path of the file to append
 * @param {string} contentToAppend content to append
 * @returns void
 * @description This function appends the passed contents to an existing file
 */
export function appendFile({ filePath, contentToAppend }) {
  fs.appendFile(filePath, contentToAppend, (err) => {
    if (err) {
      console.error(`Error appending to file: ${err}`);
      return;
    }
    console.log("Content appended to file successfully.");
  });
  return;
}
