import inquirer from "inquirer";

export async function promptForRepositoryDetails() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "repoName",
      message: "Enter repository name:",
      validate: function (value) {
        return value.length > 0 ? true : "Please enter a repository name.";
      },
    },
    {
      type: "input",
      name: "originName",
      message: "Enter origin name:",
      validate: function (value) {
        return value.length > 0 ? true : "Please enter a origin name.";
      },
    },
    {
      type: "confirm",
      name: "createPrivate",
      message: "Do you want to create a private repository?",
      default: false,
    },
  ]);

  return answers;
}

export async function promptForCommitMessage() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "commitMessage",
      message: "Enter the commit message:",
      validate: function (value) {
        return value.length > 0 ? true : "Please enter a commit message.";
      },
    },
  ]);

  return answers.commitMessage;
}
