const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component();
  c.description = 'content smoke free';
  c.icon = 'user-o';

  c.inPorts.add('profile', {
    datatype: 'object',
    description: 'User profile'
  });
  
  c.outPorts.add('content', {
    datatype: 'object',
    description: 'Content'
  });

  c.process((input, output) => {
    // Check preconditions on input data
    if (!input.hasData('profile')) {
      return;
    }

    var content = {
        blockName: "block_smokefree",
        something: true
    };

    output.send({
        content: content
    });

    // Deactivate
    output.done();
  });
  return c;
};
