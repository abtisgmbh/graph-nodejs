# Public Client Authentication with SPA

This demonstrates user authentication to a public client and a simple call to the Graph API using the JavaScript SDK for Microsoft Graph.

It is based on the following video, which also provides a walkthrough of the code: [Getting Started with the Microsoft Graph SDK from your JavaScript apps](https://youtu.be/rkDa9TbJDGc?si=AEIws3AX2cwyn7t6).

## First steps

- Create an app registration in your test tenant
- Rename the `.env.js.template` file to `.env.js`
- Add the required information to `.env.js`

## Testing the app in a devcontainer

- Make sure docker is installed and running on your system
- In vscode install the `ms-vscode-remote.remote-containers` extension
- Choose "Reopen in Dev Container"
- Open a bash or zsh in the dev container
- Run the following commands

```bash
cd /workspaces/graph-nodejs/graph-nodejs-static
npm install
npm start
```

- Open a browser at http://localhost:3000
- Press F12 to open the "Developer Tools" in your browser
- Switch to the tab "Console"

- Hit the button "Get Profile" and sign in with a user from the tenant where you have created your app registration.
- Complete the Login Prompt