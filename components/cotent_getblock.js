const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component();
  c.description = 'take content and return it as block';
  c.icon = 'user-o';

  c.inPorts.add('content', {
    datatype: 'object',
    description: 'User profile object'
  });

  
  c.outPorts.add('content', {
    datatype: 'object',
    description: 'User profile'
  });

  
  c.process((input, output) => {

    console.log('init getcontent');

    // Check preconditions on input data
    if (!input.hasData('content')) {
      return;
    }
    // Read packets we need to process
    const content = input.getData('content');

    // Process data and send output
    output.send({
      content: content
    });
  
    // Deactivate
    output.done();
  });
  return c;
};
