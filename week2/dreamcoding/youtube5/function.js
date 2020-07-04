// 함수란 특정한 기능을 하는 것
// function 을 sub-program이라고도 한다(프로그램 안의 작은 프로그램), 프로그램을 구성하는 기본적인 블록
// 여러번 재사용 가능함
// input(파라미터, 매개변수)을 받아서 output(결과값)을 내는 것

// 1. 자바스크립트에서의 함수 선언
// function 이름(매개변수1, 매개변수2) {내용... return;}
// 하나의 함수는 한가지 기능만 하도록 만들어야 한다
// 함수의 이름은 이 함수가 어떤 기능을 하는지 나타내는 동사, 명령어 같은 것들로 지으면 좋다
// 자바스크립트에서 함수는 객체이다

function printHello() {
  console.log("Hello");
}
printHello(); //함수를 실행만 할 수 있음

function log(message) {
  console.log(message);
}
log("아무거나 출력해줘"); //전달인자값에 따라 결과값이 달라짐
log(333);

// 2. parameter (매개변수)
// premitive parameters: 값(벨류)가 그대로 전달
// object parameters: 레퍼런스가 전달

function changeName(obj) {
  obj.name = "coder";
}
const ellie = { name: "ellie" };
changeName(ellie); //ellie.name = 'coder'로 할당한다
console.log(ellie); //coder가 출력

// 3. default parameters
function showMessage(message, from = "unknow") {
  //매개변수값에 직접 디폴트값을 넣을 수 있다. 매개변수에 값이 전달되지 않았을 때 디폴트 값으로 실행
  console.log(`${message} by ${from}`);
}
showMessage("Hi~");
// 매개변수는 2개인데 전달인자가 1개이면 2번째 매개변수값에는 아무값도 없으니까 undefined가 출력됨

// 4. rest parameters
function printAll(...args) {
  // ... 이렇게 점 세 개 찍고 시작하면 배열 형태로 전달됨
  for (let i = 0; i < args.length; i++) {
    console.log(args[i]);
  }
}

function printAll2(...args) {
  for (const arg of args) {
    console.log(arg);
  }
}
printAll("dream", "coding", "ellie");
printAll2("dream2", "coding2", "ellie2");

// 5. Local scope
// 밖에서는 안이 보이지 않지만 안에서는 밖을 볼 수 있다!
let globalMessage = "global"; //글로벌 변수
function printMessage() {
  let message = "hello"; //지역 변수
  console.log(message);
  console.log(globalMessage);
  function printAnother() {
    console.log(message);
    let childMessage = "hello"; //얘는 블록의 블록 안에 있으니까 밖에서는 당연히 안 보이고 첫번째 블록에서도 볼 수 없다
  }
}
printMessage();

// 6. return a value
function sum(a, b) {
  return a + b;
}
const result = sum(1, 2);
console.log(`sum: ${sum(1, 2)}`);

// 7. early return, early exit

//블록 안에 로직을 넣는 거 보다
function upgradeUser(user) {
  if (user.point > 10) {
    로직로직로직로직;
  }
}

// 이렇게 아닌 것들을 미리 빨리 제외시키고 로직을 적는 게 더 좋다
function upgradeUser2(user) {
  if (user.point <= 10) {
    return;
  }
  로직로직로직로직;
}

// first-class function
// 함수는 변수로 취급된다
// 다른 변수 안에 할당될 수 있다
// 매개변수로 전달될 수 있다
// 다른 함수에서 return될 수 있다

// 1. 함수 표현식
// 함수 표현식은 함수를 호출하기 전에 먼저 함수를 정의해줘야 함
// 함수 선언식은 호이스팅 됨

const print = function () {
  //anonymous function: 이름 없는 함수
  // 이름 없는 함수를 변수 안에 넣었다, 근데 변수 안에 넣었어도 function 옆에 이름을 정해줘도 된다
  console.log("print");
};
print();
const printAgain = print; // 다른 변수에 함수를 할당할 수 있다
printAgain();
const sumAgain = sum;
console.log(sumAgain(1, 3));

// 2. 콜백함수
// 상황에 따라서 필요할 때 불러오는 함수를 콜백함수라고 한다
function randomQuiz(anser, printYes, printNo) {
  if (anser === "love you") {
    printYes(); //얘가 콜백함수
  } else {
    printNo(); //얘도 콜백함수
  }
}

const printYes = function () {
  //이름 없는 함수
  console.log("yes!");
};

const printNo = function print() {
  //이름 있는 함수
  console.log("no!");
};

randomQuiz("hate you", printYes, printNo);
randomQuiz("love you", printYes, printNo);

// 화살표 함수
// 얘는 항상 이름 없는 함수
// 함수 로직이 한줄이면 블록{}도 필요없다
const simplePrint = function () {
  console.log("simplePrint");
};

// 위에 있는 함수 표현식을 이렇게 표현하는 게 화살표 함수
const simplePrint2 = () => console.log("simplePrint");

const add = (a, b) => a + b;

// IIFE: immediately invoked function expression (함수를 선언함과 동시에 실행)
(function hello() {
  console.log("IIFE");
})();
