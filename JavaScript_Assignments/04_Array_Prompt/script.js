// 1. Comparison Operators

//  - Use the == operator to compare two numeric inputs and demonstrate equality checking.
var num1 = Number(prompt("Enter first number:"));
var num2 = Number(prompt("Enter second number:"));
if (num1 == num2) {
    console.log("Both numbers are equal");
} else {
    console.log("Numbers are different");
}

//  - Implement an age verification program using the >= operator. Display "Eligible" if the age is 18 or greater; otherwise, display "Not Eligible".
var age = Number(prompt("Enter your age:"));
if (age >= 18) {
    console.log("Eligible");
} else {
    console.log("Not Eligible");
}


// 2. If-Else & Nested Conditions

// Develop a grading system based on user-provided marks:
var marks = Number(prompt("Enter your marks:"));
if (marks >= 80) {
    console.log("Aa");
} else if (marks >= 60) {
    console.log("Bb");
} else if (marks >= 40) {
    console.log("Cc");
} else {
    console.log("Faild");
}

// Create a score evaluation program:
var score = Number(prompt("Enter your score:"));
if (score > 90) {
    console.log("Excellent");
} else if (score >= 70 && score <= 90) {
    console.log("Good");
} else {
    console.log("Needs Improvement");
}


// 3. Arrays

// Initialize an array containing five fruit names. Then, print both the first and last elements of this array to the console.
var fruits = ["Apple", "Banana", "Mango", "Orange", "Grapes"];
console.log("First fruit:", fruits[0]);
console.log("Last fruit:", fruits[fruits.length - 1]);


// 4. Adding, Removing, Inserting, Extracting Elements

// a. Append a new element to an existing array using js method method, then print the modified array.
var arr = ["a", "b", "c", "d"];
arr.push("e");
console.log(arr);

// b. Remove the last element from an array using js method method and then print the altered array.
arr.pop();
console.log(arr);

// c. Add an element to the beginning of an array using the appropriate JavaScript method and print the result.
arr.unshift("start");
console.log(arr);

// d. Remove the first element of an array using the designated method and display the array's new state.
arr.shift();
console.log(arr);

// e. Insert a new element at a specific midpoint within an array using an appropriate method, then print the array to confirm the insertion.
arr.splice(2, 0, "mid");
console.log(arr);

// f. Extract a specific element from an array into a newly created array using the relevant JavaScript method and display both arrays.
var newArr = arr.slice(2, 3);
console.log("Extracted:", newArr);
console.log("Original array:", arr);


// 5. For Loops

// 1. Use a for loop to generate and print the inverse multiplication table of 5 (e.g., 50, 45, ..., 5).
for (var i = 10; i >= 1; i--) {
    console.log(5 * i);
}

// 2. Implement a flag variable within a for loop to check if a specific number is present in an array. If found, print "Found" and terminate the loop immediately.
var numbers = [1, 3, 5, 7, 9];
var isFound = false;
for (var i = 0; i < numbers.length; i++) {
    if (numbers[i] === 5) {
        console.log("Found");
        isFound = true;
        break;
    }
}
if (isFound == false) {
    console.log("Not Found");
}

// 3. Write a loop that stops execution when the number 5 is detected, leveraging a suitable JavaScript method to achieve this condition.
var nums = [1, 2, 3, 4, 5, 6, 7];
for (var i = 0; i < nums.length; i++) {
    console.log(nums[i]);
    if (nums[i] === 5) {
        console.log("5 detected, stopping loop.");
        break;
    }
}