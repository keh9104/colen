// JSON

// 1. Object -> JSON
// stringfy(obj)
let json = JSON.stringify(true);
console.log(json);

json = JSON.stringify(["apple", "banana"]);
console.log(json);

const rabbit = {
  name: "Tori",
  color: "white",
  size: null,
  birthDate: new Date(),
  jump: () => {
    console.log(`${name} can jump!`);
  },
};

// 함수는 오브젝트에 있는 데이터가 아니기 때문에 json에 포함되지 x (symbol같이 js에서만 사용할 수 있는 거도 포함되지 x)
json = JSON.stringify(rabbit);
console.log(json);

// 두 번째 인자값에 ["키값"] 을 넣으면 해당 키랑 벨류만 json으로 만들어진다
json = JSON.stringify(rabbit, ["name", "size"]);
console.log(json);

// 두 번째 인자값에 함수를 사용하면? (이 함수는 키랑 벨류를 인자로 받아 온다)
aaa = JSON.stringify(rabbit, function (a, b) {
  console.log(`key: ${a}, value: ${b}`);
  return b;
});
console.log(aaa);
console.log(
  "---------------------------------------------------------------------"
);
// 2. JSON -> Object
// parse(json)

json = JSON.stringify(rabbit);
console.log(json);
// {"name":"Tori","color":"white","size":null,"birthDate":"2020-07-02T13:06:44.632Z"}

const obj = JSON.parse(json);
console.log(obj);
// {
//     name: 'Tori',
//     color: 'white',
//     size: null,
//     birthDate: '2020-07-02T13:06:44.632Z'
//   }

// 제이슨이 오브젝트로 바뀌었다
// 근데 오브젝트를 제이슨으로 바꿀 때 함수는 안 바뀌었기 때문에
// 제이슨에서 다시 오브젝트로 바꾸었을 때, 새로은 오브젝트에는 함수가 없다
// obj.jump();

console.log(rabbit.birthDate.getDate());

// 오브젝트를 제이슨으로 만들 때 날짜부분이 문자열로 만들어졌었음
// 그래서 다시 제이슨을 오브젝트로 만들면
// birthDate: new Date(), 이렇게 만들어지는 게 아니라
// birthDate: '2020-07-02T13:06:44.632Z' 이렇게 제이슨으로 만들 때의 실행값이 문자열로 되어있음
console.log(obj.birthDate.getDate());
