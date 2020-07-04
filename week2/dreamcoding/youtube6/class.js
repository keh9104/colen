// 클래스 안에는 속성(필드)와 행동(메소드)가 들어있다
// 클래스 안에는 데이터는 없고 틀(템플릿)만 있다
// 클래스를 이용해서 데이터를 담아 놓은 것을 객체(오브젝트)라고 한다
// 클래스는 데이터에 올라가지 않지만 오브젝트는 데이터에 올라간다
// 붕어빵 틀 = 클래스
// 팥을 넣은 붕어빵, 크림을 넣은 붕어빵, ... = 오브젝트

"use strict";

// 클래스는 템플릿이다
// 오브젝트는 템플릿에 데이터 들어있는 거

// 1. 클래스 선언
class Person {
  //constructor
  constructor(name, age) {
    //fields
    this.name = name;
    this.age = age;
  }
  // method
  speak() {
    console.log(`${this.name}: Hello!`);
  }
}

// 오브젝트 만들기
const ellie = new Person("ellie", 20);
console.log(ellie.name);
console.log(ellie.age);
ellie.speak();

// 2. getter & setter

class User {
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    //this.age 는 게터를, 우변의 age는 세터를 각각 호출하게 된다
    //게터는 User.age를 사용해서 프로퍼티를 읽으러고 할 때 실행
    //세터는 User.age = 값  으로 프로퍼티에 값을 할당하려 할 때 실행된다
  }
  get age() {
    return this._age;
  }
  // 밖에서 User.age를 호출하면 User._age가 호출이 된다
  // 밖에서 User.age에 값을 할당하면 set의 매개변수로 전달되어서
  // User._age = 값  에 할당된다
  // 따라서 밖에서 age에 -1을 할당하면
  // set에 있는 조건에 의해서 _age에 0이 할당된다
  // 그리고 밖에서 User.age에 접근하면
  // get에 의해서 User._age에 접근하는 것이 된다.
  set age(value) {
    // 받아온 값이 0보다 작으면 그냥 0으로 하고 0보다 크면 받아온 값으로 한다
    this._age = value < 0 ? 0 : value;
  }
}
const user1 = new User("Steve", "Jobs", -1);
// 그런데 상식적으로 나이가 -1이 될 수 없다
// 그래서 게터와 세터를 이용해서 사용자가 잘못된 값을 전달했을 때 잘못된 값을 보정해준다
console.log(user1.age);

// 3. field(public, private) - 너무 최신 기능이라서 지원 안 하는 브라우저가 많아서 아직은 사용하는 것이 시기상조
class Experiment {
  publicField = 2; // 얘는 클래스 외부에서도 접근과 재할당 할 수 있다
  #privateField = 0; //#을 붙이면 클래스 내부에서만 접근과 재할당 가능함
}
const experiment = new Experiment();
console.log(experiment.publicField);
console.log(experiment.privateField);

// 4. static properties and method - 이것도 너무 최신임
class Article {
  static publisher = "Dream Coding";
  constructor(articleNumber) {
    this.articleNumber = articleNumber;
  }

  static printPublisher() {
    console.log(Article.publisher);
  }
}
const article1 = new Article(1);
const article2 = new Article(2);
console.log(article1.publisher); // 이러면 언디파인
console.log(Article.publisher); // 이러면 드림 코딩 출력
// 스태틱은 클래스에 있는 값이니까 클래스로 호출해야 함
// 오브젝트에 상관없이 항상 쓰이는 것은 스태틱으로 클래스에 고정시켜주면 좋다

// 5. 상속과 다양성

class Shape {
  constructor(width, height, color) {
    this.width = width;
    this.height = height;
    this.color = color;
  }
  draw() {
    console.log(`drawing ${this.color} color of`);
  }
  getArea() {
    return this.width * this.height;
  }
}
class Rectangle extends Shape {}
// 이렇게 하면 Rectangle이라는 클래스에 Shape 클래스 안에 있는 모든 것들이 가져와진다
class Triangle extends Shape {
  draw() {
    super.draw();
    console.log("삼각형");
  }
  getArea() {
    return (this.width * this.height) / 2;
  }
}
// extends로 다 불러 오고
// getArea()부분 처럼 필요한 것만 바꿀 수도 있다.
// 근데 아예 바꾸는 게 아니라 draw()처럼 기존의 것에다 다른 것을 추가하고 싶으면
// super를 사용해서 기존의 것을 남겨두고 아래에 추가하고 싶은 것을 추가하면 된다

const rectangle = new Rectangle(20, 20, "blue");
const triangle = new Triangle(20, 20, "red");
rectangle.draw();
triangle.draw();
console.log(rectangle.getArea());
console.log(triangle.getArea());

// 6. instanceOf
// 인스턴스는 객체랑 비슷한데 '지금 생성된 바로 그 객체'라는 뉘앙스...

console.log(rectangle instanceof Rectangle); //rectangle이 Rectangle의 인스턴스냐? (Rectangle로부터 만들어졌냐?)
console.log(triangle instanceof Rectangle); //triangle이 Rectangle의 인스턴스냐? (Rectangle로부터 만들어졌냐?)
console.log(triangle instanceof Triangle); //triangle이 Triangle의 인스턴스냐? (Triangle로부터 만들어졌냐?)
console.log(triangle instanceof Shape); //triangle이 Shape의 인스턴스냐? (Shape로부터 만들어졌냐?)
console.log(triangle instanceof Object); //triangle이 Object의 인스턴스냐? (Object로부터 만들어졌냐?)
// 자바스크립트의 모든 객체(오브젝트)는 Object를 상속한 것이다(자동으로)
