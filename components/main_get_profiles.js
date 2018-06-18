const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component();
  c.description = '';

  c.icon = 'hand-peace-o';
  c.inPorts.add('in', {
    datatype: 'all',
    description: 'Packet to forward'
  });

  c.outPorts.add('userprofiles', {
    datatype: 'array',
    description: 'User Profiles to process'
  });

  c.process((input, output) => {
    
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

    // Deactivate
    output.done();
  });
  return c;
};
