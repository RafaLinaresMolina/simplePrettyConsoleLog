const frontPrefix = "%c";
const backPrefix = "\x1b";
const resetColorOnNode = "\x1b[0m";
const isNode = typeof process === "object";
let minimumLevelLog;
let configValues;
/**
 * Method to retrive the data from the config file
 * @returns json
 */
const readConfig = async (path = 'config.json') => {
  let data;
  if (!isNode) {
    data = await fetch(path);
    data = await data.json();
  } else {
    const fs = require("fs").promises;
    data = await fs.readFile(path, "utf-8");
    data = JSON.parse(data);
  }
  minimumLevelLog = data["minimumLevelLog"];
  configValues = data;
};

readConfig()
  .catch((err) => console.log);

/**
 * Function that return a true if is a string and false if
 * is a well formated JSON object
 * @param {json | string} str
 * @returns boolean
 */
const isString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

/**
 * Function that will return a formated json or a string.
 * used for pretify JSON objects on the terminal.
 * @param {json | string} json
 * @returns string
 */
const syntaxHighlight = (json) => {
  if (!isString(json)) {
    return JSON.stringify(json, undefined, 2);
  } else {
    return json;
  }
};

/**
 * Method for print with style the message to the terminal.
 * @param {Number} type
 * @param {String} msg
 */
const logger = (type, msg) => {
  // We will ignore the logs if they do not exist and if they are outside the level of interest
  if (configValues === undefined) {
    readConfig().then((data) => {
      configValues = data;
      typeMessage(type, msg);
    });
  } else {
    typeMessage(type, msg);
  }
};

/**
 * This function replace the prefix to the actual date
 * @param {string} header
 * @returns string
 */
const setHeaderDate = (header) => {
  if (configValues["dateIso"])
    return header.replace("##DATE##", new Date().toISOString());
  else return header.replace("##DATE##", dateToDefaultFormat(new Date()));
};

/**
 * This function return the default date format
 * @param {Date} date
 * @returns string
 */
const dateToDefaultFormat = (date) => {
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

/**
 * This method types the console.log message
 * and applies the styles/colors
 * @param {number} type
 * @param {string} msg
 */
const typeMessage = (type, msg) => {
  if (configValues[type] && type <= minimumLevelLog) {
    let formatedMessage = "";
    if (!isNode) {
      formatedMessage = `${frontPrefix}${setHeaderDate(
        configValues[type].header
      )} ${syntaxHighlight(msg)}`;
      console.log(formatedMessage, configValues[type].frontStyle);
    } else {
      formatedMessage = `${
        configValues[type].nodeFontColor.replace(/PREFIX/g, backPrefix)
      }${setHeaderDate(configValues[type].header)} ${syntaxHighlight(
        msg
      )} ${resetColorOnNode}`;
      console.log(formatedMessage);
    }
  }
};

((exports) => { 
  exports.logger = logger;
  exports.readConfig = readConfig;
}) (typeof exports === 'undefined'? this['sampleModule']={}: exports); 
