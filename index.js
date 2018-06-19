const noflo = require('noflo');
const qs = require('querystring');

// scheduler/main
var wrappedGraph = noflo.asCallback('scheduler/main', {
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
    
    
    
    var bodyContent = qs.parse(event.body);
    
    console.log('parsed body content', bodyContent);

    // Call the wrapped graph. Can be done multiple times
    wrappedGraph({
        // Provide data to be sent to inports
        in: true
    }, function(err, result) {
        // If component sent to its error port, then we'll have err
        if (err) { 
            throw err; 
        }
        // Do something with the results
        //console.log('results', result.content);
    
        console.log('complete', result);
        
        var responseBody = {
            "key3": "value3",
            "key2": "value2",
            "key1": "value1"
        };

        var response = {
            "statusCode": 200,
            "headers": {
                "my_header": "my_value"
            },
            "body": JSON.stringify(responseBody),
            "isBase64Encoded": false
        };
        callback(null, response);
    });
};