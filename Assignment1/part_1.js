// Question 1
let text = "123";
let num = Number(text);

console.log("Question 1 :", num + 7);
console.log( "-------------------");
/* ------------------------------ */

// Question 2
let value = 0;
if (!value) {
    console.log("Question 2 :", "Invalid");
}
console.log( "-------------------");
/* ------------------------------ */

// Question 3
console.log("Question 3 :");
for (let i =1; i <=10; i++){
    
    if(i % 2 ===0){
        continue
    }

    console.log(i);
}
console.log( "-------------------");
/* ------------------------------ */

// Question 4
let array = [1, 2, 3, 4, 5];
let even = array.filter(function(num){
    return num % 2 === 0;
})

console.log("Question 4 :", even);
console.log( "-------------------");

/* ------------------------------ */

// Question 5
let firstArr = [1, 2, 3];
let secondArr = [4, 5, 6];

let mergeData = [...firstArr, ...secondArr];
console.log("Question 5 :", mergeData);
console.log( "-------------------");
/* ------------------------------ */

// Question 6
console.log("Question 6 :");
let currentDay = 2;

switch(currentDay) {
    case 1:
        console.log("sunday");
        break;
    case 2:
        console.log("monday");
        break;
    case 3:
        console.log("tuesday");
        break;
    case 4:
        console.log("wednesday");
        break;
    case 5:
        console.log("thursday");
        break;
    case 6:
        console.log("friday");
        break;
    case 7:
        console.log("saturday");
        break;

    default:
    console.log("Invalid day");
}
console.log( "-------------------");
/* ------------------------------ */

// Question 7
let word = ["a", "ab", "abc"];

let wordLength = word.map(function(item) {
    return item.length;
});

console.log("Question 7 :", wordLength);
console.log( "-------------------");
/* ------------------------------ */

// Question 8
function checkNum(num) {
    if(num % 3 === 0 && num % 5 === 0) {
        return "divisible by both";
    }

    return "not divisible";
}
console.log("Question 8 :", checkNum(15));
console.log( "-------------------");
/* ------------------------------ */

// Question 9
const arrowFun = (num) => {
    return num * num;
};

console.log("Question 9 :", arrowFun(5));
console.log( "-------------------");
/* ------------------------------ */

// Question 10
const user = {
    name: "Mohamed",
    age: 38,
};

function getInfo({ name, age }) {
    return `${name} is ${age} years old`;
}

console.log("Question 10 :", getInfo(user));
console.log( "-------------------");
/* ------------------------------ */

// Question 11
function sum(...numbers) {
    let total = 0;
    for(let i = 0; i < numbers.length; i++)  {
        total += numbers[i];
    }

    return total;
}
console.log("Question 11 :", sum(1, 2, 3, 4, 5));
/* ------------------------------ */

// Question 12
function getMessage() {
    return new Promise(function(resolve) {
        setTimeout(() => {
            resolve("success");
        }, 3000);
    })
}

getMessage().then(function(result) {
    console.log("Question 12 :", result);
});
console.log( "-------------------");
/* ------------------------------ */

// Question 13
function largeNum(array) {
    return Math.max(...array);
}

console.log("Question 13 :", largeNum([1, 3, 7, 2, 4]));
console.log( "-------------------");
/* ------------------------------ */

// Question 14
const userData = {
    name: "Mohamed",
    age: 38,
};

let keys = [];

for (let key in userData) {
    keys.push(key);
}

console.log("Question 14 :", keys);
console.log( "-------------------");
/* ------------------------------ */

// Question 15
let allText = "The quick brown fox";

let words = allText.split(" ");

console.log("Question 15 :", words);
console.log( "-------------------");
/* ------------------------------ */