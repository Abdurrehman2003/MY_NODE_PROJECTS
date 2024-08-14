#! /usr/bin/env node 
//SHABANG

import inquirer from "inquirer";

let myBalance = 10000; // Initial balance in dollars
const myPin = 1234; // PIN for the ATM

async function startATM() {
  // Prompt for the PIN
  const pinAnswer = await inquirer.prompt([
    {
      name: "pin",
      message: "Please enter your PIN:",
      type: "number",
    }
  ]);

  // Check if the entered PIN is correct
  if (pinAnswer.pin === myPin) {
    console.log("Correct PIN!");

    // Prompt for the desired operation
    const operationAnswer = await inquirer.prompt([
      {
        name: "operation",
        message: "Please select an option:",
        type: "list",
        choices: ["Withdraw", "Check Balance"],
      }
    ]);

    // Handle the selected operation
    if (operationAnswer.operation === "Withdraw") {
      const amountAnswer = await inquirer.prompt([
        {
          name: "amount",
          message: "Enter the amount you wish to withdraw:",
          type: "number",
        }
      ]);

      // Check if there is enough balance to withdraw the entered amount
      if (amountAnswer.amount <= myBalance) {
        myBalance -= amountAnswer.amount;
        console.log(`Withdrawal successful! Your remaining balance is: $${myBalance}`);
      } else {
        console.log("Insufficient balance!");
      }

    } else if (operationAnswer.operation === "Check Balance") {
      console.log(`Your current balance is: $${myBalance}`);
    }

  } else {
    console.log("Incorrect PIN! Please try again.");
  }
}

// Start the ATM machine
startATM();
