// 프로미스 (자바스크립트 내장 객체)
// 비동기적인 것을 수행할 때 콜백 대신에 사용할 수 있는 오브젝트
// state: pending(수행중일 때) -> fulfilled(완료하면) or rejected(실패하면)
// producer(원하는 기능을 수행해서 데이터를 만들어 내는 놈)
// consumer(데이터를 소모하는 놈)

// 1. producer
// promise는 클래스라서 new로 오브젝트를 만들 수 있다
// 프로미스를 만드는 순간 우리가 전달한 콜백함수가 바로 실행이 된다
// 만약 프로미스 안에 시간이 오래 걸리는 코드가 있으면 프로미스가 만들어지는 그 순간 일단 실행이 된다
// 근데 사용자가 요청하지 않았을 때는 필요가 없는 것들까지 다 프로미스로 하면 낭비다
// 그래서 사용자의 요청과 상관없이 필요한 것들만 프로미스 사용하자

const promise = new Promise((resolve, reject) => {
  console.log("doing something...");
  setTimeout(() => {
    resolve("ellie"); //resolve는 문제없이 완료했을 때 실행
    // reject(new Error("no network")); // 실패했을 때 에러 표시
  }, 2000);
});

// 2. consumers (then, catch, finally를 이용해서 값을 받아올 수 있음)

// 프로미스가 성공적으로 잘 수행이 되면, 그러면(then) 받아온 값으로 이 콜백함수를 실행할 거야
// promise.then((value) => {
//   console.log(value);
// });

// 프로미스가 실패하면? catch를 사용해서 에러가 발생했을 때 어떻게 처리할지에 대한 함수를 만든다
// promise.catch((error) => {
//   console.log(error);
// });

// 이렇게 then이랑 catch랑 붙여서 적을 수 있네
// promise
//   .then((value) => {
//     console.log(value);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// finally는 성공/실패랑 상관없이 항상 실행되는 함수(아무런 인자도 안 받는다)

promise
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => console.log("finally"));

// 3. promise chaining

// 1초 후에 1을 전달하는 프로미스
const fetchNumber = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
});

// fetchNUmber라는 프로미스가 성공하면
// 그 값을 전달 받아서 then 2를 곱하고
// 2 곱한 값을 전달 받아서 then 3을 곱하고
// 또 그 3을 곱한 값을 전달 받아서 then 새로운 프로미스에 보낼 거다
// 새로운 프로미스는 1초 후에 -1한 값을 전달한다
// 그 값을 전달 받아서 then 출력할 거다

// *then은 값을 전달할 수도 있고 또 다른 프로미스를 전달할 수도 있다

fetchNumber
  .then((num) => num * 2) //2
  .then((num) => num * 3) //6
  .then((num) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(num - 1), 1000);
    });
  })
  .then((num) => console.log(num)); //5

// 4. 에러 핸들링

// const getHen = () =>
//   new Promise((resolve, reject) => {
//     setTimeout(() => resolve("닭"), 2000);
//   });

// const getEgg = (hen) =>
//   new Promise((resolve, reject) => {
//     setTimeout(() => resolve(`${hen} => 달걀`), 3000);
//   });

// const cook = (egg) =>
//   new Promise((resolve, reject) => {
//     setTimeout(() => resolve(`${egg} => 후라이`), 1000);
//   });

// getHen()
//   .then((hen) => getEgg(hen)) //.then(getEgg) 로 줄여서 쓸 수 있음
//   .then((egg) => cook(egg)) // .then(cook)으로 줄일 수 있다
//   .then((meal) => console.log(meal)); // .then(console.log); 로 줄일 수 있다.

// ------------------- 닭-> 달걀에서 문제가 생겼을 때 -------------------

const getHen = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve("닭"), 2000);
  });

const getEgg = (hen) =>
  new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error(`error! ${hen} => 달걀`)), 3000);
  });

const cook = (egg) =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${egg} => 후라이`), 1000);
  });

getHen()
  .then((hen) => getEgg(hen)) //.then(getEgg) 로 줄여서 쓸 수 있음
  .catch((error) => {
    return "오리알";
  }) // 달갈 받아올 때 문제가 생기면 달갈 대신 오리알을 주겠다
  .then((egg) => cook(egg)) // .then(cook)으로 줄일 수 있다
  .then((meal) => console.log(meal)) // .then(console.log); 로 줄일 수 있다.
  .catch(console.log); // catch를 맨 밑에 두면 중간에서 에러가 생겨도 제일 밑에 있는 catch에 전달이 된다
