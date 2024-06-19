async function getProfile() {
    console.log("Get Profile");
    const config = {
        auth: {
            clientId: window.CLIENT_ID,
            authority: window.AUTHORITY,
            redirectUri: window.REDIRECT_URI
        }
    };
    const scopes = ['user.read'];

    var client = new msal.PublicClientApplication(config);
    const account = client.getAllAccounts()[0] || (await client.loginPopup({scopes: scopes}).account);
    const options = {
        authProvider: new MSGraphAuthCodeMSALBrowserAuthProvider.AuthCodeMSALBrowserAuthenticationProvider(client, {
            account: account,
            scopes: scopes,
            interactionType: msal.InteractionType.Popup,
        })
    };

    var graphClient = MicrosoftGraph.Client.initWithMiddleware(options);

    let profile = await graphClient.api('/me').get();
    console.dir(profile);
}

async function getUsers() {
    console.log("Get Users");
    const config = {
        auth: {
            clientId: window.CLIENT_ID,
            authority: window.AUTHORITY,
            redirectUri: window.REDIRECT_URI
        }
    };
    const scopes = ['user.read', 'user.readbasic.all'];

    var client = new msal.PublicClientApplication(config);
    const account = client.getAllAccounts()[0] || (await client.loginPopup({scopes: scopes}).account);
    const options = {
        authProvider: new MSGraphAuthCodeMSALBrowserAuthProvider.AuthCodeMSALBrowserAuthenticationProvider(client, {
            account: account,
            scopes: scopes,
            interactionType: msal.InteractionType.Popup,
        })
    };

    var graphClient = MicrosoftGraph.Client.initWithMiddleware(options);

    let users = await graphClient.api('/users').get();
    console.dir(users);
}