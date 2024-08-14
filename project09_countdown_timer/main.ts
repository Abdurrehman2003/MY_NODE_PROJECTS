#! /usr/bin/env node
//SHABANG

import inquirer from 'inquirer';

// Function to start the countdown
function startCountdown(minutes: number) {
  const endTime = new Date().getTime() + minutes * 60000; // Calculate the end time in milliseconds

  const countdownInterval = setInterval(() => {
    const currentTime = new Date().getTime();
    const timeLeft = endTime - currentTime;

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      console.log('\nTime’s up!');
    } else {
      const minutesLeft = Math.floor(timeLeft / 60000);
      const secondsLeft = Math.floor((timeLeft % 60000) / 1000);

      process.stdout.write(`\rTime left: ${minutesLeft}m ${secondsLeft}s`);
    }
  }, 1000);
}

// Main function to prompt user and start the countdown
async function main() {
  const answer = await inquirer.prompt([
    {
      type: 'number',
      name: 'minutes',
      message: 'Enter the countdown time in minutes:',
      validate: (input) => input > 0 || 'Please enter a positive number.',
    },
  ]);

  startCountdown(answer.minutes);
}

// Run the main function
main();
