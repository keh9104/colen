// 1. 배열을 하나의 문자열로 만들기
const fruits = ["apple", "banana", "orange"];

// join은 배열을 하나의 문자열로 만들어 준다 ('/') 이런식으로 넣으면 사이사이에 /로 구분이 되고 ('-') 등등 원하는 거 넣으면 됨
const result = fruits.join();
console.log(result);

// 2. 문자열을 배열로 만들기

// split() 인자 값에 끊을 단위를 넣어주면 그거로 끊어서 자동으로 배열로 만들어줌
// 두번째 인자값으로는 배열의 크기를 지정할 수 있다
const result2 = result.split(",");
console.log(result2);

// 3. 배열을 역순으로 정렬하기
const array3 = [1, 2, 3, 4, 5];

// 배열의 순서를 바꾼다
const result3 = array3.reverse();
console.log(result3);
// 근데 바꾼 걸 새로운 변수에만 넣는 게 아니라 원래 있던 걸 바꾸고 그걸 새로운 변수에 할당하는 거라서
// 기존의 array도 역순으로 되어있다
console.log(array3);

// 4. 배열에서 특정한 거만 뽑기
const array4 = [1, 2, 3, 4, 5];

// splice(시작인덱스, 삭제할 개수)
// 원래 배열에서 얘부터 몇개를 삭제한다
// 그리고 리턴값은 삭제된 녀석들
// 그래서 리턴값을 변수에 담는다? -> 원래 배열에서 뽑아 오기(근데 기존 배열이 망가짐...)
// 리턴값 버리고 원래 배열을 쓴다?  -> 원래 배열에서 삭제하기
const result4 = array4.splice(2, 3);
console.log(result4); //[3,4,5]
console.log(array4); //[1,2]

// slice(시작인덱스, 마지막인덱스)
// 이 인덱스부터 저 인덱스 앞까지 (인자 2개 다 인덱스값이 들어간다!)
// 마지막 인덱스는 포함 안 됨. 마지막 인덱스 앞까지
// 인자 1개만 주면 그 인덱스부터 끝까지
// 얘는 기존의 배열을 그대로 놔두고 (splice는 기존의 배열에서 해당 부분 삭제)
// 원하는 부분만 리턴시킬 수 있다 (기존 배열 유지시킬 수 있다)
const array44 = [1, 2, 3, 4, 5];
const result44 = array44.slice(2);
console.log(result44);

/////////////////// 클래스 활용 ////////////////////////

class Student {
  constructor(name, age, enrolled, score) {
    this.name = name;
    this.age = age;
    this.enrolled = enrolled;
    this.score = score;
  }
}

const students = [
  new Student("A", 29, true, 45),
  new Student("B", 28, false, 80),
  new Student("C", 30, true, 90),
  new Student("D", 40, false, 66),
  new Student("E", 18, true, 88),
];

// 5. 점수가 90점인 학생 찾기

// find() 의 첫번째 인자에는 함수가 들어가야 한다
// 배열에서 그 함수의 조건을 만족하는 값을 리턴한다

// let arrFind = arr.find(function(조건에 쓸 인자를 받아오자){
//     return 받아온 인자로 조건문 만들기
// })
// 이렇게 하면 배열에서 해당 조건에 해당하는 게 반환된다
// 반환 되는게 숫자면 숫자로, 객체면 객체로, 문자열이면 문자열로 리턴된다

const result5 = students.find(function (student) {
  //   console.log(student, index);  //콘솔로 확인해보기
  return student.score === 90;
});
console.log(result5);

const result55 = students.find(function (a) {
  return a.age < 20;
});
console.log(result55);

// 6. enrolled가 true인 것만 가져오기

// filter도 find랑 같은 방식이다
//근데 find는 1개를 찾는 거고 filter는 배열에 해당 조건 만족하는 모든 것을 배열에 담는 거다
const result6 = students.filter(function (s) {
  return s.enrolled == true;
});

console.log(result6);

// 7. 점수만으로 새로운 배열 만들기

// map() 배열에 있는 각각의 값을 함수를 돌려 새로운 값을 만들어서 새로운 배열에 담는 함수
const result7 = students.map(function (b) {
  return b.score;
});
console.log(result7);

// 8. 50점보다 낮은 학생 있으면 true 없으면 false 리턴 시키기

// some() 배열에 있는 각각의 값을 함수를 돌려 하나라도 참이면 true 다 거짓이면 false
// every()는 모두 참이면 true 하나라도 거짓이면 false가 리턴된다

const result8 = students.some(function (q) {
  return q.score < 50;
});
console.log(result8);

const result88 = students.every(function (k) {
  return k.score > 45;
});
console.log(result88);

// 9. 점수 평균값 구하기

// reduce() 는 배열을 돌면서 값을 누적한다...?
// reduce에는 2가지 매개변수가 있다
// 첫번째는 콜백함수, 두번째는 콜백함수의 최초값
// 콜백함수에는 4가지 매개변수가 있다
// - 이전 콜백에서 반환된 값 or 최초값(설정되어있으면)
// - 현재 처리하려고 하는 값
// - 현재 처리하려고 하는 값의 인덱스
// - 원래 배열

// 그래서 배열에서 점수만 뽑아와서 더하고 싶으면
// 첫번째 인자값(이전 함수 실행 후 리턴되는 값)에 점수를 더해서 담아 놓자 그러려면?
// 두번째 인자값에서 점수를 뽑고, 첫번째 인자값에다가 더해주는 함수를 만든다
// 그리고 첫번째 인자값의 최초값에는 0을 설정해준다
// 실행 시키면 첫번째 바퀴에서 첫번째 인자값은 0, 두번째 인자값에서 점수 뽑아서 첫번째 인자값에 더해준다(이게 리턴됨)
// 두번째 바퀴에서 첫번째 인자값은 더해진 점수가 담겨있고, 두번째 인자값에서 또 점수를 뽑아서 첫번째 인자값에 더해준다
// 세번째 바퀴에서 첫번째 인자값은 2개의 점수가 더해진 게 담겨있고, 두번째 ...(반복반복)
const result9 = students.reduce(function (sum, student, curinex) {
  currentScore = student.score;
  return (sum = sum + currentScore);
}, 0);

// 점수 합계
console.log(result9);

// 평균
console.log(result9 / students.length);

// 10. 점수를 문자열로 만들기

// map으로 점수만 있는 새로운 배열 만들고
// 1. result10에 담을 때 join해서 담기
const result10 = students
  .map(function (u) {
    return u.score;
  })
  .join();
console.log(result10);

// 2. 콘솔 찍을 때 join해서 문자열 출력
// console.log(result10.join());

// 11. 뽀너스: 점수 오름차순 정리하고 문자열로 바꾸기

// 배열.sort()
// 배열에 문자가 있으면 abc 순서로 정렬된다
// 숫자면?
// 오름차순 하고 싶으면 function(x,y){return x-y}
// 내림차순 하고 싶으면 function(x,y){return y-x}

const result11 = students
  .map(function (h) {
    return h.score;
  })
  .sort(function (x, y) {
    return x - y;
  })
  .join();
console.log(result11);
