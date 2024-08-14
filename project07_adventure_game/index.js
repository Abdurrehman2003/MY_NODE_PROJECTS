#! /usr/bin/env node
//SHABANG
import inquirer from "inquirer";
class Player {
    name;
    fuel = 100;
    constructor(name) {
        this.name = name;
    }
    fuelDecrease() {
        this.fuel -= 25;
    }
    fuelIncrease() {
        this.fuel = 100;
    }
}
class Opponent {
    name;
    fuel = 100;
    constructor(name) {
        this.name = name;
    }
    fuelDecrease() {
        this.fuel -= 25;
    }
}
let playerData = await inquirer.prompt([
    {
        name: "name",
        type: "input",
        message: "Please Enter Your Name:"
    }
]);
let opponentData = await inquirer.prompt([
    {
        name: "Select",
        type: "list",
        message: "Select Your opponent:",
        choices: ["skeleton", "Alien", "Zombie"]
    }
]);
let p1 = new Player(playerData.name);
let o1 = new Opponent(opponentData.Select);
do {
    let ask = await inquirer.prompt([
        {
            name: "opt",
            type: "list",
            message: "What would you like to do?",
            choices: ["Attack", "Drink Potion", "Run for your Life.."]
        }
    ]);
    if (ask.opt === "Attack") {
        let num = Math.floor(Math.random() * 2);
        if (num > 0) {
            p1.fuelDecrease();
            console.log(`${p1.name} fuel is ${p1.fuel}`);
            console.log(`${o1.name} fuel is ${o1.fuel}`);
            if (p1.fuel <= 0) {
                console.log("You Lose, Better Luck Next Time.");
                process.exit();
            }
        }
        else {
            o1.fuelDecrease();
            console.log(`${p1.name} fuel is ${p1.fuel}`);
            console.log(`${o1.name} fuel is ${o1.fuel}`);
            if (o1.fuel <= 0) {
                console.log("You Win!");
                process.exit();
            }
        }
    }
    else if (ask.opt === "Drink Potion") {
        p1.fuelIncrease();
        console.log(`You Drink Health Potion, Your fuel is ${p1.fuel}`);
    }
    else if (ask.opt === "Run for your Life..") {
        console.log("You Lose, Better Luck next time.");
        process.exit();
    }
} while (true);
