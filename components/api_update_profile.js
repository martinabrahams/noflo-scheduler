const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component();
  c.description = 'take content and return it as block';
  c.icon = 'user-o';

  c.inPorts.add('chatfuel_profile', {
    datatype: 'object',
    description: 'ChatFuel user profile'
  });

  c.inPorts.add('profile_service', {
    datatype: 'object',
    description: 'Service object'
  });

  
  c.outPorts.add('result', {
    datatype: 'object',
    description: 'Content'
  });

  
  c.process((input, output) => {

    // Check preconditions on input data    
    if (!input.hasData('chatfuel_profile')) {
      return;
    }

    if (!input.hasData('profile_service')) {
      return;
    }
    
    var profile = input.getData('chatfuel_profile');
    var profileService = input.getData('profile_service');

    // todo: validate input objects

    console.log('NOFLO received profile', profile);

    // todo: push to database
    var res = profileService.updateProfile(profile);
    

    var fakeResult = { success: true, result: res };
    
    // Process data and send output
    output.send({
      result: fakeResult
    });
  
    // Deactivate
    output.done();
  });
  return c;
};
