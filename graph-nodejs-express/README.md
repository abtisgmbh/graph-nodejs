# Confidential Client Authentication with Node Express

This demonstrates user authentication to a confidential client and a simple call to the Graph API using only MSAL.

## First steps

- Create an app registration in your test tenant
- Rename the `.env.template` file to `.env`
- Add the required information to `.env`

## Testing the app in a devcontainer

- Make sure docker is installed and running on your system
- In vscode install the `ms-vscode-remote.remote-containers` extension
- Choose "Reopen in Dev Container"
- Open a bash or zsh in the dev container
- Run the following commands

```bash
cd /workspaces/graph-nodejs/graph-nodejs-express
npm install
npm start
```

- Open a browser at http://localhost:3000

- Click "Sign In" and sign in with a user from the tenant where you have created your app registration.
- Complete the Login Prompt
- Click on "Acquire a token to call the Microsoft Graph API", to retrieve profile information
