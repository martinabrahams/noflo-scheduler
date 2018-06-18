const noflo = require('noflo');

// scheduler/main
var wrappedGraph = noflo.asCallback('scheduler/main', {
    // Provide the project base directory where NoFlo seeks graphs and components
    baseDir: './'
});

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
});