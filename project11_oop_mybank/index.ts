#! /usr/bin/env node
//SHABANG

import inquirer from "inquirer";

// Bank Account Interface
interface BankAccount {
  accountNumber: number;
  balance: number;
  withdraw(amount: number): void;
  deposit(amount: number): void;
  checkBalance(): void;
}

// Bank Account class
class BankAccount implements BankAccount {
  accountNumber: number;
  balance: number;

  constructor(accountNumber: number, balance: number) {
    this.accountNumber = accountNumber;
    this.balance = balance;
  }

  // Debit Money
  withdraw(amount: number): void {
    if (this.balance >= amount) {
      this.balance -= amount;
      console.log(
        `Withdrawal of $${amount} successful. Remaining balance is: $${this.balance}`
      );
    } else {
      console.log("Insufficient Balance.");
    }
  }

  //Credit Money
  deposit(amount: number): void {
    if (amount > 100) {
      amount -= 1; // $1 fee charged if more than $100 is deposited
    }
    this.balance += amount;
    console.log(
      `Deposit of $${amount} successful. Remaining balance is: $${this.balance}`
    );
  }

  // check balance
  checkBalance(): void {
    console.log(`Current Balance: $${this.balance}`);
  }
}

// customer class
class Customer {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  mobileNumber: number;
  account: BankAccount;

  constructor(
    firstName: string,
    lastName: string,
    gender: string,
    age: number,
    mobileNumber: number,
    account: BankAccount
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;
    this.mobileNumber = mobileNumber;
    this.account = account;
  }
}

// Creating bank accounts

const accounts: BankAccount[] = [
  new BankAccount(1006, 500),
  new BankAccount(1007, 1000),
  new BankAccount(1008, 2000),
];

// Creating Customers
const Customers: Customer[] = [
  new Customer("Abdul", "Rehman", "Male", 21, 3350320737, accounts[0]),
  new Customer("syeda", "Shanzay", "Female", 24, 3332345456, accounts[1]),
  new Customer("Ayesha", "Omer", "Female", 35, 3415678687, accounts[2]),
];

// Function to interact with bank account

async function service() {
  do {
    const accountNumberInput = await inquirer.prompt({
      name: "accountNumber",
      type: "number",
      message: "Enter Your Account Number:",
    });

    const customer = Customers.find(
      (customer) =>
        customer.account.accountNumber === accountNumberInput.accountNumber
    );
    if (customer) {
      console.log(`Welcome, ${customer.firstName} ${customer.lastName}!\n`);
      const ans = await inquirer.prompt([
        {
          name: "select",
          type: "list",
          message: "Select an operation:",
          choices: ["Deposit", "Withdraw", "Check Balance", "Exit"],
        },
      ]);

      switch (ans.select) {
        case "Deposit":
          const depositAmount = await inquirer.prompt({
            name: "amount",
            type: "number",
            message: "Please Enter the amount to deposit:",
          });

          customer.account.deposit(depositAmount.amount);
          break;

        case "Withdraw":
          const withdrawAmount = await inquirer.prompt({
            name: "amount",
            type: "number",
            message: "Please Enter the amount to withdraw:",
          });

          customer.account.withdraw(withdrawAmount.amount);
          break;

        case "Check Balance":
          customer.account.checkBalance();
          break;

        case "Exit":
          console.log("Exiting Bank Program...");
          console.log(
            "\n Thank you for using our bank services. Have a great day!"
          );
          return;
      }
    } else {
      console.log("Invalid Account Number! Please try again.");
    }
  } while (true);
}

service();
