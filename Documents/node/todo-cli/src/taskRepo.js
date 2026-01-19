const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const dataDir = path.join(__dirname, "../data");
const taskFilePath = path.join(dataDir, "tasks.json");

function ensureDataDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

function loadTask() {
  if (!fs.existsSync(taskFilePath)) {
    return [];
  }
  try {
    const data = fs.readFileSync(taskFilePath, "utf-8");
    const tasklist = JSON.parse(data);
    console.log(`Loaded ${Array.isArray(tasklist) ? tasklist.length : 0} tasks`);
    return Array.isArray(tasklist) ? tasklist : [];
  } catch (err) {
    console.error("Failed to read/parse tasks.json:", err.message);
    return [];
  }
}

function saveTasks(tasklist) {
  ensureDataDir();
  fs.writeFileSync(taskFilePath, JSON.stringify(tasklist, null, 2), "utf-8");
}

const addTask = (tasktitle) => {
  if (!tasktitle) {
    throw new Error("No task title is provided");
  }

  const newTask = {
    id: crypto.randomUUID(),
    title: tasktitle,
    date: new Date().toISOString(),
  };
  const tasklist = loadTask();
  tasklist.push(newTask);
  saveTasks(tasklist);
  console.log(`Added: ${tasktitle} (id: ${newTask.id})`);
};

function viewTask() {
  const tasklist = loadTask();
  console.log("============");
  if (tasklist.length === 0) {
    console.log("No tasks found.");
  } else {
    tasklist.forEach(t => {
      console.log(`- ${t.id} | ${t.title} | ${t.date}`);
    });
  }
  console.log("============");
}

function deletTask(id) {
  if (!id) {
    console.error("Provide task id to delete");
    return;
  }
  const tasklist = loadTask();
  const newList = tasklist.filter((task) => task.id !== id);
  if (newList.length === tasklist.length) {
    console.warn(`No task found with id ${id}`);
  } else {
    saveTasks(newList);
    console.log(`Deleted task id ${id}`);
  }
}

module.exports = {
  loadTask,
  addTask,
  viewTask,
  deletTask,
};
