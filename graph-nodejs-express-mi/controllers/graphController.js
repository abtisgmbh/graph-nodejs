import { getAuthenticatedClient } from '../utils/graphHelper';
import { ManagedIdentityCredential } from "@azure/identity";

// get the name of the app service instance from environment variables
const appServiceName = process.env.WEBSITE_SITE_NAME;

export async function getUsersPage(req, res, next) {

    const managedIdentityCredential = new ManagedIdentityCredential();

    try {
        const tokenResponse = await managedIdentityCredential.getToken("https://graph.microsoft.com/.default");
        const graphClient = getAuthenticatedClient(tokenResponse.token);


        const users = await graphClient
            .api('/users')
            .get();

        res.render('users', { isAuthenticated: req.session.isAuthenticated, users: users, appServiceName: appServiceName });
    } catch (error) {
        next(error);
    }
}