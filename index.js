//bonus Task
//if we have multiple request use Promise.all([requestOne,requestTwo,....three])
//we get an array inside it we have two or more request we can map it
//if we get error from first request we can get data also from second one. Thats why we need to use Promise.allSettled([requestOne,requestTwo,....three])
//but the structure is different (res.value.data)
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
let [city] = process.argv.slice(2);
if (city) {
  let requestOne = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`
  );
  let requestTwo = axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.API_KEY}&units=metric`
  );

  Promise.allSettled([requestOne, requestTwo]).then((res) => {
    const [result1, result2] = res;
    // console.log(result1);
    // console.log(result2);
    if (result1.status === "fulfilled") {
      //there is always data inside zhe response
      console.log(result1.value.data.main.temp);
    }
    if (result2.status === "fulfilled") {
      console.log(result2.value.data);
    }
  });
}

//Promise.race([promise1,promise2,promise3]
//.then(winPromise=>console.log(winPromise))==>from which API we get first data the other ones ignore.
//Promise.race([promise1,promise2,promise3]).then(winPromise=>console.log(winPromise))
//I can accept the fastest one

/* function promiseOne(){
    return (new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve("I am resolved ,promise one")
        },3000)
    }))
}

function promiseTwo(){
    return (new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve("I am resolved ,promise Two")
        },4000)
    }))
}
function promiseThree(){
    return (new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve("I am resolved ,promise Three")
        },6000)
    }))
} */

//
/* Promise.race([promiseOne(),promiseTwo(), promiseThree() ])
.then(result=>console.log(result)) */
