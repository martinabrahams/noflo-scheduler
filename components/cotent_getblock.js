const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component();
  c.description = 'take content and return it as block';
  c.icon = 'user-o';

  c.inPorts.add('profile', {
    datatype: 'object',
    description: 'User profile object'
  });

  
  c.inPorts.add('content', {
    datatype: 'object',
    description: 'User profile object'
  });


  c.outPorts.add('profile', {
    datatype: 'object',
    description: 'User profile'
  });

  
  c.outPorts.add('content', {
    datatype: 'object',
    description: 'Content'
  });

  
  c.process((input, output) => {

    console.log('init getcontent');

    // Check preconditions on input data
    if (!input.hasData('content')) {
      return;
    }
    
    if (!input.hasData('profile')) {
      return;
    }
    
    var profile = input.getData('profile');
    
    // Read packets we need to process
    const content = input.getData('content');

    // Process data and send output
    output.send({
      profile: profile,
      content: content
    });
  
    // Deactivate
    output.done();
  });
  return c;
};
