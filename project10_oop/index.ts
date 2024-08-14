#! /usr/bin/env node
//SHABANG

import inquirer from 'inquirer';

// Class Definitions

class Student {
    name: string;
    constructor(n: string) {
        this.name = n;
    }
}

class Staff {
    name: string;
    position: string;
    constructor(n: string, p: string) {
        this.name = n;
        this.position = p;
    }
}

class Person {
    students: Student[] = [];
    staff: Staff[] = [];

    addStudent(obj: Student) {
        this.students.push(obj);
    }

    addStaff(obj: Staff) {
        this.staff.push(obj);
    }

    removeStudent(name: string) {
        this.students = this.students.filter(student => student.name !== name);
    }

    removeStaff(name: string) {
        this.staff = this.staff.filter(staff => staff.name !== name);
    }

    listAllMembers() {
        console.log("\nStudents:");
        this.students.forEach(student => console.log(`- ${student.name}`));
        console.log("\nStaff:");
        this.staff.forEach(staff => console.log(`- ${staff.name} (${staff.position})`));
    }
}

// Main Program

const persons = new Person();

const programStart = async (persons: Person) => {
    do {
        console.log("\nWelcome!");
        const ans = await inquirer.prompt([
            {
                name: "Select",
                type: "list",
                message: "Whom would you like to interact with?",
                choices: ["Staff", "Student", "View All Members", "Remove Member", "Exit"]
            }
        ]);

        if (ans.Select === "Staff") {
            const staffAns = await inquirer.prompt([
                {
                    name: "name",
                    type: "input",
                    message: "Enter the staff member's name:",
                },
                {
                    name: "position",
                    type: "input",
                    message: "Enter the staff member's position:",
                }
            ]);
            const staff = persons.staff.find(val => val.name === staffAns.name);
            if (!staff) {
                const newStaff = new Staff(staffAns.name, staffAns.position);
                persons.addStaff(newStaff);
                console.log(`Hello, I am ${newStaff.name}, the ${newStaff.position}. Nice to meet you!`);
                console.log("New Staff member added.");
            } else {
                console.log(`Hello, I am ${staff.name}, the ${staff.position}. Nice to see you again!`);
            }
        } else if (ans.Select === "Student") {
            const studentAns = await inquirer.prompt([
                {
                    name: "Student",
                    type: "input",
                    message: "Enter the student's name you wish to engage with:"
                }
            ]);
            const student = persons.students.find(val => val.name === studentAns.Student);
            if (!student) {
                const newStudent = new Student(studentAns.Student);
                persons.addStudent(newStudent);
                console.log(`Hello, I am ${newStudent.name}. Nice to meet you!`);
                console.log("New Student added.");
            } else {
                console.log(`Hello, I am ${student.name}. Nice to see you again!`);
            }
        } else if (ans.Select === "View All Members") {
            persons.listAllMembers();
        } else if (ans.Select === "Remove Member") {
            const removeAns = await inquirer.prompt([
                {
                    name: "memberType",
                    type: "list",
                    message: "Would you like to remove a Student or Staff?",
                    choices: ["Student", "Staff"]
                },
                {
                    name: "name",
                    type: "input",
                    message: "Enter the name of the member to remove:",
                }
            ]);
            if (removeAns.memberType === "Student") {
                persons.removeStudent(removeAns.name);
                console.log(`${removeAns.name} has been removed from the Student list.`);
            } else if (removeAns.memberType === "Staff") {
                persons.removeStaff(removeAns.name);
                console.log(`${removeAns.name} has been removed from the Staff list.`);
            }
        } else if (ans.Select === "Exit") {
            console.log("Exiting the program...");
            process.exit();
        }
    } while (true);
}

programStart(persons);
