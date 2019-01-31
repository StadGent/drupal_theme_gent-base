'use strict';

module.exports = {
  status: 'alpha',
  context: {
    open: true
  },
  variants: [
    {
      name: 'default',
      context: {
        channels: 1
      }
    },
    {
      name: 'multi-channel',
      context: {
        channels: 2
      }
    },
    {
      name: 'closed',
      context: {
        open: false
      }
    }
  ]
};
