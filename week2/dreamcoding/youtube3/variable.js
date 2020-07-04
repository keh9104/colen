"use strict";

// variable(읽기와 쓰기가 가능함)
// let은 ES6에 추가되었다.
// 요즘은 ES6 이전의 문법은 잘 사용하지 않는다.

let globalName = "global name";
// 블록 밖에 선언 된 것은 글로벌 스코프.
// 따라서 블록 밖에서 불러오든, 블록 안에서 불러오든 다 가능
// 글로벌로 선언 되면 시작되고 끝날 때까지 항상 메모리에 저장되어 있어서
// 많이 사용하면 좋지 않다. 최소한으로만 사용하자
//
{
  let name = "ellie";
  console.log(name);
  name = "hello";
  console.log(name); //블록 안에서 선언된 값은 블록 안에서 사용 가능
  console.log(globalName); // 글로벌은 항상 가능
}

console.log(name);
// 블록 스코프 { 중괄호 안에 있는 거 }
// 블록 밖에서 블록 안의 변수를 불러 올 수 없다.
// 블록 안에서만 불러올 수 있다.

console.log(globalName); // 글로벌은 항상 가능

// var는 사용하지 말자
// 왜? 선언 하기 전에 값을 할당할 수도 있음.
// 이것을 var 호이스팅이라고 한다
// 호이스팅(hoisting)?
// hoist - 동사 (흔히 밧줄이나 장비를 이용하여) 들어[끌어]올리다
// 선언된 위치에 상관없이 최상단으로 끌어 올린다 -> 선언된 순서에 상관없이 먼저 읽힌다
// var는 블록 스코프도 무시한다. 블록 안에 넣어놔도 어디에서나 사용할 수 있다

// constant (읽기만 가능함)
// 값을 선언함과 동시에 할당한 뒤에는 다시 재할당을 할 수 없음
// 재할당할 수 없으니까 보안상 좋다
// 변경할 필요가 없으면  처음부터 const를 사용해서 나중에 재선언이나 재할당하는 실수를 막자
const daysInWeek = 7;
const maxNumber = 5;

//immutable data type: 데이터를 변경할 수 없는 것, primitive타입, frozen object같은 것들이 있다
//mutable data type: 데이터를 변경할 수 있는 것, 자바스크립트에서는 기본적으로 모든 객체(오브젝트)는 변경 가능하다.

// 자바스크립트 데이터 타입
// primitive타입: 가장 작은 단위. 더 작은 단위로 쪼개는 거 불가능
// 숫자, 문자열, 불리언, null, undefined, 심볼 같은 타입이 여기에 해당
// object 타입: 위의 싱글 아이템들을 여러 개 묶어서 한 곳에 담아 놓은 것
// 함수 타입: 자바스크립트에서는 함수도 하나의 데이터 타입으로 본다. 다른 데이터 타입처럼 변수에 할당이 가능하고
//            다른 함수의 인자로 전달이 가능하고, 함수를 return할 수도 있다

//숫자타입
//숫자타입이 다른 언어와는 다르게 소수, 긴 숫자 짧은 숫자 나뉘지 않고 하나이다
const count = 17; //정수
const size = 17.1; //소수
console.log(`value: ${count}, type: ${typeof count}`);
console.log(`value: ${size}, type: ${typeof size}`);

//무한대, NaN
const infinity = 1 / 0;
const negativeInfinity = -1 / 0;
const nAn = "not a number" / 2;
console.log(infinity);
console.log(negativeInfinity);
console.log(nAn);

//자바스크립트에서 숫자는 -2의 53승 ~ 2의 53승까지
//최근에 bigInt가 추가됨. 숫자 끝에 n을 붙이면 기존의 범위를 넘는 수를 사용할 수 있다.
//크롬이랑 파폭만 지원하고 있음
const bigInt = 2431242137894893274981723984723847981234798123894712389479812374871293847n;
console.log(`value: ${bigInt}, type: ${typeof bigInt}`);

//스트링타입
const char = "c";
const brendan = "brendan";
const greeting = "Hello" + brendan;
console.log(`value: ${greeting}, type: ${typeof greeting}`);
const helloBob = `hi ${brendan}!`; //template literals ` `얘 안에 ${변수} 얘를 넣으면 변수값을 출력할 수 있다.
//위에 greeting처럼 할 수도 있지만 저렇게 하면 계속 ''얘랑 + 얘랑 반복해서 써줘야 하니까 귀찮고 실수할 수도 있다.
console.log(`value: ${helloBob}, type: ${typeof helloBob}`);

//불리언 (boolean) 타입
//false: 0, null, undefined, NaN, "" 이것들은 false로 간주된다
//true: 다른 모든 값

const canRead = true;
const test = 3 < 1; //false
console.log(`value: ${canRead}, type: ${typeof canRead}`);
console.log(`value: ${test}, type: ${typeof test}`);

//null  의도적으로 비워둔 값
let nothing = null;
console.log(`value: ${nothing}, type: ${typeof nothing}`);

//undefined
let x;
console.log(`value: ${x}, type: ${typeof x}`);

//symbol: 고유한 식별자가 필요할 때, 동시다발적으로 여러 사건이 일어나는 상황에서 우선 순위를 줄 때
// 식별자 >< 키워드   식별자는 개발자가 임의로 이름 지어주는 모든 것, 키워드는 특정한 기능을 하는 것
const symbol1 = Symbol("id");
const symbol2 = Symbol("id");
console.log(symbol1 === symbol2); //false값이 나온다  문자열 값이 같아도 서로 다른 거다. 말그대로 고유한 심볼을 만들 때

const gSymbol1 = Symbol.for("id");
const gSymbol2 = Symbol.for("id");
console.log(gSymbol1 === gSymbol2); //true 출력. 문자열 같을 때는 동일한 심볼을 만들고 싶을 때는 Symbol.for 사용한다
console.log(`value: ${symbol2.description}, type: ${typeof symbol2}`);
// 심볼값을 출력할 때는 .description(문자열로 만들어줌)을 해줘야 출력된다.

const ellie = { name: "ellie", age: 20 };
//const로 선언해서 안에 있는 프로퍼티 중 키 값은 바꾸거나 할 수 없다
ellie.age = 21;
//하지만 벨류값은 재할당 가능하다

//다이나믹 타이핑: 선언할 때 타입을 미리 선언하지 않고 할당된 값에 따라서 타입이 바뀐다
let text = "Hello";
console.log(text.charAt(0)); //인덱스값 0번 출력
console.log(`value: ${text}, type: ${typeof text}`); //문자열
text = 1;
console.log(`value: ${text}, type: ${typeof text}`); //숫자
text = "7" + 5;
console.log(`value: ${text}, type: ${typeof text}`); //문자열로 인식해서 75 출력
text = "8" / "2";
console.log(`value: ${text}, type: ${typeof text}`); //숫자로 자동 인식해서 4 출력
// console.log(text.charAt(0));  //에러 발생 (문자열이 아니니까)
// 현업에서는 이렇게 타입이 바뀌어서 문제가 많이 생긴단다. 그래서 "타입스크립트"가 나왔다.
