const generateReadme = (opts, process, appName) => {
  const nodeVersion = process.versions.node;
  let readme = `# ${ appName }`;
  const folderStructurePrefix = opts.installing.laravel ? 'resources/' : '';

  if (opts.installing.webpack) {
    readme += `\n
## Front End Setup

Requires Node v${ nodeVersion }

* Run \`npm install\` from the project root
* Compile assets using \`npm run build\`
* For local development with file watching, use \`npm run watch\`
* For local development with live reloading, use \`npm run dev\` and open \`http://localhost:3000/\` in a browser
* For production, run \`npm run prod\` for a minified output`;
  }

  if (opts.installing.vite) {
    readme += `\n
## Front End Setup

Requires Node v${ nodeVersion }

* Run \`npm install\` from the project root
* For local development with live reloading, use \`npm run dev\`
* For production, run \`npm run build\` for a minified output`;

    if (opts.installing.scssUtilities) {
      readme += `\n* To generate tokens SCSS file, run \`npm run tokens\``;
    }
  }

  if (opts.installing.vite || opts.installing.webpack) {
    readme += '\n\n### Assets';
    readme += `\nAny assets stored in \`${ folderStructurePrefix }frontend/fonts\` and \`${ folderStructurePrefix }frontend/img\` will be copied to your assets folder.`;
    if (opts.installing.vite) {
      readme += `  See \`vite.config.js\` for details.`;
    }
    if (opts.installing.webpack) {
      readme += `  See \`webpack.config.js\` for details.`;
    }
  }

  if (opts.lintFiles && opts.installing.linters) {
    readme += `\n
## Linting

* \`npm run lint\` runs linters on changed files only
* \`npm run lint:staged\` runs linters on staged files only
* \`npm run lint:all\` runs linters on all files

* \`npm run eslint\` runs eslint on changed files only
* \`npm run prettier\` runs prettier on changed files only
* \`npm run stylelint\` runs stylelint on changed files only

* \`npm run eslint:all\` runs eslint on all files
* \`npm run prettier:all\` runs prettier on all files
* \`npm run stylelint:all\` runs stylelint on all files`;
  }

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

  if (opts.installing.svgsprite) {
          readme += `\n
## ICONS

Icons are displayed using an SVG sprite. Place your icons inside: \`${ folderStructurePrefix }frontend/svg\`. You may want to replace \`fill\` or \`stroke\` colours with \`currentColor\` so they can be styled by CSS.

You need to include the sprite in your HTML - in the \`<head>\`:

\`\`\`html
<script type="module">
(function(d) {
  var db = d.body;
  // insert sprite SVG
  fetch('/assets/sprite.svg').then(function (response) {
    return response.text();
  }).then(function (html) {
    const s = d.createElement('div');
    s.innerHTML = html;
    db.insertBefore(s.firstElementChild, db.childNodes[0]);
  });
  window.A17 = {};
})(document);
</script>
\`\`\`

And then in your HTML document, to display an icon:

\`\`\`html
<svg aria-hidden="true" class="sprite-test">
<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#sprite-test"></use>
</svg>
\`\`\`

Note the class \`sprite-test\` - the CSS contains matching classes to give the icon its correct dimentions.

Alternatively, in your HTML you can:

\`\`\`html
<svg aria-hidden="true" class="sprite-test">
<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/sprite.svg#sprite-test"></use>
</svg>
\`\`\`

Without the requirement to inject the \`sprite.svg\` into your doucment.`;
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

  return readme;
}

export default generateReadme;
