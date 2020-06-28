//keysContainer에 div만들어서 클래스값 주고 _createKeys()로 자판 하나하나 만들어서 담는다.
// main 안에 div만들고 클래스값 주고 위에서 만든 keysContainer를 통째로 담는다.
// 그 main을 body에 담는다.
// body > main > keysContainer 가 된다

let elements = {
  main: null, //div를 만들고 그 안에 keysContainer를 담게 됨
  keysContainer: null, //div를 만들고 그 안에 키들을 담게 됨
  keys: [], //키보드에 사용 될 키들을 담게 됨
};
//이벤트 핸들링
let eventHandlers = {
  oninput: null, //입력 관련
  onclose: null, //키보드가 닫히는 것과 관련
};

let properties = {
  value: "", //입력창에 보여질 값들
  capsLock: false, //대소문자
};

function init() {
  elements.main = document.createElement("div"); //main에 div 만든다
  elements.keysContainer = document.createElement("div"); // keysContainer에 div 만든다

  elements.main.classList.add("keyboard", "keyboard--hidden"); //위에서 만든 div에 클래스값 준다 (css)
  elements.keysContainer.classList.add("keyboard__keys"); //위에서 만든 div에 클래스값 준다 (css)
  elements.keysContainer.appendChild(_createKeys()); // creatKeys함수를 실행해서 만들어진 fragment들을 keysContainer에 다 담는다

  elements.keys = elements.keysContainer.querySelectorAll(".keyboard__key"); //위에서 만든 각각의 키들을 keys 배열에 담는다

  elements.main.appendChild(elements.keysContainer); //키들이 들어있는 keysContainer를 main에 마지막 자손으로 담고
  document.body.appendChild(elements.main); //그 main은 다시 body에 담는다

  // 얘는 왜 querySelectorAll으로 가져왔을 까? 어차피 1개인데? 1개지만 배열로 가져와야 해서? 왜 배열이 필요?
  // 요소에 접근한 뒤 그것을 받아 와서 실행하는 함수를 한꺼번에 적으려고 1개이지만 배열로 가져왔다(forEach쓰려고)
  document.querySelectorAll(".use-keyboard-input").forEach((element) => {
    element.addEventListener("focus", () => {
      open(element.value, (currentValue) => {
        element.value = currentValue;
      });
    });
  });
  // 인풋 태그에 이벤트 리스너 붙인다(포커스 되면 키보드창 열고 벨류에 입력값들을 다 저장한다)
} //여기까지 init()

// 키들을 일일이 html에서 버튼만들어서 넣고, 클래스 주고,... 하지 않고 함수로 돌리기
function _createKeys() {
  const fragment = document.createDocumentFragment(); //가상 DOM 만들기
  //키보드 자판에 필요한 값들
  const keyLayout = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "backspace",
    "q",
    "w",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "o",
    "p",
    "caps",
    "a",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "enter",
    "done",
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m",
    ",",
    ".",
    "?",
    "space",
  ];

  // 백스페이스, 엔터, 캡스락, 키보드 닫기 아이콘 가져오는 함수
  const createIconHTML = (icon_name) => {
    return `<i class="material-icons">${icon_name}</i>`; //구글 아이콘 불러오기
  };

  //keyLayout에 담겨있는 모든 키 가져와서 forEach함수 돌리기
  keyLayout.forEach((key) => {
    const keyElement = document.createElement("button"); //버튼 만들고

    //indexOf는 해당 매개변수의 인덱스값이 몇인지를 알고 싶을 때
    // 백스페이스가 들어올 때: 0 !== -1   => 참
    // p가 들어올 때: 1 ! == -1    => 참
    // 엔터가 들어올 때: 2 ! == -1    => 참
    // 물음표가 들어올 때: 3 !== -1   => 참
    // 나머지가 들어올 때: -1 !== -1   => 거짓
    const insertLineBreak =
      ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

    keyElement.setAttribute("type", "button"); //버튼 태그의 속성값으로 type = button 주기
    keyElement.classList.add("keyboard__key"); //버튼 태그의 클래스값 추가

    switch (key) {
      case "backspace": //받아온 값이 backspace이면
        keyElement.classList.add("keyboard__key--wide"); //클래스값 추가 (다른 키들 보다 좀 더 넓게 css)
        keyElement.innerHTML = createIconHTML("backspace"); //버튼을 innerHTML하는데 할 때 아이콘을 만든 것을 표시한다
        //이벤트 리스너 달아 준다 (클릭 되면 value에 담긴 값들 중  처음부터 마지막에서 2번째 까지만 다시 담는다 => 마지막 꺼는 안 담기니까 삭제 되는 거임)
        // substring(시작 인덱스 값, 마지막 인덱스 값(마지막 인덱스 값에 해당하는 문자는 출력하지 않음))
        //랭스는 원래 인덱스보다 1이 큰데 거기서 1을 빼주면 제일 마지막 글자에 해당하는 인덱스를 얻을 수 있다 substring은 마지막 글자는 원래 포함 안 되니까
        //커서를 가운데로 옮겨서 백스페이스 눌러도 제일 뒤에 글자가 삭제됨...
        keyElement.addEventListener("click", () => {
          properties.value = properties.value.substring(
            0,
            properties.value.length - 1
          );
          _triggerEvent("oninput"); //트리거 이벤트 함수 실행
        });

        break;

      case "caps": //받아온 값이 caps이면
        keyElement.classList.add(
          "keyboard__key--wide",
          "keyboard__key--activatable"
        ); //클래스 추가 (키 크게하고 옆에 활성 동그라미 표시 css)
        keyElement.innerHTML = createIconHTML("keyboard_capslock"); //버튼을 innerHTML하는데 할 때 아이콘을 만든 것을 표시한다

        keyElement.addEventListener("click", () => {
          _toggleCapsLock(); //저~~ 아래에 있는 대소문자 토글 함수 실행
          keyElement.classList.toggle(
            "keyboard__key--active", //클래스값 줬다 뺐다 (옆에 활성 동그라미 켜고 끄고 표시하는 css)
            properties.capsLock //properties에 있는 capsLock값이 T <-> F 바뀐다
          );
        });

        break;

      case "enter": //받아온 값이 엔터면
        keyElement.classList.add("keyboard__key--wide"); //클래스값 추가 (키 넓게 하는 css)
        keyElement.innerHTML = createIconHTML("keyboard_return"); //버튼을 innerHTML하는데 할 때 아이콘을 만든 것을 표시한다

        //이벤트 리스너 달기
        keyElement.addEventListener("click", () => {
          properties.value += "\n"; //줄바꿈 하려고 \n 추가
          _triggerEvent("oninput"); //트리거 이벤트 실행
        });

        break;

      case "space": //받아온 값이 스페이스면
        keyElement.classList.add("keyboard__key--extra-wide"); //클래스 추가 (키 길~게 css)
        keyElement.innerHTML = createIconHTML("space_bar"); //버튼을 innerHTML하는데 할 때 아이콘을 만든 것을 표시한다

        keyElement.addEventListener("click", () => {
          properties.value += " "; //공백 추가
          _triggerEvent("oninput"); //트리거 이벤트 실행
        });

        break;

      case "done": //받아온 값이 done이면
        keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark"); //클래스값 추가 (크고 어둡게 css)
        keyElement.innerHTML = createIconHTML("check_circle"); //버튼을 innerHTML하는데 할 때 아이콘을 만든 것을 표시한다

        keyElement.addEventListener("click", () => {
          close(); //키보드창 닫기 함수
          _triggerEvent("onclose"); //트리거 이벤트
        });

        break;

      default:
        //나머지값들이면
        keyElement.textContent = key.toLowerCase(); //소문자로 담기

        keyElement.addEventListener("click", () => {
          //삼항 연산자
          // 캡스락 켜져있니? 맞으면 대문자 : 아니면 소문자
          //프로퍼티 안의 캡스락에 true들어있으면 대문자, false들어있으면 소문자
          //캡스락이 true이면 프로퍼티 벨류에 키를 어퍼해서 추가하고
          //캡스락이 false이면 프로퍼티 벨류에 키를 로어해서 추가한다.
          properties.value += properties.capsLock
            ? key.toUpperCase()
            : key.toLowerCase();
          _triggerEvent("oninput"); //트리거 이벤트
        });

        break;
    }

    fragment.appendChild(keyElement); //  이때까지 만든 키를 다 가상 dom에 추가

    if (insertLineBreak) {
      //insertLineBreak가 참을 받아 오면 ("backspace", "p", "enter", "?" 얘네들)
      fragment.appendChild(document.createElement("br")); //한줄 띄어라
    }
  });

  return fragment; //creatKeys함수 실행되면 이때까지 만든 거 다 담은 fragment를 리턴한다
}

//이벤틀핸들러에 oninput, onclose있는데 oninput은 함수가 들어가 있으니까 _triggerEvent에 인자값으로 oninput받아 오면 참, onclose받아오면 거짓
function _triggerEvent(handlerName) {
  if (typeof eventHandlers[handlerName] == "function") {
    eventHandlers[handlerName](properties.value);
  }
}

function _toggleCapsLock() {
  properties.capsLock = !properties.capsLock; //토글 같이 지금 값 반대되는 값을 담는다(T/F) 초기값은 false

  for (const key of elements.keys) {
    //keys에 있는거 다 for문 돌리기
    if (key.childElementCount === 0) {
      //key의 자식요소가 하나도 없으면 참, 자식요소 있으면 거짓 (기능키들은 자식으로 i태그 갖고 있다)
      //숫자랑 알파벳은 실행, 백스페이스같은 거 아이콘 있는 거는 실행x
      // 숫자도 실행은 되지만 toUpperCase나 toLowerCase에 숫자 넣어도 어차피 에러도 안 나고 바뀌지도 않으니까 숫자는 거를 필요없이 아이콘 있는 것들만 걸러서 실행
      //poroperties 안의 capslock이 true일 때(캡스락 켜졌을 때)  key.textContent = key.texContent.toUpperCase() 이렇게 실행하고
      //    "                "      false일 때(캡스락이 꺼졌을 때) key.textContent = key.texContent.toLowerCase() 이렇게 실행한다
      key.textContent = properties.capsLock
        ? key.textContent.toUpperCase()
        : key.textContent.toLowerCase();
    }
  }
}

// ....() => {open(element.value, (currentValue) => {element.value = currentValue;}) 이 함수
// 이니셜벨류에 엘리먼트.벨류 들어가고, 온인풋에 저거 화살표 함수 들어간다
// 엘리먼트.벨류는 html 인풋태그의 벨류
//키보드창 여는 함수
function open(initialValue, oninput, onclose) {
  properties.value = initialValue || ""; //키보드 열 때 원래 있던 값 or 빈 값에서 입력 시작
  eventHandlers.oninput = oninput;
  eventHandlers.onclose = onclose;
  elements.main.classList.remove("keyboard--hidden"); //클래스값 제거 -> 화면에 표시
}

//키보드 닫는 함수
// done버튼 클릭했을 때 실행 됨
function close() {
  properties.value = ""; //value에 아무것도 추가하지 않음
  eventHandlers.oninput = oninput;
  eventHandlers.onclose = onclose;
  elements.main.classList.add("keyboard--hidden"); //클래스값 추가 -> 화면에 표시X
}

// html 로딩이 다 끝나면 init함수 실행
window.addEventListener("DOMContentLoaded", function () {
  init();
});
