// 즉시 실행 함수
let abc = (function () {
  console.log("hello");
})();

abc = {
  a: 1,
  b: "asd",
  3: "er",
};

console.log(abc["a"]);
