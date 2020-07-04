// 동기와 비동기
// 자바스크립트는 동기적이다
// (호이스팅 되는 것들은 제일 위로 올라 가고) 작성한 순서대로 하나하나씩 동기적으로 실행된다

// 동기
// - 동시에 일어난다. 요청이 오면 바로 결과를 줘야 한다
// - 근데 처리에 시간이 오래 걸리면? 무조건 기다렸다가 결과 받고 다음 코드로 넘어감

// 비동기
// - 동시가 아니다. 요청만하고 다음 코드로 넘어감.
// - 결과는 나중에 나오면 그때 실행하겠다

console.log("1");
console.log("2");
console.log("3");
console.log("4");

// 순서대로 출력된다

console.log("1");
setTimeout(function () {
  console.log("2");
}, 1000);
console.log("3");
console.log("4");

// 근데 얘는? 순서대로가 아니라 1,3,4,2 순서로 출력된다
// 위에서부터 순서대로 실행하다가
// web API를 만나면 일단 web으로 넘기고 나중에 걔가 다 되면 실행
// 그리고 실행되는 걸 기다리지 않고 다음 코드를 실행

// 콜백함수: 지금 실행하지 말고 나중에 조건 충족되면 그때 다시 불러서 실행해줘 call back해줘

// 동기 콜백함수와 비동기 콜백함수가 있다

// 이 함수는 aaa라는 콜백을 받아서 바로 실행을 시키는 콜백함수다
// 그래서 동기 콜백
function printImm(aaa) {
  aaa();
}
printImm(() => console.log("Hello"));

// 얘는 2초 뒤에 출력되는 비동기 콜백함수
function printDelay(print, timeout) {
  setTimeout(print, timeout);
}
printDelay(() => console.log("Hi(delay)"), 2000);
