#! /usr/bin/env node
//SHABANG
import inquirer from "inquirer";
const randomNumber = Math.floor(10000 + Math.random() * 90000);
let myBalance = 0;
let answer = await inquirer.prompt([
    {
        name: "Students",
        type: "input",
        message: "Enter student name:",
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return "please enter a non-empty value.";
        }
    },
    {
        name: "courses",
        type: "list",
        message: "Select the course to enroll.",
        choices: ["MS.OFFICE", "HTML", "JAVASCRIPT", "TYPESCRIPT", "PYTHON"]
    }
]);
const tutionFee = {
    "MS.OFFICE": 2000,
    "HTML": 2500,
    "JAVASCRIPT": 5000,
    "TYPESCRIPT": 6000,
    "PYTHON": 10000
};
console.log(`\n Tution Fees: ${tutionFee[answer.courses]}/-\n`);
console.log(`Balance: ${myBalance}\n`);
let paymentType = await inquirer.prompt([
    {
        name: "payment",
        type: "list",
        message: "Select payment methods.",
        choices: ["Bank Transfer", "Easy Paisa", "Jazz cash"]
    },
    {
        name: "amount",
        type: "input",
        message: "Transfer Money:",
        validate: function (value) {
            if (value.trim() !== "") {
                return true;
            }
            return "Please enter a non-empty value.";
        }
    }
]);
console.log(`\n You selected payment method ${paymentType.payment}\n`);
const tutionFees = tutionFee[answer.courses];
const paymentAmount = parseFloat(paymentType.amount);
if (tutionFees === paymentAmount) {
    console.log(`Congratulations! You have successfully enrolled in ${answer.courses}.\n`);
    let ans = await inquirer.prompt([
        {
            name: "select",
            type: "list",
            message: "What would you like to do next?",
            choices: ["View Status", "Exit"]
        }
    ]);
    if (ans.select === "View Status") {
        console.log("\n **Status**\n");
        console.log(`Student Name: ${answer.Students}`);
        console.log(`Student ID: ${randomNumber}`);
        console.log(`Course: ${answer.courses}`);
        console.log(`Tution Fees Paid: ${paymentAmount}`);
        console.log(`Balance: ${myBalance += paymentAmount}`);
    }
    else {
        console.log("\n Exiting Student Management System\n");
    }
}
else {
    console.log("Invalid amount due for the course\n");
}
