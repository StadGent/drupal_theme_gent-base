'use strict';

const generateCheckboxes = (uid)=>{
  let result = [];
  for (let i = 100; i--;) {
    result.push({
      label_checkbox: `Checkbox option ${i}`,
      checkbox_name: 'checkboxgroup[]',
      checkbox_id: `checkbox-${i}-${uid}`,
      checkbox_value: i
    });
  }
  return [{items: result}];
};

const generateTeasers = (uid)=>{
  let result = [];
  for (let i = 10; i--;) {
    result.push({
      teaser_uid: `search_teaser_${i}`,
      paragraph_text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquid amet et impedit neque nobis ratione, totam unde? A asperiores, nam nihil quam repellat voluptatibus?',
      title: 'Search result',
      link: '#',
      link_text: 'read more',
      tag: 'some tag'
    });
  }
  return result;
};

module.exports = {
  title: 'Filter page',
  status: 'alpha',
  preview: '@preview-without-padding',
  context: {
    teasers: generateTeasers('filter-page-teaser'),
    checkboxes: generateCheckboxes('checkbox-with-filter')
  }
};
