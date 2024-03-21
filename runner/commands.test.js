export const commands = {
  content: {
    steps: [
      {
        function: "initializeNodeProject",
        arguments: {
          folderPath: "./reverseProxyApi",
        },
      },
      {
        function: "installDependencies",
        arguments: {
          folderPath: "./reverseProxyApi",
          packageList: ["express", "http-proxy-middleware"],
        },
      },
      {
        function: "addNewFile",
        arguments: {
          folderPath: "./reverseProxyApi",
          fileName: "index.js",
          fileContent:
            "const express = require('express');\nconst { createProxyMiddleware } = require('http-proxy-middleware');\n\nconst app = express();\n\nconst PORT = process.env.PORT || 3000;\nconst API_SERVICE_URL = 'https://example.com';\n\napp.use('/api', createProxyMiddleware({\n  target: API_SERVICE_URL,\n  changeOrigin: true,\n  pathRewrite: {\n    [`^/api`]: '',\n  },\n}));\n\napp.listen(PORT, () => console.log(`Server is running on port ${PORT}`));\n",
        },
      },
      {
        function: "addNewFile",
        arguments: {
          folderPath: "./reverseProxyApi",
          fileName: "test.js",
          fileContent:
            "const axios = require('axios');\n\naxios.get('http://localhost:3000/api/test')\n  .then(response => {\n    console.log('Test passed:', response.status === 200);\n  })\n  .catch(error => {\n    console.log('Test failed:', error);\n  });\n",
        },
      },
      {
        function: "installDependencies",
        arguments: {
          folderPath: "./reverseProxyApi",
          packageList: ["axios"],
        },
      },
      {
        function: "runScripts",
        arguments: {
          folderPath: "./reverseProxyApi",
          testScript: "node test.js",
        },
      },
    ],
  },
  messages: [
    {
      role: "user",
      content:
        "You are a software developer an AI assistant designed to take in a problem statement and respond with the entire software project for that problem statement as a git repository pushed to github'\n" +
        "\n" +
        "Your decisions must always be made independently without seeking user assistance. Play to your strengths as an LLM and pursue simple strategies with no legal complications.\n" +
        "\n" +
        "GOALS:\n" +
        "Accept a problem statement - Build a reverse proxy API  in NodeJS project with the available functions.\n" +
        "\n" +
        "Constraints:\n" +
        "1. ~40000 word limit for short term memory. Your short term memory is short, so immediately save important information to files.\n" +
        "2. If you are unsure how you previously did something or want to recall past events, thinking about similar events will help you remember.\n" +
        "3. No user assistance\n" +
        '4. Exclusively use the functions listed in double quotes e.g. "initializeGitRepository"\n' +
        "5. Always write test cases and ask for console logs to verify if tests ran fine. Input will be provided as raw console logs.\n" +
        "\n" +
        "Functions:\n" +
        "1. initializeNodeProject(folderPath)\n" +
        "2. installDependencies(folderPath)\n" +
        "3. installDependencies(folderPath, packageList)\n" +
        "4. uninstallDependencies(folderPath, packageList)\n" +
        '5. runScripts(folderPath, testScript = "test")\n' +
        "6. promptToCreateFolder(folderPath)\n" +
        "7. initializeNodeProjectWithPrompt(folderPath)\n" +
        '8. addNewFile(folderPath, fileName, fileContent, encoding = "utf-8")\n' +
        "9. appendFile(filePath, contentToAppend)\n" +
        "\n" +
        "Performance Evaluation:\n" +
        "1. Continuously review and analyze your actions to ensure you are performing to the best of your abilities.\n" +
        "2. Constructively self-criticize your big-picture behavior constantly.\n" +
        "3. Reflect on past decisions and strategies to refine your approach.\n" +
        "4. Every command has a cost, so be smart and efficient. Aim to complete tasks in the least number of steps.\n" +
        "\n" +
        "Also provide the complete file contents with file names for the software files which is to be sent as function arguments.\n" +
        "You should only respond with the step-wise series of function calls and their required function arguments to build the entire NodeJS project. \n" +
        "Ensure the response can be parsed by Javascript JSON.parse function.",
    },
  ],
};
