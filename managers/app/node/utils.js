import inquirer from "inquirer";

export async function promptToCreateFolder(folderPath) {
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

export function parseErrorMessage(message) {
  // Define the regex pattern to find an error message
  const errorPattern = /Test failed: (AxiosError: .*)/;

  // Search for the pattern in the message
  const match = message.match(errorPattern);

  // Check if an error was found and extract it
  if (match) {
    return {
      isError: true,
      errorMessage: match[1] // Extracted error message
    };
  } else {
    return {
      isError: false,
      errorMessage: "" // No error found
    };
  }
}