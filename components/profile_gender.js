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
    const data = input.getData('profile');

    if (profile && profile.gender) {
      switch(profile.gender) {
        case 'male':
          output.send({
            male: data
          });
          break;
        case 'female':
          output.send({
            female: data
          });
          break;
        case 'other':
          output.send({
            other: data
          });
          break;
        default:
          output.send({
            unknown: data
          });
          break;
      }
    } else {
      // Process data and send output
      output.send({
        unknown: data
      });
    }   

    // Deactivate
    output.done();
  });
  return c;
};
