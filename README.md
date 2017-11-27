#A17 Generator

A17 generator is used to quickly generate a boilerplate. 

## Usage

**Install A17 generator globally**

  ```shell
  $ npm install -g git+https://code.area17.com/a17/a17-generator.git
  ```

**Go to the root of your project**

  ```shell
  $ cd project-root
  ```

**Initialize the frontend boilerplate**

  ```shell
  # @ ~/project-root
  $ a17-generator [project-name]
  ```

Now you will have a `frontend` folder, a `package.json` file and all the node modules.

Alone with A17 Generator, A17 Script is installed too which can help you to run all your deve tasks through npm script like this:

  ```shell
  npm run styles
  ```

For more detials, please refer to [A17 Script](https://code.area17.com/a17/a17-script).
(Right now a17-generator is using A17 Script gulp version. Please refer the document of the gulp branch)

## Change Log

**0.1.2**

Add engines property to package.json

**0.1.1**

Updated default git packages link

**0.1.0**

The brith of A17 Generator