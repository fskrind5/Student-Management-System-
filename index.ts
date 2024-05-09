#!/usr/bin/env node

import inquirer from "inquirer";

class Student{
    static counter = 101;
    id: number;
    name: string;
    courses: string[];
    balance: number;

    constructor(name: string) 
    {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 100;
    }

    enroll_course(course: string) {
        this.courses.push(course);
    }

    view_balance() {
        console.log("Balance for ", this.name, "is",  this.balance);
    
}

    pay_fees(amount: number) {
        this.balance = this.balance - amount;
        console.log(this.name, "paid", amount, "to the school");
        console.log(this.name, "balance is", this.balance);
    }

    display_status() {
        console.log("Name:", this.name);
        console.log("ID:", this.id);
        console.log("Courses:", this.courses);
        console.log("Balance:", this.balance);
    }
}

class studentManager {
    students: Student []

    constructor() {
        this.students = [];
    }

    add_student(name: string) {
        let student = new Student(name);
        this.students.push(student);
        console.log("New student:", name, "added successfully. Student ID:", student.id);
    }
    
    enroll_student (student_id : number, course : string) {
        let student =  this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(student.name, "is enrolled in", course);
        }
    }
    view_student_balance(student_id: number) {
        let student =  this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log("Student not found");
        }
    }

    pay_student_fees(student_id: number, amount: number) {
        let student =  this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log("Student not found");
        }
    }

    display_student_status(student_id: number) {
        let student =  this.find_student(student_id);
        if (student) {
            student.display_status();
        }
        else {
            console.log("Student not found");
        }
    }

    //? Method to find student by student_id
    find_student(student_id: number) {
        return this.students.find(std => std.id === student_id)
    }   
}

async function main() {
    console.log("Welcome to Student Management System by Falak Sher Khan");
    console.log("=".repeat(50));

    let student_manager = new studentManager ();
    while (true){
        let choice = await inquirer.prompt([{
            type: "list",
            name: "choice",
            message: "What do you want to do?",
            choices: [
                "Add Student", 
                "Enroll Student", 
                "View Student Balance", 
                "Pay Student Fees", 
                "Display Student Status", 
                "Exit"
            ]
        }]);

        switch(choice.choice){
            case "Add Student":
            let name_input = await inquirer.prompt([
                {
                type: "input",
                name: "name",
                message: "Enter student name:"
                }
        ]);
        student_manager.add_student(name_input.name);
        break;

        case "Enroll Student":
            let course_input = await inquirer.prompt([
                {
                type: "number",
                name: "student_id",
                message: "Enter student id:"
                },
                {
                type: "input",
                name: "course",
                message: "Enter course name:"
                }
            ]);
            student_manager.enroll_student(course_input.student_id, course_input.course);
            break;

            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                    type: "number",
                    name: "student_id",
                    message: "Enter student id:"
                    }
                ]);
                student_manager.view_student_balance(balance_input.student_id);
                break;

            case "Pay Student Fees":
                let fees_input = await inquirer.prompt([
                    {
                    type: "number",
                    name: "student_id",
                    message: "Enter student id:"
                    },
                    {
                    type: "number",
                    name: "amount",
                    message: "Enter amount:"
                    }
                ]);
                student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;

            case "Display Student Status":
                let status_input = await inquirer.prompt([
                    {
                    type: "number",
                    name: "student_id",
                    message: "Enter student id:"
                    }
                ]);
                student_manager.display_student_status(status_input.student_id);
                break;

            case "Exit":
                console.log("Thank you for using Student Management System");
                process.exit();
        }
    }
}

main();