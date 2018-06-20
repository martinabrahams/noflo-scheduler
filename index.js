const noflo = require('noflo');
const qs = require('querystring');
var AWS = require('aws-sdk');

const profileService = require('./services/userProfileService').UserProfileService;

// scheduler/main
var wrappedGraph = noflo.asCallback('scheduler/receive_profile', {
    // Provide the project base directory where NoFlo seeks graphs and components
    baseDir: './'
});

// global AWS config
AWS.config.update({region: 'ap-southeast-2'});

// create profile service, pass AWS god object in
var service = new profileService(AWS);


exports.handler = (event, context, callback) => {

    //console.log('event', event);
    //console.log('context', context);
        
    if (!event || !event.body) {
          const response = {
            statusCode: 403,
            body: JSON.stringify({
              message: `Invalid payload`
            }),
          };

        callback(null, response);
    }    
    
    // Parse chatfuel profile from form encoded POST body
    var bodyProfile = qs.parse(event.body);

    // todo: move this into the noflo component
    // service.updateProfile(bodyProfile);
    
    // Call the wrapped graph. Can be done multiple times
    wrappedGraph({
        // Pass profile into graph
        chatfuel_profile: bodyProfile,
        profile_service: service
    }, function(err, result) {
        // If component sent to its error port, then we'll have err
        if (err) { 
            throw err; 
        }

        // todo: confirm result from noflo is success before passing on success

        var response = {
            "statusCode": 200,
            "headers": {
                "my_header": "my_value"
            },
            "body": JSON.stringify(result),
            "isBase64Encoded": false
        };
        callback(null, response);
    });
};