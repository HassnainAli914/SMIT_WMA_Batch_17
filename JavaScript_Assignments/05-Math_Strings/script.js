// --------------------- Start ------------------------

// Strings: Measuring Length and Extracting Part

// 01: let str = "Hello, World!"; Write a code to measure the length of str and print it.

let str = "Hello, World!";
console.log(`Length of String is ${str.length}`);

// 02: let str = "Hello, World!"; Write a code to extract and print the substring
// "World" from str.

let str1 = "Hello, World!";
console.log(`Substring of str1 is ${str1.slice(7, 12)}`);

// 03: let sentence = "The cat is sleeping"; Write a code to check if "cat" exists in sentence and print true or false.

let sentence = "The cat is sleeping";
let status = sentence.includes("cat");
console.log("Status of 'cat' in sentence is", status);

// 04: let sentence = "The cat is sleeping"; Write a code to find and print the starting index of "sleep" in sentence.

let sentence1 = "The cat is sleeping";
let index = sentence1.indexOf("sleep");
console.log(`Starting index of 'sleep' in sentence1 is ${index}`);

// --------------------- End -------------------------

// --------------------- Start ------------------------

// Strings: Finding a Character at a Location

//  01: let text = "JavaScript"; Write a code to print the character at index 3 of text.

let text = "JavaScript";
console.log(`Character at index 3 is ${text.charAt(3)}`);

// let text = "Programming"; Write a code to print the last character of text.

let text1 = "Programming";
console.log(`Last character of text1 is ${text1.charAt(text1.length - 1)}`);

// --------------------- End -------------------------

// --------------------- Start ------------------------

// Rounding Numbers

// 01: let num = 7.8; Write a code to round num to the nearest integer and print it.

let num = 7.8;
console.log(`Rounded value of num is ${Math.round(num)}`);

// 02: let num = 5.9; Write a code to use Math.floor() on num and print the result

let num1 = 5.9;
console.log(`Value of Math.floor() num1 is ${Math.floor(num1)}`);

// 03: let num = 4.2; Write a code to use Math.ceil() on num and print the result.

let num2 = 4.2;
console.log(`Value of Math.ceil() num2 is ${Math.ceil(num2)}`);

// --------------------- End -------------------------

// --------------------- Start ------------------------

// Generating Random Numbers

// 01: Write a code to generate and print a random number between 0 and 1.

let randomNum = Math.random();
console.log(`Random number between 0 and 1 is ${randomNum}`);

// 02: Write a code to generate and print a random whole number between 1 and 10

let randomWholeNum = Math.floor(Math.random() * 10) + 1;
console.log(`Random whole number between 1 and 10 is ${randomWholeNum}`);

// --------------------- End -------------------------

// --------------------- Start ------------------------

// Converting Strings to Integers and Decimals

// 01: let strNum = "100"; Write a code to convert strNum to an integer and print it

let strNum = "100";
let intNum = parseInt(strNum);
console.log(`Converted integer is ${intNum}`);

// 02: let strFloat = "3.141"; Write a code to convert strFloat to a decimal number and print it.

let strFloat = "3.141";
let decNum = parseFloat(strFloat); 
console.log(`Converted decimal number is ${decNum}`);

// --------------------- End -------------------------

// --------------------- Start ------------------------

// Converting Strings to Numbers and Numbers to Strings

// 01: let num = 250; Write a code to convert num to a string and print it.

let num3 = 250;
let strFromNum = num3.toString();
console.log(`Converted to string is ${strFromNum}`);

// 02: let strNum = "45.67"; Write a code to convert strNum to a number using Number() and print it.

let strNum1 = "45.67";
let numFromStr = Number(strNum1);
console.log(`Converted to number is ${numFromStr}`);

// 03: let num = 5.6789; Write a code to round num to 2 decimal places and print it

let num4 = 5.6789;
let roundedNum = num4.toFixed(2);
console.log(`Rounded to 2 decimal places is ${roundedNum}`);

// 04: let num = 3.1415926535; Write a code to limit num to 4 decimal places and print it.

let num5 = 3.1415926535;
let limitedNum = num5.toFixed(4);
console.log(`Limited to 4 decimal places is ${limitedNum}`);

// --------------------- End -------------------------