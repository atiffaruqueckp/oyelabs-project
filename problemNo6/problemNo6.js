/*6. Imagine you have array of integer from 1 to 100 , the numbers are randomly ordered
, one number from 1 to 100 is missing , Please write the code for finding the missing
number*/

/*
let arr = []
for (let i = 1; i <= 100; i++) {
    if (i != 10) {
        arr.push(i)
    }
}


let input = [...arr]

for(let i=1;i<=100;i++){
    if(!input.includes(i)){
        console.log(i)
    }
}*/


let missingNumBetween1_100 = function(arr){
        let n = Math.max(...arr)
        let sum = n*(n+1)/2;
        let currentSum = 0;
        for(let i =0; i<arr.length; i++){
            currentSum += arr[i];
        }
        return  sum - currentSum;
    }
    
    console.log(missingNumBetween1_100([1,2,4,5,6,7,8,9,10])); // output=> missing number is 3