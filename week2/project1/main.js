// 자동 실행 함수
let budgetController = (function () {
  //틀 만들기
  // Expense = {id: id값, description: 내용, value: 금액, percentage: 총수입 대비 해당 지출항목의 비율}
  let Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

  Expense.prototype.calcPercentage = function (totalIncome) {
    if (totalIncome > 0) {
      this.percentage = Math.round((this.value / totalIncome) * 100); //여기서 this는 Expense
    } else {
      this.percentage = -1;
    }
  };

  Expense.prototype.getPercentage = function () {
    return this.percentage;
  };

  // 틀 만들기
  // Income = { id: id값, description: 내용, value: 금액}
  let Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  //항목의 금액값 다 더하기
  //타입에는 exp or inc 들어감
  let calculateTotal = function (type) {
    let sum = 0;
    //해당 타입의 allItems배열에 있는 것들을 다 불러와서 forEach 돌리기
    data.allItems[type].forEach(function (cur) {
      //sum에 forEach로 불러온 것의 금액(value) 더해주기
      sum += cur.value;
    });
    //다 더한 거 총금액(totals)에 할당해주기
    data.totals[type] = sum;
  };

  //여러가지 데이터가 담길 변수
  let data = {
    // 수입, 지출이 추가될 때 id, 내용, 금액 정보가 담긴 객체(Expense, Income)가 배열로 저장된다
    allItems: {
      exp: [],
      inc: [],
    },
    // 총수입, 총지출
    totals: {
      exp: 0,
      inc: 0,
    },
    // 총수입 - 총지출
    budget: 0,
    // 총수입 대비 총지출 비율(디폴트값은 -1로 false)
    percentage: -1,
  };

  return {
    // 항목 추가하기
    // 수입-지출, 내용, 금액 받아온다
    addItem: function (type, des, val) {
      let newItem, ID;

      // id값 정해주기
      if (data.allItems[type].length > 0) {
        // data의 allItems의 길이가 0보다 크면 -> allItems에 값이 있으면 -> 사용자가 추가한 값이 있으면
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
        // id는 제일 마지막에 있는 항목의 id값에 + 1을 해준다
        // 중간에 있는 항목이 삭제되어도 마지막 id값에 +1을 해주니까 인덱스값이 아닌 고유한 id값을 가질 수 있다
        // 하지만 중간에 있는 항목이 아니라 마지막에 있는 항목을 삭제하면 사실 고유한 id값을 가지는 게 아니라
        // 그냥 그 앞 항목의 id값 +1이 된다
        // [0, 3, 4, 6]에서 6을 지운 상태에서 새로운 걸 추가하면 7이 되어야 하지만 그냥 4에서 1 더한 5값이 id에 할당된다
      } else {
        // 추가된 항목이 아무것도 없을 때
        ID = 0; // id는 0번부터
      }

      // 항목 추가하기
      if (type === "exp") {
        // -를 선택했을 때
        newItem = new Expense(ID, des, val);
        //newItem에 Expense를 상속받아 온다
      } else if (type === "inc") {
        // +를 선택했을 때
        newItem = new Income(ID, des, val);
        // newItem에 Income을 상속받아 온다
      }

      data.allItems[type].push(newItem);
      // push로 타입(수입, 지출)에 맞게 allItems.exp 또는 allItems.inc의 배열 맨 뒤에 값이 추가 된다 (Expense or Income이란 이름의 객체로 추가됨)

      return newItem;
    },

    //해당 항목 삭제하는 로직
    deleteItem: function (type, id) {
      let ids, index;

      // 배열 data.allItems.exp or .inc 에 있는 것의 id값들만 새로운 배열 ids에 담는다
      ids = data.allItems[type].map(function (current) {
        return current.id;
      });

      // 배열 ids에 담겨 있는 id중에서 특정 id가 몇번째 인덱스인지.
      index = ids.indexOf(id);

      //인덱스값이 -1이 아니다 => 배열 안에 해당 값이 존재한다
      if (index !== -1) {
        // 해당 인덱스에 해당하는 값을 삭제한다 ( .splice(시작 인덱스, 삭제할 개수))
        data.allItems[type].splice(index, 1);
      }
    },

    // 지출, 수입 계산하기
    calculateBudget: function () {
      calculateTotal("exp"); //지출 다 더해
      calculateTotal("inc"); //수입 다 더해

      // 총수입에 총지출 뺀 걸 data.budget에 할당
      data.budget = data.totals.inc - data.totals.exp;

      // 수입 대비 지출 비율
      // 만약 수입이 있으면 (수입 없으면 분모가 0이 되니까)
      if (data.totals.inc > 0) {
        // 지출 나누기 수입한 거에 100 곱한 것의 반올림한 걸 data.percentage에 할당
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
        // 수입이 없으면
      } else {
        // false할당
        data.percentage = -1;
      }
    },
    // 각각의 퍼센트 계산
    calculatePercentages: function () {
      // 지출항목을 forEach돌려서 각각의 수입 대비 지출 비용 계산
      data.allItems.exp.forEach(function (cur) {
        cur.calcPercentage(data.totals.inc);
      });
    },

    //각각의 퍼센트를 배열로 만들기
    getPercentages: function () {
      // data.allItems.exp 배열을 뽑아와서 getPercentage함수를 사용해서 나온 값으로 새로운 배열 만들기
      // 나온 값은 각각의 퍼센테이지
      let allPerc = data.allItems.exp.map(function (cur) {
        // 이 함수로 퍼센테이지만 받아온다
        //   Expense.prototype.getPercentage = function () {
        //     return this.percentage;
        //   };
        return cur.getPercentage();
      });
      return allPerc;
    },

    // 현재 총예산, 총수입, 총지출, 퍼센트값 다 리턴하기
    getBudget: function () {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage,
      };
    },

    //콘솔창에서 데이터값 확인해보기
    testing: function () {
      console.log(data);
    },
  };
})();

let UIController = (function () {
  // 사용된 클래스들을 변수에 담아서 관리
  let DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list",
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expensesLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    container: ".container",
    expensesPercLabel: ".item__percentage",
    dateLabel: ".budget__title--month",
  };

  // 절대값으로 만들고 소수점 붙여주고 소수점 뗀 정수부분 다 따로따로 준비해놓기
  let formatNumber = function (num, type) {
    let numSplit, int, dec;

    // 절대값으로 만들어 준다
    num = Math.abs(num);

    // 소수점자리 표시
    num = num.toFixed(2);

    // . 기준으로 문자열 나누기
    numSplit = num.split(".");

    // numSplit[0]은 . 기준으로 자른 것 중 앞에 거(뒤에 거는 소수점)   그걸 int에 할당한다
    int = numSplit[0];

    // 3자리수마다 쉼표 붙여주기
    // int가 3자리수 초과, 6자리수 이하
    if (int.length > 3 && int.length <= 6) {
      // 첫번째 수부터 (총 길이-3)개 + , + 뒤에서 세번째부터 세 개
      int = int.substr(0, int.length - 3) + "," + int.substr(int.length - 3, 3);
      // 6자리수~ 9자리수
    } else if (int.length > 6 && int.length <= 9) {
      int =
        int.substr(0, int.length - 6) +
        "," +
        int.substr(-6, 3) +
        "," +
        int.substr(int.length - 3, 3);
      // 9자리수 ~ 12자리수
    } else if (int.length > 9 && int.length <= 12) {
      int =
        int.substr(0, int.length - 9) +
        "," +
        int.substr(-9, 3) +
        "," +
        int.substr(-6, 3) +
        "," +
        int.substr(-3, 3);
    }

    // 뒤에 소수점 00
    dec = numSplit[1];

    // 지출이냐? 그러면 - 붙이고 : 아니면 + 붙여
    // 소수점은 그냥 빼버렸음
    return (type === "exp" ? "-" : "+") + " " + int;
  };

  // 노드리스트를 forEach 돌릴 때 사용할 함수
  let nodeListForEach = function (list, callback) {
    for (let i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };

  return {
    //입력된 값 받아오기
    getInput: function () {
      return {
        // .add__type을 클래스로 가지고 있는 것(+/- 선택창)의 value값을 type에 할당 (+는 inc -는 exp)
        type: document.querySelector(DOMstrings.inputType).value,

        // add__description을 클래스로 가지고 있는 것(내용입력창)의 value값을 description에 할당
        description: document.querySelector(DOMstrings.inputDescription).value,

        // add__value를 클래스로 가지고 있는 것(금액입력창)의 value값을 value에 할당
        // parseFloat()은 문자열을 실수로 바꿈(문자열이 숫자가 아닌 것으로 시작하면 NaN, 띄어쓰기 기준으로 제일 앞의 문자열(숫자로 시작)만 숫자로)
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
      };
    },

    //새로운 항목 화면에 표시해주기
    addListItem: function (obj, type) {
      let html, newHtml, element;

      // 수입이면 element에 income__list 할당해놓고
      if (type === "inc") {
        element = DOMstrings.incomeContainer;

        // html이란 변수에 할당해놓고
        html =
          '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

        // 지출이면 element에 expenses__list 할당해 놓고
      } else if (type === "exp") {
        element = DOMstrings.expensesContainer;

        // html에 할당해놓는다
        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      // newHtml이라는 변수에 위에서 할당 받아 온 html을 다시 할당하는데 제일 밖 div의 아이디값에 %id% 이거를  새로 추가되는 항목의 id로 대체한다
      newHtml = html.replace("%id%", obj.id);

      // newHtml에서 %description% 이 값을 새로 추가되는 항목의 description으로 대체한다
      newHtml = newHtml.replace("%description%", obj.description);

      // newHtml에서 "%value%" 이 값을 위에서 소수점 붙이고 콤마 붙이고 부호 붙이고 한 그거로 대체한다
      newHtml = newHtml.replace("%value%", formatNumber(obj.value, type));

      // .insertAdjacentHTML('beforeend', newHtml)  -> 타겟이 되는 요소의 제일 마지막 자식 요소로 newHtml을 추가
      // element는 수입, 지출일 때에 따라 다른 클래스 값으로 할당해놓았다
      // 수입일 때는 <div class='income__list></div> 얘 제일 마지막에 추가하고
      // 지출일 때는  <div class='expense__list></div> 얘 제일 마지막에 추가한다
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },

    // 화면에서 삭제하는 기능
    // 항목에 따라 고유한 id가 있는데 그 id를 받아와서 div의 id값으로 넣었었다
    // 그거 id에 있는 id숫자로 해당 항목 선택해서
    // 삭제해준다
    // 요소를 삭제할 때 보통 2가지 방법이 있다
    // 만약 부모랑 자식을 다 가져왔을 때는 부모.removeChild(삭제할 거)
    // 근데 자식만 가져왔을 때는 자식.parentNode.removeChild(삭제할 거)
    // 2번째 방법이 더 편하다(내가 삭제할 거만 알고 있으면 되니까)
    deleteListItem: function (selectorID) {
      let el = document.getElementById(selectorID);
      el.parentNode.removeChild(el);
    },

    // 수입이나 지출 내용, 금액 적고 저장하고 나서 인풋 태그 비워주는 기능
    clearFields: function () {
      let fields, fieldsArr;

      //내용 적는 칸이랑 금액 적는 칸 가져와서 (이때는 노드리스트로 가져 온다)
      fields = document.querySelectorAll(
        DOMstrings.inputDescription + ", " + DOMstrings.inputValue
      );

      // 노드리스트를 배열로 바꾸는 거.
      // 노드리스트는 유사배열이다
      fieldsArr = Array.prototype.slice.call(fields);
      console.log(fieldsArr);

      // fieldsArr에는 항상 2개가 있다
      // 내용 적는 거랑 금액 적는 거
      // 그래서 forEach문 돌려서 그 인풋 태그의 값은 빈 값으로 만들어 준다
      fieldsArr.forEach(function (current, index, array) {
        current.value = "";
      });

      // 배열의 첫번째는 내용 적는 인풋 태그. 수입,지출 저장하고 나면 자동으로 내용 적는 인풋 태그에 커서가 이동된다(포커스 된다)
      fieldsArr[0].focus();
    },

    // 화면에 표시
    // obj는 {
    //   budget: data.budget,
    //   totalInc: data.totals.inc,
    //   totalExp: data.totals.exp,
    //   percentage: data.percentage,
    // };
    displayBudget: function (obj) {
      let type;

      // 총금액이 0보다 크니? 크면 타입에는 inc를 할당하고 : 아니면 타입에 exp를 할당해
      obj.budget > 0 ? (type = "inc") : (type = "exp");

      // 상단의 총금액에 formatNumber한 값을 textcontent로 바꾸어 준다
      document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(
        obj.budget,
        type
      );

      // 상단의 총수입에 formatNumber한 값을 textcontent로 바꾸어 준다
      document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(
        obj.totalInc,
        "inc"
      );

      // 상단의 총지출에 formatNumber한 값을 textcontent로 바꾸어 준다
      document.querySelector(
        DOMstrings.expensesLabel
      ).textContent = formatNumber(obj.totalExp, "exp");

      // 퍼센테이지가 0 이상이면 (지출에만 퍼센테이지 있다. 수입이 없을 때는 -1이 할당되게 해놓았다)
      if (obj.percentage > 0) {
        // 그 퍼센트를 총지출 옆에 표시
        document.querySelector(DOMstrings.percentageLabel).textContent =
          obj.percentage + "%";
      } else {
        // 아닐 때는 --- 표시
        document.querySelector(DOMstrings.percentageLabel).textContent = "---";
      }
    },

    // 각각 지출 항목 옆에 퍼센트 표시
    displayPercentages: function (percentages) {
      // item__percentage 얘를 클래스로 가지고 있는 것들(지출항목 옆에 퍼센트) 가져오기
      let fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

      // 해당 인덱스의 퍼센트가 0보다 크면 % 붙여서 표시
      nodeListForEach(fields, function (current, index) {
        if (percentages[index] > 0) {
          current.textContent = percentages[index] + "%";
          // 아니면 --- 표시
        } else {
          current.textContent = "---";
        }
      });
    },

    //제일 위에 달 표시
    displayMonth: function () {
      let now, months, month, year;

      //지금 시간 가져오기
      now = new Date();
      months = [
        "1월",
        "2월",
        "3월",
        "4월",
        "5월",
        "6월",
        "7월",
        "8월",
        "9월",
        "10월",
        "11월",
        "12월",
      ];
      // 월 가져오기
      month = now.getMonth();

      // 연도 가져오기
      year = now.getFullYear();

      // 상단에 연월 표시해주기
      document.querySelector(DOMstrings.dateLabel).textContent =
        year + " " + months[month];
    },

    changedType: function () {
      // 수입 지출 선택하는 거, 내용 적는 거, 금액 적는 거 가져오기
      let fields = document.querySelectorAll(
        DOMstrings.inputType +
          "," +
          DOMstrings.inputDescription +
          "," +
          DOMstrings.inputValue
      );

      // 노드리스트포이치로 클래스값 주기
      // + 선택했을 때는 초록색으로 보이고. -선택했을 때는 빨간색
      nodeListForEach(fields, function (cur) {
        cur.classList.toggle("red-focus");
      });

      //  체크 버튼에 'red' 클래스 토글으로 껐다 켰다 해주기
      // + 선택했을 때는 초록색으로 보이고. -선택했을 때는 빨간색

      document.querySelector(DOMstrings.inputBtn).classList.toggle("red");
    },

    // DOMstrings(클래스 정리해 놓은 거) 리턴하기
    getDOMstrings: function () {
      return DOMstrings;
    },
  };
})();

// budgetCtrl에 budgetController를 전달해주고, UICtrl에 UIController를 전달해준다
let controller = (function (budgetCtrl, UICtrl) {
  let setupEventListeners = function () {
    // DOM에 DOMstrings를 할당
    let DOM = UICtrl.getDOMstrings();

    // 체크버튼에 클릭 이벤트 리스너 달고 콜백함수로 ctrlAddItem 지정
    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

    // html 도큐먼트 자체에 엔터키 이벤트 리스너 달기
    // 수입/지출, 내용, 금액 다 적고 포커스가 어디에 있든 엔터를 누르면 저장되게
    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });

    // 삭제 버튼에 클릭 이벤트 리스너 달기
    document
      .querySelector(DOM.container)
      .addEventListener("click", ctrlDeleteItem);

    // 인풋 태그에 체인지 이벤트 리스너 달기
    // 'change': 벨류값이 바뀔 때 이벤트 발생
    // +, - 바뀌면 테두리 색깔 바뀌게 하려고
    document
      .querySelector(DOM.inputType)
      .addEventListener("change", UICtrl.changedType);
  };

  // 다 계산해서 화면에 표시
  let updateBudget = function () {
    // 수입, 지출 다 더하는 그 함수 실행
    budgetCtrl.calculateBudget();

    // 현재 총예산, 총수입, 총지출, 퍼센트값 다 리턴하는 함수 실행
    let budget = budgetCtrl.getBudget();

    // 화면에 표시하는 함수 실행
    UICtrl.displayBudget(budget);
  };

  let updatePercentages = function () {
    // 각각 퍼센트 계산하는 함수 실행
    budgetCtrl.calculatePercentages();

    // 각각 퍼센트 배열로 만드는 함수 실행
    let percentages = budgetCtrl.getPercentages();

    // 각각 지출 항목 옆에 퍼센트 표시 함수 실행
    UICtrl.displayPercentages(percentages);
  };

  // 추가하기
  let ctrlAddItem = function () {
    let input, newItem;

    // 사용자가 입력한 값을 type, description, value에 담아 놓는 함수
    input = UICtrl.getInput();

    // 내용이 빈칸이 아니고 금액이 NaN가 아니고(숫자이고) 금액이 0 이상이면 (셋 다 참일 때만)
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      // 항목 추가하는 함수 실행
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      // 추가한 항목 화면에 표시해주는 함수 실행
      UICtrl.addListItem(newItem, input.type);

      // 입력하고 체크버튼 누르면 입력창 비워주는 함수 실행
      UICtrl.clearFields();

      // 수입, 지출,... 다 계산하고 화면에 보여주는 함수
      updateBudget();

      // 퍼센트 계산하고 지출 옆에 띄어주는 함수
      updatePercentages();
    }
  };

  // 삭제하기
  let ctrlDeleteItem = function (event) {
    let itemID, splitID, type, ID;

    // i태그의 부모의 부모의 부모의 부모 -> 그 버튼이 있는 항목을 감싸고있는 가장 상위의 div태그의 아이디값을 담는다
    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if (itemID) {
      // id값이 inc-0, exp-3 이런 식이다
      // -기준으로 잘라서 배열로 담아놓기
      splitID = itemID.split("-");
      // 앞부분은 타입에 넣고
      type = splitID[0];
      //뒷부분은 정수로 바꿔서 넣고
      ID = parseInt(splitID[1]);

      // 배열에서 삭제하는 함수 실행
      budgetCtrl.deleteItem(type, ID);

      // 화면에서 삭제하는 함수 실행
      UICtrl.deleteListItem(itemID);

      // 다 계산해서 화면에 표시하는 함수 실행
      updateBudget();

      // 퍼센트 계산해서 지출 옆에 띄어주는 함수 실행
      updatePercentages();
    }
  };

  return {
    init: function () {
      // 콘솔창에 띄어주기
      console.log("Application has started.");
      // 달 표시해주는 함수 실행
      UICtrl.displayMonth();
      // 다 0으로 세팅해서 화면에 표시
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1,
      });
      // 각각의 버튼에 이벤트 리스너 붙여는 함수 실행
      setupEventListeners();
    },
  };
  // 얘네 둘은 매개변수에 전달되는 전달인자들이다
})(budgetController, UIController);

// 초기화 함수 실행
controller.init();
