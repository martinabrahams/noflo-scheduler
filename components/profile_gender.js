const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component();
  c.description = 'profile';
  c.icon = 'user-o';
  c.inPorts.add('profile', {
    datatype: 'object',
    description: 'Profile gender'
  });
  c.outPorts.add('male', {
    datatype: 'object'
  });
  c.outPorts.add('female', {
    datatype: 'object'
  });
  c.outPorts.add('other', {
    datatype: 'object'
  });
  c.outPorts.add('unknown', {
    datatype: 'object'
  });

  c.process((input, output) => {
    // Check preconditions on input data
    if (!input.hasData('profile')) {
      return;
    }
    
    // Read packets we need to process
    const profile = input.getData('profile');

    if (profile && profile.gender) {
      switch(profile.gender) {
        case 'male':
          output.send({
            male: profile
          });
          break;
        case 'female':
          output.send({
            female: profile
          });
          break;
        case 'other':
          output.send({
            other: profile
          });
          break;
        default:
          output.send({
            unknown: profile
          });
          break;
      }
    } else {
      // Process data and send output
      output.send({
        unknown: profile
      });
    }   

    // Deactivate
    output.done();
  });
  return c;
};
