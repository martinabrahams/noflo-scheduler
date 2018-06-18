const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component();
  c.description = 'Add post to broadcast queue.';
  c.icon = 'user-o';
  
  c.inPorts.add('profile', {
    datatype: 'object',
    description: 'User profile'
  });
  
  c.inPorts.add('content', {
    datatype: 'object',
    description: 'User profile'
  });
  
  c.outPorts.add('success', {
    datatype: 'object',
    description: 'Was it added'
  });

  c.process((input, output) => {
    // Check preconditions on input data
    if (!input.hasData('profile')) {
      return;
    }
    
    // Read packets we need to process
    const profileData = input.getData('profile');
    const contentData = input.getData('content');

    // scheduling content
    console.log('scheduling', profileData, contentData);
    
    output.send({
      success: true
    });

       
    // Deactivate
    output.done();
  });
  return c;
};
