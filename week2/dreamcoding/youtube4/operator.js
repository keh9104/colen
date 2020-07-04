// 1. string concatenation: 문자열끼리 더하는 것
console.log("my" + "cat");
console.log("1" + 2); // 2가 문자열로 자동으로 변환되어서 12로 출력
console.log(`string literals: 1 + 2 = ${1 + 2}`); // `` 얘는 띄어쓰기 따옴표 등등 모든 걸 다 써도 그대로 출력할 수 있다

// 2. numeric operators: 숫자 연산

console.log(1 + 1); //더하기
console.log(2 - 1); //빼기
console.log(4 / 2); //나누기
console.log(5 % 2); //나머지 값
console.log(2 ** 3); // 2의 3승

// 3. increment and decrement operators: 증가, 감소
let counter = 2;
const preIncrement = ++counter;
//변수 앞에 ++했을 때
//counter = counter +1;
//preIncrement = counter
console.log(`preIncrement: ${preIncrement}, counter: ${counter}`);
//preIncrement에도 3이 할당되었고 counter에도 3이 할당되었다.

const postIncrement = counter++;
//변수 뒤에 ++했을 때
// postIncrement = counter;
// counter = counter + 1;
console.log(`postIncrement: ${postIncrement}, counter: ${counter}`);
// postIncrement에는 +1하기 전의 counter 값이 할당 되기 때문에 3, 그 다음 counter에다가 +1 해준다.

// 4. Assignment operators: 할당 연산자
let x = 3;
let y = 6;
x += y; // x = x + y
x -= y; // x = x - y
x *= y; // x = x * y
x /= y; //x = x / y

// 5. Comparison operators: 비교 연산자
console.log(10 < 6);
console.log(10 <= 6);
console.log(10 > 6);
console.log(10 >= 6);

// 6. logical operators: ||(or), &&(and), !(not)
const value1 = false;
const value2 = 4 < 2; //false

// || (or)
// or은 여러 개 중 하나만 true면 true다
// 근데 앞에 true가 있으면 그대로 종료! 뒤에 꺼는 T/F 상관이 없기 때문에 뒤에 있는 건 실행이 안 된다.
// 간단한 거일 수록 앞에 놓고 복잡하고 시간 오래 걸리는 거일 수록 뒤에 놓는 것이 좋은 코드이다
console.log(`or: ${value1 || value2 || check()}`);

// && (and)
// and는 모두 다 true일 때만 true 하나라도 f이면 f
// 마찬가지로 앞에서 f가 나와버리면 뒤에 있는 것들은 실행되지 않고 바로 종료
// 역시 간단한 걸 앞에 복잡한 걸 뒤에 배치하는 게 좋다
console.log(`and: ${value1 && value2 && check()}`);

function check() {
  for (let i = 0; i < 10; i++) {
    console.log("OTL");
  }
  return true;
}

// ! (not)
// true / false를 바꾸어 준다
console.log(!value1); //value1 이 f이니까 t가 출력된다

// 7. equality
const stringFive = "5";
const numberFive = 5;

//타입은 상관없이 비교(덜 엄격하게 비교)
console.log(stringFive == numberFive); //참
console.log(stringFive != numberFive); //거짓

//타입까지 비교(엄격하게 비교)
console.log(stringFive === numberFive); //거짓
console.log(stringFive !== numberFive); //참

//객체 비교
const abc1 = { name: "xyz" };
const abc2 = { name: "xyz" };
const abc3 = abc1;
console.log(abc1 == abc2); //f const를 쓰면 레퍼런스에 저장되는데 abc1하고 abc2는 다른 레퍼런스에 저장되어 있으니까.
console.log(abc1 === abc2); // 위가 f이니까 당연히 f
console.log(abc1 === abc3); // t
//레퍼런스는 const 썼을 때 객체를 가르키는 이름표 같은 거
//레퍼런스 설명 한번 더 듣기!!!!!!!!!!!!!!!!!!!!!/ㄱㄷㄱ46ㅈㄷ56ㅇ4ㄻ6ㅇ5ㄴㄹ46ㅁ5ㄴ
// 퀴즈
console.log(0 == false); //예상:t 답:t
console.log(0 === false); //예상:f 답: f
console.log("" == false); //예상:t 답: t
console.log("" === false); //예상:f 답: f
console.log(null == undefined); //예상:t 답: t
console.log(null === undefined); //예상:f 답: f

// 8. if문
const name = "ellie";
if (name === "ellie") {
  console.log("Welcome Ellie!");
} else if (name === "coder") {
  console.log("You are amazing coder");
} else {
  console.log("누구니?");
}

// 9. 삼항 비교 연산자
// 조건 ? 참일 때 : 거짓일 때
// 얘는 간단할 때만 사용하기
console.log(name === "ellie" ? "yes" : "no");

// 10. 스위치
// if, else if를 많이 사용해야하는 경우에는 스위치를 사용하는 것이 좋다

const browser = "IE";
switch (browser) {
  case "IE":
    console.log("go away!");
    break; //스위치 쓸 때는 반드시 break 또는 return
  case "Chrome":
  case "Firefox": // 실행값이 똑같으면 이렇게 붙여서 사용해도 된다
    console.log("love you!");
    break;
  default:
    console.log("same all!");
    break;
}

// 11. 반복문
// while(조건) {  //조건이 거짓이 나올 때까지 반복
//    함수
// }

let i = 3;
while (i > 0) {
  console.log(`while: ${i} `);
  i--;
}

// do while
// do {
//     함수
// } while (조건)
// 실행 하고 조건 검사
do {
  console.log(`do while: ${i} `);
  i--;
} while (i > 0);
// 그래서 0이 출력된다.

//for문
//for (begin; condition; step)
for (i = 3; i > 0; i--) {
  console.log(`for: ${i} `);
}

for (let i = 3; i > 0; i = i - 2) {
  console.log(`inline variable for: ${i} `);
}

//이중 for문
//근데 웬만하면 사용하지 마라 cpu에 무리 간다
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    console.log(`i:${i}, j:${j}`);
  }
}

//문제 1: 0부터 10까지 출력하는데 짝수만 출력하기(continue써서)
for (let i = 0; i < 11; i++) {
  if (i % 2 !== 0) {
    continue; //i를 2로 나누어서 0이 아니면(홀수이면) 컨티뉴해라(실행하지말고 그냥 넘어 가라)
  }
  console.log(i);
}

//문제 2: 0부터 10까지 출력하는데 8에서 멈추기(break써서)

for (let i = 0; i < 11; i++) {
  if (i > 8) {
    break;
  }
  console.log(i);
}
