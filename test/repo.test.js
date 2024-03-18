import {
  addAndCommitChanges,
  addRemote,
  initializeGitRepository,
  pushChanges,
} from "../managers/repo/index.js";
import * as fs from "fs";

const folderPath = "./scratchpad";

(async () => {
  // test initialising a github repo
  await initializeGitRepository(folderPath)
    .then((result) => {
      console.log(result); // Output success message or relevant information
    })
    .catch((error) => {
      console.error(error); // Output error message if initialization fails
    });

  // test adding a remote
  const remoteName = await addRemote(folderPath);

  // create a new file
  fs.writeFileSync(folderPath + "/test.txt", "hey, there", "utf-8");
  // testing to commit changes (addition of this new file)
  await addAndCommitChanges(folderPath);
  pushChanges(remoteName, "main", folderPath)
    .then((result) => {
      console.log(result); // Output success message or relevant information
    })
    .catch((error) => {
      console.error(error); // Output error message if push fails
    });
})();
