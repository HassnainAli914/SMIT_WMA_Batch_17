// Function and Types
var username = "Hassnain";
var number = 1122;
var availablity = true;
function greet(name, roll) {
    return "Hello my name is ".concat(name, " and roll is ").concat(roll);
}
// Array and Objects
var array = ["Hassnain", "Ali"];
var object = {
    name: "Hassnain",
    number: 1122
};
var users = {
    name: "Hassnain",
    roll: 1122
};
var newPerson = {
    name: "Hassnain",
    age: 17
};
// Union
var id;
id = 100;
id = "100x";
var persons = {
    name: "hassnain",
    age: 17
};
// Enums
var Role;
(function (Role) {
    Role[Role["Admin"] = 0] = "Admin";
    Role[Role["User"] = 1] = "User";
    Role[Role["Editor"] = 2] = "Editor";
    Role[Role["Developer"] = 3] = "Developer";
    Role[Role["Visitor"] = 4] = "Visitor";
})(Role || (Role = {}));
var myRole = Role.Admin;
var todos = [];
function addTodo(title) {
    todos.push({ id: Date.now(), title: title, completed: false });
}
function listTodos() {
    todos.forEach(function (todo) { return console.log("".concat(todo.id, ": ").concat(todo.title)); });
}
addTodo("Learn TypeScript");
addTodo("Build project");
listTodos();
