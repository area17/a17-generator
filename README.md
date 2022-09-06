# A17 Generator

A17 Generator is used to quickly install A17 FE libraries. It can:

* generate a `package.json` for you, 
* initialise Git, 
* set up a Webpack build process, 
* add helpful dot files,
* set up linting,
* set up a pre-commit hook,
* generate a `frontend` folder structure,
* generate a `README.md`,
* install a pattern library,

Plus, it has ASCII art.

## Usage

Firstly, you'll want to `cd` into a project folder if it already exists, or if not:

```shell
$ mkdir project-name && cd project-name
```

And then run `a17-generator`;

```shell
$ npx @area17/a17-generator
```

You may be asked to install `a17-generator`. And then `a17-generator` will then ask you a series of questions and then begin installing and setting up as needed.
