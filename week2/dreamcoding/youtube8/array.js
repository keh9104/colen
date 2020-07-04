// 배열
// 순서가 있다. 인덱스값은 0부터 시작한다
// 배열에는 모든 타입의 데이터가 들어갈 수 있고 섞어서 넣어도 된다
// 하지만 웬만하면 하나의 배열에는 한가지 타입만 넣자

// 1. 배열 선언하는 방법
const arr1 = new Array(); // 방법 1
const arr2 = [1, 2]; //방법 2 (많이 사용)

// 2. 인덱스
const fruits = ["apple", "banana"];
console.log(fruits);
console.log(fruits.length);
console.log(fruits[0]);
// 객체에서 []안에 키를 넣으면 그 키에 해당하는 벨류값을 받아올 수 있었던 거처럼
// 배열에서 []안에 인덱스값을 넣으면 그 인덱스에 해당하는 값을 받아올 수 있다.
console.log(fruits[fruits.length - 1]); //마지막 인덱스 쉽게 찾으려면 길이에 -1 하면 된다

// 3. 배열로 반복문 돌리기
// 3.1 for문
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

// 3.2 for of 문
for (let fruit of fruits) {
  console.log(fruit);
}

// 3.3 forEach 문 - 배열 0번부터 끝까지 하나씩 돌아가면서 실행
fruits.forEach(function (fruit, index) {
  console.log(fruit, index);
});

// 4. 배열 안의 값 추가, 삭제, 복사

fruits.push("strawberry", "peach"); // 맨 마지막에 추가
console.log(fruits);

fruits.pop(); //맨 마지막 1개 삭제
console.log(fruits);

fruits.unshift("mango", "lemon", "grape"); // 앞에 추가
console.log(fruits);

fruits.shift(); // 맨 앞 1개 삭제
console.log(fruits);

// 주의!!
// ushift와 shift는 push와 pop보다 느리다. 많이 느리다.
// 앞의 값을 넣거나 빼면 그 뒤의 모든 값들의 인덱스값을 바꾸어 주어야 하기 때문에!

// splice(시작 인덱스, 지울 개수, 추가할 값, 추가할 값, ...)
// 지울 개수 넣지 않으면 끝까지 다 삭제
// fruits.splice(2); //이러면 인덱스 2부터 끝까지 다 지움
// fruits.splice(3, 1); //이러면 3번 인덱스값 1개만 지움
// fruits.splice(1, 1, "orange", "pineapple"); //이러면 1번 인덱스에 있는 거 1개 지우고 2개를 추가, 그 뒤의 것들은 인덱스값 다 밀린다
// fruits.splice(1, 0, "watermelon"); // 이러면 삭제는 안 하고 해당 인덱스 값에 추가만 됨
console.log(fruits);

// 배열 합치기
const fruits2 = ["과일1", "과일2", "과일3"];
const newFruits = fruits.concat(fruits2); // fruits 뒤에 fruits2가 추가된다
console.log(newFruits);

// 5. 검색하기
// 어떤 값이 몇번째 인덱스에 있는지 검색
console.log(newFruits.indexOf("과일1")); //몇번째 인덱스니? 없는 값은 -1 출력
console.log(newFruits.includes("과일7")); //배열 안에 포함되어 있니? T/F

// 6. lastIndexOf
newFruits.unshift("과일1");
console.log(newFruits);
console.log(newFruits.indexOf("과일1")); //과일1이 2개 있는데 가장 처음에 있는 과일1의 인덱스값 출력
console.log(newFruits.lastIndexOf("과일1")); // 값이 여러 개일 때 마지막 인덱스 값 출력
