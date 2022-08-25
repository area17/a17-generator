const libs = {
  styling: [
    {
      name: 'A17 Tailwind Plugins',
      cmd: 'npm install @area17/a17-tailwind-plugins',
      docs: 'http://tailwind-plugins.dev.area17.com/',
    },
    {
      name: 'A17 SCSS Utilities',
      cmd: 'npm install @area17/scss-utilities',
      docs: 'http://scss-utilities.dev.area17.com/',
    }
  ],
  scripting: [
    {
      name: 'A17 Behaviors',
      cmd: 'npm install @area17/a17-behaviors',
      docs: 'https://github.com/area17/a17-behaviors/wiki',
    },
    {
      name: 'Vue',
      cmd: 'npm init vue@latest',
      docs: 'https://vuejs.org/guide/introduction.html',
    }
  ],
  jsHelpers: {
    name: 'A17 JS Helpers',
    cmd: 'npm install @area17/a17-helpers',
    docs: 'https://github.com/area17/js-helpers/wiki',
  },
  patternLibraries: [
    {
      name: 'Storybook',
      cmd: 'npx storybook init',
      docs: 'https://storybook.js.org/docs/react/get-started/introduction'
    },
    {
      name: 'Fractal',
      cmd: ['npm install @frctl/fractal','npm i -g @frctl/fractal'],
      docs: 'https://fractal.build/guide/'
    }
  ],
};

export default libs;
