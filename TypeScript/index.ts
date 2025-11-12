// Function and Types

let username: string = "Hassnain";
let number: number = 1122;
let availablity: boolean = true;

function greet(name: string, roll: number): string {
    return `Hello my name is ${name} and roll is ${roll}`
}

// Array and Objects

let array: string[] = ["Hassnain", "Ali"];

let object: { name: string, number: number } = {
    name: "Hassnain",
    number: 1122
}

// Type Alias

type User = {
    name: string,
    roll: number
}
let users: User = {
    name: "Hassnain",
    roll: 1122
}

// Interfaces

interface Person {
    name: string,
    age: number
}
let newPerson: Person = {
    name: "Hassnain",
    age: 17
}

// Union

let id: string | number
id = 100;
id = "100x"

// Intersection Types

type name = { name: string };
type age = { age: number };
type person = name & age; // Intersection

let persons: person = {
    name: "hassnain",
    age: 17
}

// Enums

enum Role {
    Admin,
    User,
    Editor,
    Developer,
    Visitor
}

let myRole: Role = Role.Admin;

// Todo Task

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

let todos: Todo[] = [];

function addTodo(title: string) {
  todos.push({ id: Date.now(), title, completed: false });
}

function listTodos() {
  todos.forEach(todo => console.log(`${todo.id}: ${todo.title}`));
}

addTodo("Learn TypeScript");
addTodo("Build project");
listTodos();
