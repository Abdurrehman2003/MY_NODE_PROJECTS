#! /usr/bin/env node
//SHABANG
import inquirer from "inquirer";
async function getParagraph() {
    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "paragraph",
            message: "Enter an English paragraph:",
        },
    ]);
    return answers.paragraph;
}
function countWordsAndCharacters(paragraph) {
    const words = paragraph.split(/\s+/).filter(Boolean).length;
    const characters = paragraph.replace(/\s+/g, "").length;
    return { words, characters };
}
async function main() {
    const paragraph = await getParagraph();
    const counts = countWordsAndCharacters(paragraph);
    console.log(`Words: ${counts.words}`);
    console.log(`Characters (excluding whitespaces): ${counts.characters}`);
}
main().catch((error) => console.error(error));
