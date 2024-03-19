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
