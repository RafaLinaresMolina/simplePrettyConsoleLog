# Simple Pretty console.log

Just a simple js file for make the console.log a bit more colorfull and readable on the browser.

## Config
For the moment the config is in the same js file.

- minimumLevelLog: is used to specify how much level of console log you want to show, being right now:
  - [0] Error: Pretty staightforward, something blowed up.
  - [1] Warning: Just tell you that might be something problematic.
  - [2] Data: For visualize objects and stuff.
  - [3] Info: Inform you were is going the flow of the execution.

And the config object is something like that:
```
{
  0: {
    style: "color: red; font-weight: bold;",
    header: "[ " + date.toISOString() + " ] † ERROR: ",
  },
  1: {
    style: "color: orange; font-weight: bold;",
    header: "[ " + date.toISOString() + " ] ▲ WARNING: ",
  },
  2: {
    style: "color: lightgreen; font-weight: bold;",
    header: "[ " + date.toISOString() + " ] ► DATA: ",
  },
  3: {
    style: "color: lightblue; font-weight: bold;",
    header: "[ " + date.toISOString() + " ] • INFO: ",
  },
}
```

## Usage

Just download the js file, place it on your project and import the file in your js files like this:
```
 import logger from '<YOUR PATH>/logger.js';
```
and the way of use it is like this:
```
logger({ type: 0, msg: "No puedes hacer un commit sin un mensaje!" });
logger({ type: 1, msg: "Contraseña no segura!" });
logger({ type: 2, msg: example });
logger({ type: 3, msg: "Entrada en el metodo de loggin" });
```
And this will be the output:

![Final result](final-result.png)

hope this is useful for someone.
