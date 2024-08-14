#! /usr/bin/env node
//SHABANG


import inquirer from "inquirer"

const currency: any = {
    USD: 1,        // base currency
    EUR: 0.91,
    yen: 142.73,
    GBP: 0.76,
    CNY: 7.14,
    AUD: 1.55
};

let user_answer = await inquirer.prompt(
    [
        {
            name: "from",
            message: "Enter from Currency",
            type: "list",
            choices: ['USD', 'EUR', 'yen', 'GBP', 'CNY', 'AUD']
        },
        {
            name: "to",
            message: "Enter to Currency",
            type: "list",
            choices: ['USD', 'EUR', 'yen', 'GBP', 'CNY', 'AUD']
        },
        {
            name: 'amount',
            message: 'Enter Your Amount',
            type: 'number'
        }

    ]
)

let fromAmount = currency[user_answer.from]  //exchange rate
let toAmount = currency[user_answer.to]      //exchange rate
let amount = user_answer.amount
let baseAmount = amount / fromAmount
let convertedAmount = baseAmount * toAmount
console.log(convertedAmount);


