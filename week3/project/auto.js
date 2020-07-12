const input = document.querySelector("input"); //input태그 가져오기
let countryList = []; //국가명 받아 올 리스트
const countryLi = document.getElementById("countryList"); //국가명 리스트 담을 ul태그 가져오기

// fetch로 아래의 url(국가 기본 정보) 요청
fetch("https://restcountries.eu/rest/v2/all") //
  // 요청 완료 되면 제이슨으로 변환해서 country에 담기
  .then(function (response) {
    country = response.json();
    return country;
  })
  // for문 돌려서 나라 이름만 소문자로 바꾸어서 배열에 담기
  .then(function (country) {
    for (var i = 0; i < country.length; i++) {
      countryList.push(country[i].name.toLowerCase());
    }
    return countryList;
  })
  // 배열에 담긴 것들을 html 리스트 만들어서 렌더링 하기
  .then(function (countryList) {
    countryList.forEach(function (i) {
      const createList = document.createElement("li"); //리스트 태그 만들고
      const createCon = document.createTextNode(i); // 텍스트노드 만들고
      const createAtt = document.createAttribute("class"); //클래스 만들고
      createAtt.value = "post__title"; // 클래스에 값 주고
      createList.appendChild(createCon); // 텍스트노드를 리스트 태그에 담고
      createList.setAttributeNode(createAtt); // 리스트 태그에 클래스 주고
      countryLi.appendChild(createList); // 다 담긴 리스트 태그를 ul안에 넣는다
    });
  });

//////////////////////////////////////////////// 자동완성 기능
// 인풋에 입력된 값과 배열에 있는 국가명이 같은 걸 찾기
const autocomplete = function (val) {
  let country_return = [];

  for (i = 0; i < countryList.length; i++) {
    // 인풋에 입력된 글자 수 만큼 국가명 글자 뽑아와서 비교
    if (val === countryList[i].slice(0, val.length)) {
      // 일치하면 리스트에 푸쉬한다
      country_return.push(countryList[i]);
    }
  }

  return country_return;
};

// 인풋 태그에 키업 이벤트가 일어나면
input.onkeyup = function (e) {
  // 인풋 태그 입력값을 input_val에 담고
  input_val = this.value;

  // 인풋 태그에 입력값이 있으면
  if (input_val.length > 0) {
    var country_to_show = [];

    // 자동완성 보여줄 ul 태그 가져오기
    autocomplete_results = document.getElementById("autocomplete-results");
    autocomplete_results.innerHTML = "";
    country_to_show = autocomplete(input_val); // 리턴된 country_return을 할당

    // for문 돌려서 화면에 표시
    for (i = 0; i < country_to_show.length; i++) {
      // li태그 안에 국가명 넣고 계속 추가
      autocomplete_results.innerHTML += "<li>" + country_to_show[i] + "</li>";
    }
    // ul태그 display 해주기
    autocomplete_results.style.display = "block";
  } else {
    //인풋 태그에 입력값이 없을 때
    country_to_show = [];
    autocomplete_results.innerHTML = "";
  }

  ///////////////////////////////////////////////// search 기능 (자동 실행 함수)

  (function () {
    const keywords = // 공백 빼고 인풋 태그에 입력값이 있냐? 있으면 정규표현식(위치, 대소문자 상관없이)으로 만들고 없으면 빈값
      input.value.trim().length > 0 ? new RegExp(input.value.trim(), "gi") : "";
    // 국가명 담겨 있는 li태그를 다 postTiles에 담기
    const postTitles = document.getElementsByClassName("post__title");

    for (var i = 0; i < postTitles.length; i++) {
      let title = postTitles[i];

      // 국가명이 입력값(keywords)에 일치하고 입력값이 빈값이 아니면
      if (title.innerHTML.match(keywords) && keywords !== "") {
        // li태그에 highlight 클래스가 없으면
        if (!title.className.match("highlight")) {
          // 클래스값에 추가해라
          title.className = title.className + " highlight";
        }
      } else {
        // 입력값이랑 다르거나 빈값이면
        // 클래스값 highlight를 빈값으로 대체해라 -> 없애라
        title.className = title.className.replace(/\s*highlight\s*/g, "");
      }
    }
  })();
};
