import {
  addAndCommitChanges,
  addRemote,
  initializeGitRepository,
  pushChanges,
} from "../managers/repo/index.js";

import {
  initializeNodeProject,
  installDependencies,
  uninstallDependencies,
  runScripts,
  promptToCreateFolder,
  initializeNodeProjectWithPrompt,
} from "../managers/app/index.js";
import { addNewFile, appendFile } from "../managers/file/index.js";

const functionMap = {
  initializeNodeProject,
  installDependencies,
  uninstallDependencies,
  runScripts,
  promptToCreateFolder,
  initializeNodeProjectWithPrompt,
  addNewFile,
  appendFile,
  addAndCommitChanges,
  addRemote,
  initializeGitRepository,
  pushChanges,
};

import { getCommands } from "./llm.js";
import { commands } from "./commands.test.js";
import { feedbackPrompt } from "./prompt.js";

async function executeCommandsFromJson(json, itrs = 5) {
  if (itrs < 0) {
    console.log(
      "Maximum allowed iterations done - exiting the command execution loop."
    );
  }
  let steps = json.content.steps;
  for (let idx = 0; idx < steps.length; ) {
    console.log("idx: ", idx);
    const step = steps[idx];
    console.log("step: ", step);
    const commandFunction = functionMap[step.function];
    if (typeof commandFunction === "function") {
      try {
        await commandFunction(step.arguments);
      } catch (err) {
        console.log("err: ", err);
        const commands = await getCommands(
          feedbackPrompt(JSON.stringify(step), JSON.stringify(err)),
          [
            ...json.messages,
            {
              role: "assistant",
              content: JSON.stringify(steps),
            },
          ]
        );
        // console.log("commands: ", commands);
        // figure out step number and run
        // executeCommandsFromJson(commands);
        // steps = JSON.parse(commands.content).steps;
        // console.log("new steps: ", steps);
        commands.content = JSON.parse(commands.content);
        console.log("newContent: ", commands);
        await commandFunction(steps[idx].arguments);
        // return await executeCommandsFromJson(commands, --itrs);
      }
      console.log(`Function ${step.function} executed successfully.`);
      idx++;
    } else {
      console.error(`Function ${step.function} not found.`);
    }
  }
}

executeCommandsFromJson(commands)
  .then(() => {
    console.log("All commands executed successfully.");
  })
  .catch((err) => {
    console.error("Error executing commands:", err);
  });
