/**
 * Handles IO with DynamoDB
 * @param {AWS Global object} globalAWS 
 */
var userProfileService = class UserProfileService {

    constructor(globalAWS) {
        if (!globalAWS) {
            throw new Error('No AWS object provided');
        }

        this.AWS = globalAWS;
        
        // Create the DynamoDB service object
        this.ddb = new this.AWS.DynamoDB({apiVersion: '2012-10-08'});
    }

    updateProfile(profile) {

        let uid = profile['chatfuel user id'];
        let firstname = profile['first name'];
        let lastname = profile['last name'];
        let updatedAt = new Date().toISOString();

        var params = {
            TableName: 'ChatFuelUsers',
            Item: {
                'chatFuelId' : {S: uid},
                'firstName' : {S: firstname},
                'lastName' : {S: lastname},
                'updatedAt' : {S: updatedAt}
            }
        };
            
        // Call DynamoDB to add the item to the table
        this.ddb.putItem(params, function(err, data) {
            if (err) {
                console.log("Error", err);
            } else {
                console.log("Success", data);
            }
        });
    }

    getProfiles() {
        return "blah";
    }
};

exports.UserProfileService = userProfileService;