// constants for default values
const date = new Date();
// TODO Export it to a config file
let minimumLevelLog = 3;
const stylePrefix = "%c";

/*
  JSON object with the basic config for the logs
  style: css code for the message to use
  header: first part of the message, it contains:
    -> [ DATE (ISO format) ] TYPE: 
*/
// TODO Export it to a config file
const errorTypes = {
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
};

/**
 * Function that return a true if is a string and false if 
 * is a well formated JSON object
 * @param {json | string} str 
 * @returns boolean
 */
function isString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

/**
 * Function that will return a formated json or a string.
 * used for pretify JSON objects on the terminal.
 * @param {json | string} json 
 * @returns string
 */
function syntaxHighlight(json) {
  if (!isString(json)) {
    return JSON.stringify(json, undefined, 2);
  } else {
    return json;
  }
}

/**
 * Method for print with style the message to the terminal.
 * @param {type, msg} object 
 */
export default function logger(object) {

  // We will ignore the logs if they do not exist and if they are outside the level of interest
  if (errorTypes[object.type] && object.type <= minimumLevelLog) {
    const formatedMessage =
      stylePrefix +
      errorTypes[object.type].header +
      syntaxHighlight(object.msg);
    console.log(formatedMessage, errorTypes[object.type].style);
  }
}
