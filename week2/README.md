# 2주차

---

## 자바스크립트 스코프(scope)

<br>
<br>
scope - 범위, 영역, 시야, ...   <br>
자바스크립트에서 스코프란?    <br>
변수에 접근할 수 있는 범위!    <br>
<br>
스코프에는 두 가지 종류가 있다.    <br>
1. 전역 스코프 (global scope)<br>
    - 변수가 함수 밖이나 블록{} 밖에 선언되었을 때<br>
2. 지역 스코프 (local scope)   <br>
    - 변수가 함수 안이나 블록{} 안에 선언되었을 때<br>

<br>
전역 스코프는 어느 곳에서든지 해당 변수에 접근할 수 있음.   <br>
지역 스코프는 해당 지역에서만 접근할 수 있고 다른 곳에서는 접근할 수 없음.   <br>
<br>
<br>
--------------------------------

## 자바스크립트 클로저(clouser)

<br>
<br>
클로저란?   <br>
    - 함수 안에 함수가 있는 것.<br>
    - 내부 함수가 정의될 때 외부 함수의 환경을 기억하고 있는 내부 함수.<br>
    - 함수 내부에 만든 지역 변수가 사라지지 않고 계속 값을 유지하고 있는 것     <br>
    
함수의 실행이 끝나면 그 함수의 데이터가 소멸된다.   <br>
근데 클로저를 사용하면 그 함수 안의 변수 데이터를 유지시킬 수 있다.   <br>
...<br>
function outerFunc() {   <br>
    var x = 10;   <br>
    var innerFunc = function() {   <br>
        console.log(x);   <br>
    }   <br>
    return innerFunc;   <br>
   <br>
var abc = outerFunc();   <br>
...<br>

이렇게 하면 var abc에 outerFunc의 리턴값을 할당한다. <br>
그리고 outerFunc는 결과값을 리턴했으니까 이제 끝난 거다. <br>
그러면 결국 abc에는 리턴값인 innerFunc라는 함수가 할당 된다 <br>
근데 innerFunc는 outerFunc의 함수 안에 있는 함수다. <br>
그리고 위에서 말했듯 outerFunc는 값을 리턴했으니까 끝난 함수이다. <br>
그러면 abc를 실행하면? <br>
10이 출력 (outerFunc 안의 지역 변수 x에도 접근할 수 있다)<br>

---

## 호이스팅(hoisting)

<br>
<br>
hoist - 끌어 올리다, 들어 올리다   <br>
자바스크립트에서 호이스팅이란?<br>
- 자바스크립트가 실행되기 전에 모든 내용을 싹 훑어 보고, 호이스팅 대상이 되는 것들을 유효 범위 내에서 최상단으로 끌어 올리는 것.<br>
<br>
호이스팅의 대상?<br>
- var로 선언 된 변수와 함수<br>
- 함수선언문 (function 이름(){})으로 표현된 함수<br>

<br>
<br>
------------------------------------

## 프로토타입(prototype)

<br>
<br>
자바스크립트는 클래스(class)가 없는 대신 프로토타입(prototype)을 사용해서 상속받거나 코드를 재사용하거나 할 수 있다.   <br>
<br>
<br>
자바스크립트에서 객체는 언제나 함수로 생성된다.   <br>
function Person(){};   // 함수   <br>
var HongGilDong = new Person();   //함수로 객체를 생성    <br>
<br>
일반적으로 객체를 만들 때   <br>
var abc = {};   <br>
이렇게 만드는데 이 코드는 사실 아래의 코드를 줄여 쓴 것이다.  <br>
var abc = new Objecct();  //Object는 우리가 선언한 함수가 아니라 자바스크립트에서 기본적으로 내장되어있는 함수이다.   <br>
아무튼 함수를 만들면 2가지 일이 일어난다   <br>
1. 해당 함수에 constructor(생성자) 자격이 부여됨.   <br>
    - 생성자 자격이 있는 것만 new를 통해서 새로운 객체를 만들 수 있음(함수가 아니면 new를 사용할 수  없다)   <br>
2. 해당 함수의 Prototype Object 생성 및 연결   <br>
    - 함수를 만들면 함수 안에 자동적으로 prototype이라는 속성이 만들어 지고, 해당 함수와 연결되어 있는 프로토타입 객체가 따로 만들어 진다.    <br>
<br>
<br>  
function Person(){};   <br>
라고 하면 자동으로 prototype이라는 속성이 만들어 지고   <br>
메모리 어딘가에 Person의 프로토타입 객체(object)가 만들어 진다.   <br>
그리고 속성 prototype으로 그 프로토타입 객체에 접근할 수 있다.   <br>
이 프로토타입 객체는 Person함수로 만들어진 다른 모든 객체에서 접근할 수 있다.   <br>
<br>
그래서   <br>
function Person(){   <br>
    this.job = "학생";   <br>
    this.major = "베트남학과";   <br>
}   <br>
   
let hong = new Person();    <br> 
let kim = new Person();    <br> 
이런 식으로 객체를 여러번 만들면 각각의 객체 안의 변수가 모두 메모리에 할당되니까 즇지 않다  <br>
(객체 100개 만들면 변수는 200개가 다 메모리에 할당된다)  <br>
<br>
프로토타입을 사용하면?  <br>
function Person(){};   <br>
   
Person.prototype.job = "학생";   <br>
Person.prototype.major = "베트남학과";   <br>
   
let hong = new Person();   <br>
let kim = new Person();   <br>
<br>
console.log(hong); //Person{}  <br>
hong, kim이라는 객체 안에는 아무런 변수가 없다  <br>
console.log(hong.job); // 학생  <br>
하지만 프로토타입 객체에 있는 변수에 접근이 가능하다  <br>
<br>
<br>
결론: 여러 객체에서 공통적으로 사용되는 변수들은 프로토타입 객체에 넣어서 메모리를 아끼자.  <br>
<br>
<br>
-------------------------------------------

## promise, await, async

<br>
<br>
프로미스란?   <br>

자바스크립트에서 비동기적으로 처리할 때 사용되는 객체 <br>

콜백만 사용했을 때 비동기 코드 중에서도 순서가 필요한 경우에 에러가 발생하는 것을 해결할 때 사용한다. <br>

(지금은 값이 없으니까 나중에 값 나오면 보내줄게라고 약속하는 거) <br>

프로미스의 3가지 상태 <br>

1. pending - 수행 중인 상태, 처리 중인 상태 <br>
2. fulfilled - 완료 <br>
3. rejected - 실패(에러)<br>

프로미스 생성하고 거기에 작업(요청)에 성공했을 때 실행할 함수(resolve)와 만약 에러가 발생했을 때 실행될 함수(reject)를 작성해준다. <br>
실행할 때는 then으로 순서를 지정해서 그 순서에 맞게 처리하게 할 수 있고 중간중간 catch를 넣어서 에러가 났을 때 어떻게 처리할 건지 작성해주면 된다. <br>
(드림코딩 자바스크립트 12강 참조) <br>
<br>
<br>
async란? <br>
async는 프로미스를 좀 더 쉽게 사용할 수 있게 도와준다. <br>
함수 선언 앞에 async를 추가하면 자동으로 프로미스 함수가 된다. <br>
<br>
function fetchUser() { <br>
return new Promise((resolve, reject) => { <br>
resolve("ellie"); <br>
}); <br>
} <br>

const user = fetchUser3(); <br>
user.then((user) => console.log(user)); <br>
console.log(user); <br>
이렇게 프로미스를 사용한 코드는 아래의 async를 사용한 코드와 똑같은 코드이다. <br>
<br>
async function fetchUser() { <br>
return "ellie"; <br>
}<br>

const user = fetchUser(); <br>
user.then((user) => console.log(user)); <br>
console.log(user); <br>
(드림코딩 자바스크립트 13강 참조)<br>

<br>
<br>
await란?   <br>
비동기로 처리되는 것들을 마치 동기적으로 처리되는 것처럼 보이게 코드를 정리할 수 있게 해주는 것.   <br>
await를 사용해서 요청을 기다렸다가 응답이 오면 의도했던 순서대로 실행이 되게 한다.   <br>
await를 사용하지 않으면 요청이 여러 개일 때 요청을 하는 건 순서대로 하지만 요청이 완료되는 건 각각 다르고 의도된 순서대로 처리가 되지 않을 수 있다.   <br>
그래서 await를 사용해서 제각각인 응답의 순서를 의도된 순서로 실행될 수 있게 해준다.   <br>
(드림코딩 자바스크립트 13강 참조)<br>
