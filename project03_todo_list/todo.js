#! usr/bin/env node
// SHABANG
import inquirer from "inquirer";
const todos = [];
async function mainMenu() {
    const answers = await inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: ["Add a new task", "List all tasks", "Mark task as complete", "Exit"],
        },
    ]);
    switch (answers.action) {
        case "Add a new task":
            await addTask();
            break;
        case "List all tasks":
            listTasks();
            break;
        case "Mark task as complete":
            await markTaskAsComplete();
            break;
        case "Exit":
            console.log("Goodbye!");
            return;
    }
    mainMenu();
}
async function addTask() {
    const answer = await inquirer.prompt([
        {
            type: "input",
            name: "task",
            message: "Enter the task:",
        },
    ]);
    todos.push({ task: answer.task, completed: false });
    console.log(`Task "${answer.task}" added.`);
}
function listTasks() {
    if (todos.length === 0) {
        console.log("No tasks available.");
        return;
    }
    todos.forEach((todo, index) => {
        console.log(`${index + 1}. [${todo.completed ? "x" : " "}] ${todo.task}`);
    });
}
async function markTaskAsComplete() {
    if (todos.length === 0) {
        console.log("No tasks available.");
        return;
    }
    const choices = todos.map((todo, index) => ({
        name: todo.task,
        value: index,
    }));
    const answer = await inquirer.prompt([
        {
            type: "list",
            name: "taskIndex",
            message: "Select a task to mark as complete:",
            choices: choices,
        },
    ]);
    todos[answer.taskIndex].completed = true;
    console.log(`Task "${todos[answer.taskIndex].task}" marked as complete.`);
}
// Start the main menu
mainMenu();
