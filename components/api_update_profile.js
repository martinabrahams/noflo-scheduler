const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component();
  c.description = 'take content and return it as block';
  c.icon = 'user-o';

  c.inPorts.add('chatfuel_profile', {
    datatype: 'object',
    description: 'ChatFuel user profile'
  });

  
  c.outPorts.add('result', {
    datatype: 'object',
    description: 'Content'
  });

  
  c.process((input, output) => {

    console.log('init api_update_profile');

    // Check preconditions on input data    
    if (!input.hasData('chatfuel_profile')) {
      return;
    }
    
    var profile = input.getData('chatfuel_profile');
    
    // todo: push to database
    
    // Read packets we need to process
    //const content = input.getData('content');

    var fakeResult = { success: true };
    
    // Process data and send output
    output.send({
      result: fakeResult
    });
  
    // Deactivate
    output.done();
  });
  return c;
};
