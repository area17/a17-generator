const generateReadme = (opts, process, appName) => {
  const nodeVersion = process.versions.node;
  let readme = `# ${ appName }`;

  if (opts.installing.webpack) {
    readme += `\n
## Front End Setup

Requires Node v${ nodeVersion }

* Run \`npm install\` from the project root
* Compile assets using \`npm run build\`
* For local development with file watching, use \`npm run watch\`
* For local development with live reloading, use \`npm run dev\` and open \`http://localhost:3000/\` in a browser
* For production, run \`npm run prod\` for a minified output`;

    if (opts.installing.scssUtilities) {
      readme += `\n
## CSS

Styling is done using Tailwind CSS. See \`tailwind.config.js\` for the Tailwind configuration and \`frontend.config.json\` for front end token configuration.

* A17 Tailwind Plugins documentation: http://tailwind-plugins.dev.area17.com/`;
    }

    if (opts.installing.tailwindPlugins) {
      readme += `\n
## CSS

Styling is done using SCSS and A17 SCSS Utilities. See \`frontend.config.json\` for front end token configuration.

* A17 SCSS Utilities documentation: http://scss-utilities.dev.area17.com/`;
    }

    if (opts.installing.behaviors) {
      readme += `\n
## JavaScript

JavaScript uses A17 Behaviors and vanilla JavaScript.

* A17 Behaviors documentation: https://github.com/area17/a17-behaviors/wiki`;

      if (opts.jsHelpers) {
        readme += `
* A17 JS Helpers documentation: https://github.com/area17/js-helpers/wiki`;
      }
    }
  }

  return readme;
}

export default generateReadme;
