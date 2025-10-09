function printToConsole(message) {
    const consoleBox = document.getElementById('console');
    consoleBox.innerHTML += `<div>> ${message}</div>`;
    consoleBox.scrollTop = consoleBox.scrollHeight;
}

function runExercise(exNumber) {
    document.getElementById('console').innerHTML = '';

    switch (exNumber) {

        case 1:
            var fruits = [
                "Apple",
                "Banana",
                "Mango"
            ];
            printToConsole("Task 1: Modify an Array Element");
            printToConsole("-------------------------------");
            printToConsole(fruits)
            fruits[1] = "Grapes";
            printToConsole("Banana Changed to Grapes " + fruits)
            break;

        case 2:

            var fruit = "Apple";
            printToConsole("Task 2: Try Changing a Character in a String");
            printToConsole("--------------------------------------------");
            printToConsole(fruit)
            fruit = "D" + fruit.slice(1);
            printToConsole("Apple Changed to " + fruit)
            break;

        case 3:
            var fruit = "Apple"
            printToConsole("Task 3: Replace the Whole String");
            printToConsole("--------------------------------");
            printToConsole(fruit);
            fruit = "Mango";
            printToConsole("Apple Updated to " + fruit)
            break;

        case 4:
            var fruits = [
                "Apple",
                "Banana",
                "Mango"
            ];
            printToConsole("Task 4: Use pop(), unshift(), and shift() on an Array");
            printToConsole("-----------------------------------------------------");
            printToConsole("Original = " + fruits);
            fruits.unshift("Grapes")
            printToConsole("Unshift 'Grapes' = " + fruits)
            fruits.push("Grapes")
            printToConsole("Push 'Grapes' = " + fruits)
            fruits.pop()
            printToConsole("Pop = " + fruits)
            fruits.shift()
            printToConsole("Pop = " + fruits)
            break;
        default:
            printToConsole("Invalid Exercise");
    }
}