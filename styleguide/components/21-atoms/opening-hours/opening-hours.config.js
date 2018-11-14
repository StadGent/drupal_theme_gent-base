'use strict';

module.exports = {
  title: 'Opening hours',
  status: 'ready',
  default: 'Open',
  preview: '@preview-description-list',
  collated: true,
  collator: function (markup, item) {
    return `<!-- Start: @${item.handle} -->\n<dt>${item.name}</dt><dd>${markup}</dd>\n<!-- End: @${item.handle} -->\n`;
  },
  variants: [
    {
      name: 'open',
      context: {
        channels: [
          {
            label: 'Opened today',
            time: {
              opening: '10 a.m.',
              openingDatetime: '10:00',
              closing: '9 p.m.',
              closingDatetime: '21:00'
            }
          }
        ]
      }
    },
    {
      name: 'closed',
      context: {
        modifier: 'closed',
        channels: [
          {
            label: 'Closed today'
          }
        ]
      }
    },
    {
      name: 'multi-channel',
      context: {
        channels: [
          {
            label: 'Opened today',
            time: {
              opening: '10 a.m.',
              openingDatetime: '10:00',
              closing: '12 a.m.',
              closingDatetime: '12:00'
            }
          },
          {
            label: 'Appointments',
            time: {
              opening: '2 p.m.',
              openingDatetime: '14:00',
              closing: '9 p.m.',
              closingDatetime: '21:00'
            }
          }
        ]
      }
    }
  ]
};
