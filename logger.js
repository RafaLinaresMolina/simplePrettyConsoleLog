let minimumLevelLog;
const frontPrefix = "%c";
const backPrefix = "\x1b";
const resetColorOnNode = "\x1b[0m";
const isNode = typeof process === "object";
let configValues;

/**
 * Function to retrive the data from the config file
 * @returns json
 */
const readConfig = async () => {
  let data;
  if (!isNode) {
    data = await fetch("./config.json");
    data = await data.json();
  } else {
    const fs = require("fs").promises;
    data = await fs.readFile("./config.json", "utf-8");
    data = JSON.parse(data);
  }
  minimumLevelLog = data["minimumLevelLog"];
  return data;
};

readConfig()
  .then((data) => (configValues = JSON.parse(data)))
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

const setHeaderDate = (header, toIso) => {
  if (configValues["dateIso"])
    return header.replace("##DATE##", new Date().toISOString());
  else return header.replace("##DATE##", dateToDefaultFormat(new Date()));
};

const dateToDefaultFormat = (date) => {
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

const typeMessage = (type, msg) => {
  if (configValues[type] && type <= minimumLevelLog) {
    let formatedMessage = "";
    if (!isNode) {
      formatedMessage = `${frontPrefix}${setHeaderDate(
        configValues[type].header
      )} ${syntaxHighlight(msg)}`;
      console.log(formatedMessage, configValues[type].frontStyle);
    } else {
      formatedMessage = `${backPrefix}${
        configValues[type].nodeFontColor
      } ${setHeaderDate(configValues[type].header)} ${syntaxHighlight(
        msg
      )} ${resetColorOnNode}`;
      console.log(formatedMessage);
    }
  }
};

export default logger;
