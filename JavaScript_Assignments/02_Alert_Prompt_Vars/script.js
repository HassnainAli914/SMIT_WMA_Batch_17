// Custom console output
function printToConsole(message) {
    const consoleBox = document.getElementById('console');
    consoleBox.innerHTML += `<div>> ${message}</div>`;
    consoleBox.scrollTop = consoleBox.scrollHeight;
}

function runExercise(exNumber) {
    // Clear console before new exercise
    document.getElementById('console').innerHTML = '';

    switch (exNumber) {

        case 1:
            var Alert = "Hello, World!";

            printToConsole("Write an alert that shows: Hello, World!");
            printToConsole("----------------------------------------");
            alert("Hello, World!");
            printToConsole("Hello, World!");
            break;

        case 2:
            var Name = "My name is Hassnain Ali";

            printToConsole("Show an alert with your name");
            printToConsole("----------------------------");
            alert(Name);
            printToConsole(Name);
            break;

        case 3:
            var num1 = 5;
            var num2 = 6;
            var result = num1 + num2;

            printToConsole("Show a number using alert()");
            printToConsole("---------------------------");
            alert("5 + 5 = " + result);
            printToConsole("5 + 5 = " + result);
            break;

        case 4:
            var message = "How are you everyone?";

            printToConsole("Store a message in a variable and show it in an alert");
            printToConsole("-----------------------------------------------------");
            alert(message);
            printToConsole(message);
            break;

        case 5:
            var firstName = "Hassnain";
            var lastName = "Ali";

            printToConsole("Combine two strings and display them in an alert");
            printToConsole("------------------------------------------------");
            printToConsole(firstName + LastName)
            alert(firstName + lastName)
            break;

        case 6:
            var userName = "hassnainali914";

            printToConsole("Declare a variable userName and assign your name to it");
            printToConsole("------------------------------------------------------");
            printToConsole(userName);
            break;

        case 7:
            var message = "Welcome Buddy"

            printToConsole("Store a welcome message in a variable and alert() it");
            printToConsole("----------------------------------------------------");
            printToConsole(message);
            alert(message);
            break;

        case 8:
            var firstName = "Hassnain";
            var lastName = "Ali";

            printToConsole("Combine first name and last name into one variable");
            printToConsole("------------------------------------------------");
            printToConsole(firstName + lastName)
            break;

        case 9:
            var favQuote = "Ever tried. Ever failed. No matter. Try again. Fail again. Fail better.";

            printToConsole("Store your favorite quote in a variable");
            printToConsole("---------------------------------------");
            printToConsole(favQuote);
            break;

        case 10:
            var cityName = "Karachi";

            printToConsole("Create a variable city and show Welcome to city in an alert");
            printToConsole("-----------------------------------------------------------");
            printToConsole("Welcome to " + cityName + " the city of Lights")
            alert("Welcome to " + cityName + " the city of Lights")
            break;

        case 11:
            var age = 16;
            printToConsole("Declare a variable age and assign your age to it");
            printToConsole("------------------------------------------------");
            printToConsole("My age is " + age);
            break;

        case 12:
            var num1 = 5;
            var num2 = 3;
            printToConsole("Store two numbers in variables and add them");
            printToConsole("-------------------------------------------");
            printToConsole("5 + 3 = " + (num1 + num2));
            break;

        case 13:
            var num1 = 5;
            var num2 = 3;
            printToConsole("Subtract one number from another");
            printToConsole("--------------------------------");
            printToConsole("5 - 3 = " + (num1 - num2));
            break;

        case 14:
            var num1 = 5;
            var num2 = 3;
            printToConsole("Multiply two numbers stored in variables");
            printToConsole("----------------------------------------");
            printToConsole("5 * 3 = " + (num1 * num2));
            break;

        case 15:
            var Name = prompt("Enter Hassnain or Muzafar to show Age");
            var age1 = 16;
            var age2 = 20;

            printToConsole("Show a message like: You are 20 years old");
            printToConsole("-----------------------------------------");
            if (Name === "Hassnain") {
                printToConsole("You are " + age1 + " years old.");
            } else if (Name === "Muzafar") {
                printToConsole("You are " + age2 + " years old.");
            } else {
                printToConsole("Your age isn't added to list.");
            }
            break;


        case 16:
            var x = 10;
            var y = 5;

            printToConsole("Create two variables: x = 10, y = 5 add them and show result");
            printToConsole("------------------------------------------------");
            printToConsole("10 + 5 = " + (x + y));
            break;

        case 17:
            var x = 10;
            var y = 5;

            printToConsole("Subtract y from x and alert the answer");
            printToConsole("--------------------------------------");
            printToConsole("10 - 5 = " + (x - y));
            alert("10 - 5 = " + (x - y));
            break;

        case 18:
            var x = 10;
            var y = 5;

            printToConsole("Multiply x and y, and log result to the console");
            printToConsole("-----------------------------------------------");
            printToConsole("10 * 5 = " + (x * y));
            break;

        case 19:
            var x = 10;
            var y = 5;

            printToConsole("Divide x by y");
            printToConsole("-------------");
            printToConsole("10 / 5 = " + (x / y));
            break;

        case 20:
            var x = 10;
            var y = 5;

            printToConsole("Find the remainder of x % y");
            printToConsole("---------------------------");
            printToConsole("10 % 5 = " + (x % y));
            break;

        case 21:
            var name = prompt("What is your name?");

            printToConsole("Ask the user9s name and greet them");
            printToConsole("----------------------------------");
            printToConsole("Hello " + name)
            break;

        case 22:
            var Age = prompt("What is your age?");

            printToConsole("Ask the users age and display it");
            printToConsole("--------------------------------");
            printToConsole("My age is " + Age);
            break;

        case 23:
            var randomNum = prompt("Enter a number here");

            printToConsole("Ask the user for a number, double it, and show the result");
            printToConsole("---------------------------------------------------------");
            printToConsole("Double of " + randomNum + " is " + (randomNum * 2));
            break;

        case 24:
            var favColor = prompt("Enter you Favorite Color name:");

            printToConsole("Ask for favorite colour and show a message like: Wow! I like blue too");
            printToConsole("---------------------------------------------------------------------");
            printToConsole("Wow! I like " + favColor + " too!");
            break;

        case 25:
            var cityName = prompt("Enter your city name:")
            printToConsole("Ask for city name, and say: You are from city");
            printToConsole("---------------------------------------------");
            printToConsole("You are from " + cityName);
            break;

        case 26:
            var Age = prompt("Enter your age here:");

            printToConsole("Ask user age. If age < 30, show Your are still young man");
            printToConsole("--------------------------------------------------------");
            if (Age <= 30) {
                printToConsole("You are still young!");
            } else if (Age > 30) {
                printToConsole("Now you are Old!");
            } else {
                printToConsole("Wrong input!")
            }
            break;

        case 27:
            var num = Number(prompt("Enter a Number here:"));

            printToConsole("Ask for a number. If its even, show Even number");
            printToConsole("-----------------------------------------------");
            if (num % 2 === 0) {
                printToConsole("Its a Even number");
            } else {
                printToConsole("Its a Odd Number");
            }
            break;

        case 28:
            var num1 = Number(prompt("Enter a Left Number here:"));
            var num2 = Number(prompt("Enter a Right Number here:"));

            printToConsole("Compare two numbers and show which one is greater");
            printToConsole("-------------------------------------------------");
            if (num1 > num2) {
                printToConsole(num1 + " is Greater than " + num2);
            } else if (num1 < num2) {
                printToConsole(num1 + " is Less than " + num2);
            } else if (num1 == num2) {
                printToConsole(num1 + " is Equals to " + num2);
            } else {
                printToConsole("Invalid Input");
            }
            break;

        case 29:
            var pass = Number(prompt("Enter your Password 1234:"));

            printToConsole("Ask the user for password. If correct, say Access granted");
            printToConsole("---------------------------------------------------------");
            if (pass == 1234) {
                printToConsole("Access granted!")
            } else {
                printToConsole("Incorrect Password!")
            }
            break;

        case 30:
            var a = "5";
            var b = 5;

            printToConsole("Use ==, ===, !=, !== to compare two values");
            printToConsole("------------------------------------------");
            if (a == b) {
                printToConsole('"5" == 5 → TRUE (loose equality)');
            } else {
                printToConsole('"5" == 5 → FALSE');
            }

            if (a === b) {
                printToConsole('"5" === 5 → TRUE (strict equality)');
            } else {
                printToConsole('"5" === 5 → FALSE');
            }

            if (a != b) {
                printToConsole('"5" != 5 → TRUE (loose inequality)');
            } else {
                printToConsole('"5" != 5 → FALSE');
            }

            if (a !== b) {
                printToConsole('"5" !== 5 → TRUE (strict inequality)');
            } else {
                printToConsole('"5" !== 5 → FALSE');
            }

            break;

        default:
            printToConsole("Invalid Exercise");
    }
}