const graphHelper = require('../utils/graphHelper');
const { ManagedIdentityCredential } = require("@azure/identity");

// get the name of the app service instance from environment variables
const appServiceName = process.env.WEBSITE_SITE_NAME;

exports.getUsersPage = async (req, res, next) => {

    const managedIdentityCredential = new ManagedIdentityCredential();
    
    try {
        const tokenResponse = await managedIdentityCredential.getToken("https://graph.microsoft.com/.default");
        const graphClient = graphHelper.getAuthenticatedClient(tokenResponse.token);
        

        const users = await graphClient
            .api('/users')
            .get();

        res.render('users', { isAuthenticated: req.session.isAuthenticated, users: users, appServiceName: appServiceName });   
    } catch (error) {
        next(error);
    }
}

exports.getBookingBusinessesPage = async (req, res, next) => {

    const managedIdentityCredential = new ManagedIdentityCredential();
    
    try {
        const tokenResponse = await managedIdentityCredential.getToken("https://graph.microsoft.com/.default");
        const graphClient = graphHelper.getAuthenticatedClient(tokenResponse.token);
        

        const bookingBusinesses = await graphClient
            .api('/solutions/bookingBusinesses')
            .get();

        res.render('bookingBusinesses', { isAuthenticated: req.session.isAuthenticated, bookingBusinesses: bookingBusinesses, appServiceName: appServiceName });   
    } catch (error) {
        next(error);
    }
}