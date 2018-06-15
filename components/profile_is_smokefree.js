const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component();
  c.description = 'profile user is smoke free';
  c.icon = 'user-o';
  c.inPorts.add('profile', {
    datatype: 'object',
    description: 'User profile'
  });
  
  c.outPorts.add('yes', {
    datatype: 'object',
    description: 'User profile'
  });
  c.outPorts.add('no', {
    datatype: 'object',
    description: 'User profile'
  });

  c.process((input, output) => {
    // Check preconditions on input data
    if (!input.hasData('profile')) {
      return;
    }
    // Read packets we need to process
    const profileData = input.getData('profile');
    
    if (profileData && profileData.is_smokefree) {
       // Process data and send output
      output.send({
        yes: profileData
      });
    }
    else {
       // Process data and send output
      output.send({
        no: profileData
      });
    }
       
    // Deactivate
    output.done();
  });
  return c;
};
