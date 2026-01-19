
const logger = require("./logger");
const { addTask, viewTask, deletTask } = require("./taskRepo");
const crypto = require("crypto");

function showHelp() {
  logger.info("Usage:");
 logger.info("  node src/index.js add \"task title\"      -> add a task");
  console.log("  node src/index.js view                    -> view all tasks");
  console.log("  node src/index.js delet <task-id>         -> delete a task by id");
  console.log("  npm start add \"task title\"               -> same as add");
  console.log("  npm start view                            -> same as view");
  console.log("  npm start delet <task-id>                 -> same as delet");
}

const command = process.argv[2];
const value = process.argv[3];

if (!command) {
  showHelp();
  process.exit(0);
}

if (command === "add") {
  try {
    addTask(value);
  } catch (err) {
    console.error("Error adding task:", err.message);
  }
} else if (command === "view") {
  viewTask();
} else if (command === "delet") {
  deletTask(value);
} else if (command === "help" || command === "--help" || command === "-h") {
  showHelp();
} else {
  console.error("Unknown command:", command);
  showHelp();
}
