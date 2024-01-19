#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from 'chalk';
import showBanner from "node-banner";
import { createSpinner } from 'nanospinner';
let sleep = () => new Promise((r) => setTimeout(r, 2000));
async function banner() {
    await showBanner('Number Guessing Game', 'This program genrate a random number that you have to guess.');
}
// this is the main function
let startGame = async () => {
    let { deficulty } = await inquirer.prompt({
        name: "deficulty",
        type: "list",
        choices: ["Easy", "Medium", "Deficult"],
        message: chalk.blueBright("Please Select Deficulty  Level"),
    });
    let { rounds } = await inquirer.prompt({
        name: "rounds",
        type: "number",
        message: chalk.rgb(245, 162, 162)("How many rounds you want to play (Max 5)"),
        validate: (input) => {
            if (isNaN(input) || input < 1 || input > 5) {
                return "Enter number around 1 to 5";
            }
            else
                return true;
        }
    });
    let correctAns = 0;
    let guessCount = 0;
    let number_rang = deficulty === "Easy" ? 5 : deficulty === "Medium" ? 10 : 15;
    while (guessCount < rounds) {
        let rendom_number = Math.floor(Math.random() * number_rang);
        let { userInput } = await inquirer.prompt({
            name: "userInput",
            type: "number",
            message: chalk.rgb(245, 162, 162)(`please Enter number between 1 to ${number_rang}`),
            validate: (input) => {
                if (isNaN(input) || input > number_rang)
                    return `Please Enter between t to ${number_rang} `;
                else
                    return true;
            }
        });
        guessCount++;
        const spinner = createSpinner('Guessing').start();
        await sleep();
        if (rendom_number === userInput) {
            spinner.success({ text: chalk.greenBright("Congratulaions You win") });
            correctAns++;
        }
        else {
            spinner.error({ text: chalk.redBright("Ooops! You lose") });
        }
        ;
    }
    const spinner = createSpinner('Resulting').start();
    await sleep();
    spinner.success({ text: chalk.yellowBright(`You have guessed ${correctAns} out of ${guessCount}`) });
    let { playAgain } = await inquirer.prompt({
        name: "playAgain",
        type: "confirm",
        message: chalk.rgb(245, 162, 162)('If you want to paly again then press "Y" otherwise "N". ')
    });
    if (playAgain) {
        startGame();
    }
    ;
};
await banner();
startGame();
