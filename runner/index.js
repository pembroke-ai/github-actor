import {
    addAndCommitChanges,
    addRemote,
    initializeGitRepository,
    pushChanges,
} from "../managers/repo/index.js";

import {
    initializeNodeProject, installDependencies,
    uninstallDependencies, runScripts, promptToCreateFolder,
    initializeNodeProjectWithPrompt
} from "../managers/app/index.js"
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


async function executeCommandsFromJson(json) {
    for (const step of json.steps) {
        const commandFunction = functionMap[step.function];
        if (typeof commandFunction === "function") {
            await commandFunction(step.arguments);
            console.log(`Function ${step.function} executed successfully.`);
        } else {
            console.error(`Function ${step.function} not found.`);
        }
    }
}

executeCommandsFromJson(commands).then(() => {
    console.log('All commands executed successfully.');
}).catch(err => {
    console.error('Error executing commands:', err);
});


