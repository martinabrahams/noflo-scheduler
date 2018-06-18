const noflo = require('noflo');

exports.getComponent = () => {
  console.log('init main_get_profiles');

  const c = new noflo.Component();
  c.description = '';

  c.icon = 'hand-peace-o';
  c.inPorts.add('in', {
    datatype: 'all',
    description: 'Packet to forward'
  });

  c.outPorts.add('userprofiles', {
    datatype: 'all',
    description: 'User Profiles to process'
  });

  c.process((input, output) => {

    console.log('processing main_get_profiles');

    // Check preconditions on input data
    if (!input.hasData('in')) {
     return;
    }
    // Read packets we need to process
    const datain = input.getData('in');
    
    // mock profile data    
    const data = [{
      name: "Marty",
      gender: "male",
      hasquit: true,
      recent_sos: false,
      is_smokefree: true
    },
    {
      name: "John",
      gender: "male",
      hasquit: false,
      recent_sos: true,
      is_smokefree: false
    },
    {
      name: "Jane",
      gender: "female",
      hasquit: false,
      recent_sos: false,
      is_smokefree: false
    },
    {
      name: "Pete",
      gender: "other",
      hasquit: true,
      recent_sos: true,
      is_smokefree: false
    }];    
    
    
    // Process data and send output
    output.send({
      userprofiles: data
    });

    console.log('sent data', data);
    // Deactivate
    output.done();
  });
  return c;
};
