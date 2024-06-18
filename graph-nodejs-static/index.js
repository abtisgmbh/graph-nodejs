async function run() {
    console.log("running...");
    const config = {
        auth: {
            clientId: '713f0c36-573b-400e-97c5-254ab0bb6bb6',
            authority: 'https://login.microsoftonline.com/138b16d3-74e4-4699-98ba-fdd9866bedda/',
            redirectUri: 'http://localhost:8080'
        }
    };
    const scopes = ['user.read', 'user.readbasic.all'];

    var client = new msal.PublicClientApplication(config);
    const account = client.getAllAccounts()[0] || (loginResponse = await client.loginPopup({scopes: scopes}).account);
    const options = {
        authProvider: new MSGraphAuthCodeMSALBrowserAuthProvider.AuthCodeMSALBrowserAuthenticationProvider(client, {
            account: account,
            scopes: scopes,
            interactionType: msal.InteractionType.Popup,
        })
    };

    var graphClient = MicrosoftGraph.Client.initWithMiddleware(options);

    let profile = await graphClient.api('/users').get();
    console.dir(profile);
}