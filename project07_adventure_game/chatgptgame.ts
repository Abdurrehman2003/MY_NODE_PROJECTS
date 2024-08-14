import inquirer from 'inquirer';

interface Player {
  name: string;
  health: number;
  gold: number;
  items: string[];
}

const player: Player = {
  name: '',
  health: 100,
  gold: 50,
  items: [],
};

const enemies = ['Goblin', 'Skeleton', 'Dragon', 'Orc', 'Vampire'];
const items = ['Health Potion', 'Magic Sword', 'Shield', 'Torch', 'Map'];
const puzzles = [
  { question: 'What has keys but can’t open locks?', answer: 'piano' },
  { question: 'What runs but never walks?', answer: 'river' },
  { question: 'What can you break, even if you never pick it up or touch it?', answer: 'promise' },
  { question: 'I speak without a mouth and hear without ears. What am I?', answer: 'echo' },
  { question: 'What can travel around the world while staying in a corner?', answer: 'stamp' },
];

async function startGame() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'playerName',
      message: 'Enter your name, brave adventurer:',
    },
  ]);

  player.name = answers.playerName;
  console.log(`Welcome, ${player.name}! Your journey begins...`);

  await explore();
}

async function explore() {
  console.log(`You stand at the entrance of a dark dungeon.`);

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: ['Enter the dungeon', 'Visit the merchant', 'Check inventory', 'Quit'],
    },
  ]);

  switch (answers.action) {
    case 'Enter the dungeon':
      await enterDungeon();
      break;
    case 'Visit the merchant':
      await visitMerchant();
      break;
    case 'Check inventory':
      checkInventory();
      break;
    case 'Quit':
      console.log(`Farewell, ${player.name}. Your adventure ends here.`);
      process.exit();
  }

  await explore();
}

async function enterDungeon() {
  console.log(`You step cautiously into the dungeon...`);

  const encounter = Math.random();

  if (encounter < 0.3) {
    await findItem();
  } else if (encounter < 0.6) {
    await fightEnemy();
  } else if (encounter < 0.9) {
    await solvePuzzle();
  } else {
    console.log(`The dungeon is eerily quiet... nothing happens.`);
  }
}

async function findItem() {
  const item = items[Math.floor(Math.random() * items.length)];
  console.log(`You found a ${item}!`);

  player.items.push(item);

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: `What will you do with the ${item}?`,
      choices: ['Keep it', 'Leave it'],
    },
  ]);

  if (answers.action === 'Leave it') {
    console.log(`You decided to leave the ${item} behind.`);
    player.items.pop();
  }
}

async function fightEnemy() {
  const enemy = enemies[Math.floor(Math.random() * enemies.length)];
  console.log(`A wild ${enemy} appears!`);

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: `What will you do?`,
      choices: ['Fight', 'Run'],
    },
  ]);

  if (answers.action === 'Fight') {
    const playerWins = Math.random() > 0.5;

    if (playerWins) {
      console.log(`You defeated the ${enemy} and found 10 gold coins!`);
      player.gold += 10;
    } else {
      player.health -= 20;
      console.log(`The ${enemy} hit you! Your health is now ${player.health}.`);

      if (player.health <= 0) {
        console.log(`You have been defeated by the ${enemy}. Game over.`);
        process.exit();
      }
    }
  } else {
    console.log(`You ran away from the ${enemy}.`);
  }
}

async function solvePuzzle() {
  const puzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
  console.log(`You encounter a mysterious riddle: "${puzzle.question}"`);

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'answer',
      message: 'What is your answer?',
    },
  ]);

  if (answers.answer.toLowerCase() === puzzle.answer.toLowerCase()) {
    console.log('Correct! You have solved the puzzle and found 20 gold coins!');
    player.gold += 20;
  } else {
    console.log('Wrong answer! The puzzle remains unsolved.');
    player.health -= 10;

    if (player.health <= 0) {
      console.log('You have been defeated by the puzzle. Game over.');
      process.exit();
    }
  }
}

async function visitMerchant() {
  console.log(`You visit a merchant in a nearby village.`);

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'purchase',
      message: 'What would you like to buy?',
      choices: [
        'Health Potion (30 gold)',
        'Magic Sword (100 gold)',
        'Shield (50 gold)',
        'Leave',
      ],
    },
  ]);

  switch (answers.purchase) {
    case 'Health Potion (30 gold)':
      if (player.gold >= 30) {
        player.gold -= 30;
        player.items.push('Health Potion');
        console.log('You purchased a Health Potion.');
      } else {
        console.log('You do not have enough gold.');
      }
      break;
    case 'Magic Sword (100 gold)':
      if (player.gold >= 100) {
        player.gold -= 100;
        player.items.push('Magic Sword');
        console.log('You purchased a Magic Sword.');
      } else {
        console.log('You do not have enough gold.');
      }
      break;
    case 'Shield (50 gold)':
      if (player.gold >= 50) {
        player.gold -= 50;
        player.items.push('Shield');
        console.log('You purchased a Shield.');
      } else {
        console.log('You do not have enough gold.');
      }
      break;
    case 'Leave':
      console.log('You leave the merchant.');
      break;
  }
}

function checkInventory() {
  console.log(`You check your inventory:`);

  if (player.items.length === 0) {
    console.log(`Your inventory is empty.`);
  } else {
    console.log(`Items: ${player.items.join(', ')}`);
  }
  console.log(`Gold: ${player.gold}`);
  console.log(`Health: ${player.health}`);
}

startGame();
