export const commands = {
    "steps": [
        {
            "function": "initializeNodeProject",
            "arguments": {
                "folderPath": "./reverseProxyApi"
            }
        },
        {
            "function": "installDependencies",
            "arguments": {
                "folderPath": "./reverseProxyApi",
                "packageList": ["express", "http-proxy-middleware"]
            }
        },
        {
            "function": "addNewFile",
            "arguments": {
                "folderPath": "./reverseProxyApi",
                "fileName": "index.js",
                "fileContent": "const express = require('express');\nconst { createProxyMiddleware } = require('http-proxy-middleware');\n\nconst app = express();\n\nconst PORT = process.env.PORT || 3000;\nconst API_SERVICE_URL = 'https://example.com';\n\napp.use('/api', createProxyMiddleware({\n  target: API_SERVICE_URL,\n  changeOrigin: true,\n  pathRewrite: {\n    [`^/api`]: '',\n  },\n}));\n\napp.listen(PORT, () => console.log(`Server is running on port ${PORT}`));\n"
            }
        },
        {
            "function": "addNewFile",
            "arguments": {
                "folderPath": "./reverseProxyApi",
                "fileName": "test.js",
                "fileContent": "const axios = require('axios');\n\naxios.get('http://localhost:3000/api/test')\n  .then(response => {\n    console.log('Test passed:', response.status === 200);\n  })\n  .catch(error => {\n    console.log('Test failed:', error);\n  });\n"
            }
        },
        {
            "function": "installDependencies",
            "arguments": {
                "folderPath": "./reverseProxyApi",
                "packageList": ["axios"]
            }
        },
        {
            "function": "runScripts",
            "arguments": {
                "folderPath": "./reverseProxyApi",
                "testScript": "node test.js"
            }
        }
    ]
}