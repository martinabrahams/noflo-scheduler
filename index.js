const noflo = require('noflo');
const qs = require('querystring');

// scheduler/main
var wrappedGraph = noflo.asCallback('scheduler/receive_profile', {
    // Provide the project base directory where NoFlo seeks graphs and components
    baseDir: './'
});


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
    
    // Call the wrapped graph. Can be done multiple times
    wrappedGraph({
        // Pass profile into graph
        chatfuel_profile: bodyProfile
    }, function(err, result) {
        // If component sent to its error port, then we'll have err
        if (err) { 
            throw err; 
        }
        // Do something with the results
        //console.log('results', result.content);
    
        //console.log('complete', result);
        
        // var responseBody = {
        //     "key3": "value3",
        //     "key2": "value2",
        //     "key1": "value1"
        // };

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