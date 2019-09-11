import React from 'react';
import requireContext from 'require-context.macro';
import { configure, addParameters, addDecorator } from '@storybook/react';
// import { configureActions } from '@storybook/addon-actions';
import { addReadme } from 'storybook-readme';
// import { checkA11y } from 'storybook-addon-a11y';
import Container from './Container';

addParameters({
  options: {
    name: `IBM.com Library React Patterns`,
    url: 'https://github.com/carbon-design-system/ibm-dotcom-library',
  },
});

addDecorator(addReadme);

/*configureActions({
  depth: 100,
  limit: 20,
});*/

addDecorator(story => <Container story={story} />);
// addDecorator(checkA11y);

function loadStories() {
  const req = requireContext('../src/patterns', true, /\.stories\.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
