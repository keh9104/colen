// 객체(오브젝트)
// 객체(오브젝트)는 키와 벨류의 집합체이다!

//premitive
const name = "ellie";
const age = 4;
print(name, age);
function print(name, age) {
  console.log(name);
  console.log(age);
}

// 오브젝트
const ellie = {
  name: "ellie",
  age: 4,
};

function print2(person) {
  console.log(person.name);
  console.log(person.age);
}
print2(ellie);

// 1. 오브젝트 만드는 두 가지 방법
const obj1 = {}; //그냥 중괄호 써서 하는 방법
const obj2 = new Object(); //Object라는 클래스(js에 원래 있는 거)를 이용해서 만드는 법

ellie.hasJob = true; // ellie라는 오브젝트에 hasJob = true 라는 프로퍼티 추가
console.log(ellie.hasJob);

delete ellie.hasJob; //오브젝트의 프로퍼티 삭제하기
console.log(ellie.hasJob); //언디파인 출력

// 2. cumputed properties
console.log(ellie.name); // .으로도 접근이 가능하고
console.log(ellie["name"]); // [] 안에 키값을 넣어서 접근할 수도 있다
// 키값은 항상 문자열 타입!! 반드시 ''를 사용해야 한다
ellie["hasJob"] = true; //이런 식으로도 프로퍼티 추가할 수 있다
console.log(ellie.hasJob);

// 근데 웬만하면 .으로 해라
// 코딩하고 있는 순간, 실시간으로 필요하면 .으로 하고
// 코딩 다 하고 나중에 실행할 때 필요하면 []으로 해라

// 오브젝트와 그 오브젝트의 키를 받아와서 벨류를 출력할 때
// 코딩하는 순간에는 obj 안에 key라는 게 없으니까
// obj.key하면 언디파인 나온다
// 그래서 [] 얘를 사용하면 나중에 실행할 때
// obj는 ellie고 ellie 안에 name이라는 키로 벨류를 받아올 수 있다

function printValue(obj, key) {
  //   console.log(obj.key);  //이러면 언디파인
  console.log(obj[key]); //이러면 출력
}
printValue(ellie, "name");

// 3. property value shorthand
const person1 = {
  name: "Bob",
  age: 2,
};
const person2 = {
  name: "Steve",
  age: 5,
};
const person3 = {
  name: "Dave",
  age: 1,
};

// 함수를 사용해서 person4라는 객체 만들기
const person4 = makePerson("Ellie", 30);
function makePerson(name, age) {
  return {
    // name = name;
    // age = age;
    name,
    age,
    // 이렇게 키랑 벨류랑 이름이 같으면 하나만 적어주면
    // 자동으로 그 이름의 키가 생성이 되고 벨류값에는
    // 받아온 인자값이 할당이 된다
  };
}
console.log(person4);

// 5. constructor function
// 클래스를 사용해서 객체를 만드는 것처럼
// 어차피 함수가 템플릿 역할을 하니까.
function Person(name, age) {
  this.name = name; //this를 사용한다
  this.age = age;
}
//클래스를 만들고 그 클래스로 객체 만들 때처럼 new를 써준다
const person5 = new Person("다섯번째 사람", 5);
console.log(person5);

// 6. in operator - 해당하는 객체 안에 키가 있는지 없는지 확인
console.log("name" in ellie); //name이라는 키가 ellie안에 있니? true
console.log("hobby" in ellie); //hobby 키가 ellie안에 있니? false

// 7. for ...in   // for ... of

// ellie안에 있는 키들을 하나하나씩 받아와서 for문 돌린다
for (key in ellie) {
  console.log(key);
}

// array라는 배열 안에 있는 값들을 하나하나씩 받아와서 for문 돌린다
// var i = 0; i < array.lenth; i++   이렇게 for문 돌리는 거보다 훨씬 쉽다
const array = [1, 2, 3, 4, 5];
for (value of array) {
  console.log(value);
}

// 8. cloning 클로닝
const user = {
  name: "ellie",
  age: "20",
};
const user2 = user;

// user와 user2의 레퍼런스는 다르지만 오브젝트는 같다
// 그래서 user2.name으로 접근해서 값을 변경하고
// user를 출력하면 변경된 값이 출력된다.
user2.name = "coder";
console.log(user);

//옛날 방식
const user3 = {};
for (key in user) {
  // user3에 key라는 키값을 추가하고 / 그 키값의 벨류에 user에 들어있는 key의 벨류값을 할당할 거다
  user3[key] = user[key];
}

// 요즘 방식
//Object.assign(새로운 객체, 복사하고 싶은 객체)
const user4 = {};
Object.assign(user4, user);
console.log(user4);

// 요즘 방식2
const user5 = Object.assign({}, user);
console.log(user5);

// 여러 개를 하나로 합치기

const fruit1 = { color: "red" };
const fruit2 = { color: "yellow", size: "big" };
const mixed = Object.assign({}, fruit1, fruit2);
console.log(mixed);
// fruit1과 2가 합쳐지고 중복되는 게 있으면 뒤에 적힌 거로 덮어씌워진다
