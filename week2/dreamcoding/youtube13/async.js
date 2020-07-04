// async, await은 프로미스를 좀 더 간결하고 간편하고 동기적으로 실행되는 거처럼 보이게 만들어 주는 놈
// then을 계속 이어서 많이 썼을 때 async, await 사용한다

// 1. async 사용법

function fetchUser() {
  return "ellie";
}

const user = fetchUser();
console.log(user);

// 만약에 fetchUser가 오래 걸리는 코드면?
// 동기적으로 처리되기 때문에 아무거도 안 하고 그냥 기다려야 한다
// 그래서 프로미스를 사용한다

function fetchUser2() {
  return new Promise((resolve, reject) => {
    return "ellie2";
  });
}

const user2 = fetchUser2();
console.log(user2);
// Promise { <pending> } 라고 출력됨, resolve, reject다 호출 안 해서
// 아직 실행중이다(준비중이다)라는 완료 전 단계의 pending 상태이다
// 그래서 프로미스 안에는 resolve나 reject가 있어야 한다

function fetchUser3() {
  return new Promise((resolve, reject) => {
    resolve("ellie3");
  });
}

const user3 = fetchUser3();
user3.then((user3) => console.log(user3));
console.log(user3);

// async를 사용하면?

async function fetchUser4() {
  return "ellie4";
}

const user4 = fetchUser4();
user4.then((user4) => console.log(user4));
console.log(user4);

// function 앞에 async를 쓰면 자동으로 프로미스로 바뀐다

// 2. await

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getApple() {
  await delay(3000);
  return "apple";
}

async function getBanana() {
  await delay(1000);
  return "banana";
}

// function pickFruits() {
//   return getApple().then((apple) => {
//     return getBanana().then((banana) => `${apple} + ${banana}`);
//   });
// }

// 위의 코드를 이렇게 await를 사용해서 바꾼다

// async function pickFruits() {
//   const apple = await getApple(); // 사과 받을 때까지 기다려
//   const banana = await getBanana(); // 바나나 받을 때까지 기다려
//   return `${apple} + ${banana}`; // 기다려서 받은 값을 리턴
// }

// 근데 사과 기다리고 그 다음에 바나나 기다려야 한다
// 사과랑 바나나는 서로 순서도 상관없고 관련이 없기 때문에
// 동시에 따로따로 준비를 시키면 실행 속도를 높일 수 있다

async function pickFruits() {
  const applePromise = getApple(); //사과 요청하고 기다리지 않고 넘겨
  const bananaPromise = getBanana(); // 바나나 요청하고 기다리지 않고 넘겨
  const apple = await applePromise; // 여기서는 기다려
  const banana = await bananaPromise; // 기다려
  return `${apple} + ${banana}`; // 기다려서 받은 값을 리턴
  // 사과랑 바나나를 동시에 병렬적으로 준비하기 때문에 시간을 단축할 수 있다
}

// pickFruits().then(console.log);

// 3. 위의 코드를 간단하게 정리하기

// Promise.all([]) 배열 안에 요청하고 기다릴 것들을 넣어 놓으면 자동으로 동시에 요청해서 병렬적으로 처리가 된다
function pickAllFruits() {
  return Promise.all([getApple(), getBanana()]).then((fruits) =>
    fruits.join(" + ")
  );
}

pickAllFruits().then(console.log);

// race는 배열 안에 넣어 둔 것들을 동시에 요청하지만 그 중 가장 빨리 처리된 1개의 값만 사용할 때
function pickOnlyOne() {
  return Promise.race([getApple(), getBanana()]);
}
pickOnlyOne().then(console.log);
