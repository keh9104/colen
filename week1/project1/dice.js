//서로 다른 여러 함수에서 사용하는 변수를 함수 밖에 미리 선언해놓기
var scores, roundScore, activePlayer, preDiceRoll, gamePlaying;

const btnRoll = document.querySelector(".btn-roll"); // 주사위 굴리기 버튼
const btnHold = document.querySelector(".btn-hold"); //홀드 버튼
const btnNew = document.querySelector(".btn-new"); //리셋 버튼
let diceImg1 = document.querySelector("#dice1"); //1번 주사위 이미지
let diceImg2 = document.querySelector("#dice2"); //2번 주사위 이미지

init(); //초기화 함수 실행

btnRoll.addEventListener("click", rollDice); //주사위 굴리기 버튼에 이벤트 리스너 달기
btnHold.addEventListener("click", hold); //홀드 버튼에 이벤트 리스너 달기
btnNew.addEventListener("click", init); //리셋 버튼에 이벤트 리스너 달기

///////////////////////////////주사위 굴리기 함수//////////////////////
function rollDice() {
  if (gamePlaying) {
    //gamePlaying 값이 true이면 경기 진행, false이면 진행x
    var dice1 = Math.ceil(Math.random() * 6); // 주사위값 랜덤으로 생성
    var dice2 = Math.ceil(Math.random() * 6); //floor 말고 ceil을 사용하면 +1 하지 않아도 되니까 더 좋겠지?
    console.log(dice1);
    console.log(dice2);

    diceImg1.style.display = "block";
    diceImg2.style.display = "block"; // 화면에 띄어주기
    diceImg1.src = "./images/dice-" + dice1 + ".png";
    diceImg2.src = "./images/dice-" + dice2 + ".png"; //주사위 값에 해당하는 이미지 소스값으로 바꿔주기

    // 게임 진행 룰
    // 1. 1번 주사위가 이전에도 6이고 이번에도 6이면 합계 점수 다 잃고 턴 넘기기
    // 2. 1번 주사위 또는 2번 주사위 둘 중 하나라도 1이 나오면 라운드 점수 잃고 턴 넘기기
    // 3. 하고 싶은 만큼 주사위 굴리고 원할 때 턴을 넘기고 점수를 저장할 수 있다.

    if (dice1 === 6 && preDiceRoll === 6) {
      // 6 연속 나오면
      scores[activePlayer] = 0; //합계 점수 0으로 만들기
      document.querySelector("#score-" + activePlayer).textContent = 0; //합계 점수 화면에 표시
      alert(
        "첫번째 주사위가 연속으로 6이 나와 모든 점수를 잃고 턴이 넘어갑니다!"
      ); //영문도 모르고 그냥 점수 잃고  턴 넘어가니까 경고창 띄어서 알려주자
      nextPlayer(); //턴 넘기기
    } else if (dice1 !== 1 && dice2 !== 1) {
      //모든 주사위가 1이 안 나오면
      roundScore = roundScore + dice1 + dice2; //라운드 스코어에 주사위 합하기
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore; //화면에 점수 표시
    } else {
      //주사위 둘 중 하나라도 1이 나오면
      alert("주사위가 1이 나와서 턴이 넘어갑니다!"); //마찬가지로 왜 턴이 넘어가는지 알려주자
      nextPlayer();
    }
    preDiceRoll = dice1; //1번 주사위 값 저장해놓기 (1번 규칙 때문에)
  }
}

////////////////////////////저장하고 넘기기 함수///////////////////////////
function hold() {
  if (gamePlaying) {
    scores[activePlayer] = scores[activePlayer] + roundScore; //합계 점수에 라운드 점수 추가
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer]; //화면에 점수 표시

    let input = document.getElementById("winningScore").value; //목표 점수 입력값 받아오기
    let winningScore; // 변수 빈값으로 일단 선언해놓기

    if (input) {
      //기존 코드에서 글자를 입력했을 때 100점을 넘겨도 게임이 끝나지 않는 문제를 해결
      winningScore = input;
    } else {
      winningScore = 100; //사용자가 점수를 입력 안 하거나 글자 입력했을 때 기본적으로 목표 점수는 100점
    }

    if (scores[activePlayer] >= winningScore) {
      //합계 점수가 목표 점수와 같거나 크면
      document.querySelector("#name-" + activePlayer).textContent = "승리!"; //이름 대신에 표시

      diceImg1.style.display = "none";
      diceImg2.style.display = "none"; //주사위 이미지 숨기기

      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner"); //승자쪽 패널에 클래스값(winner) 추가 (css적용 위해서)
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active"); //승자쪽 패널에 클래스값(active) 제거 (css적용 위해서)

      gamePlaying = false; //주사위 굴리기 버튼, 홀드 버튼 눌러도 아무 동작 안 되게
    } else {
      //목표 점수 미달이면
      alert("이번 라운드 점수를 저장하고 턴을 넘깁니다."); //계속 상황 설명
      nextPlayer(); //턴 넘기기
    }
  }
}

////////////////////////////////////// 리셋 함수 //////////////////////
function init() {
  gamePlaying = true; //주사위 굴리기 버튼 누를 수 있게 값을 true로 할당
  scores = [0, 0]; //1p 2p 합계 점수 0으로 초기화
  activePlayer = 0; //1p(인덱스 값0이니까)부터 시작하게
  roundScore = 0; //라운드 스코어도 0으로 초기화

  diceImg1.style.display = "none";
  diceImg2.style.display = "none"; //주사위 화면에서 숨기기

  document.getElementById("score-0").textContent = "0"; //1p 합계 점수 0으로 표시
  document.getElementById("score-1").textContent = "0"; //2p 합계 점수 0으로 표시
  document.getElementById("current-0").textContent = "0"; //1p 라운드스코어 0으로 표시
  document.getElementById("current-1").textContent = "0"; //2p 라운드스코어 0으로 표시

  document.getElementById("name-0").textContent = "Player 1"; //1p 이름 표시  ("승리!" 없애기)
  document.getElementById("name-1").textContent = "Player 2"; //2p 이름 표시  ("승리!" 없애기)

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner"); //클래스값에 winner 있는 거 없애기

  document.querySelector(".player-0-panel").classList.remove("active"); //1p 패널에 액티브 값 빼기 (css 때문에)
  document.querySelector(".player-1-panel").classList.remove("active"); //2p 패널에 액티브 값 빼기 (css 때문에)

  document.querySelector(".player-1-panel").classList.remove("active"); //2p 패널에 액티브 값 빼기 (css 때문에)  굳이 한번 더 빼네...
  document.querySelector(".player-0-panel").classList.add("active"); //1p부터 시작할 거니까 1p 패널에 액티브 주기 (css)
}

///////////////////////////////턴 넘기기 함수 //////////////////////////
function nextPlayer() {
  //삼항 연산자
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0); //1p가 액티브니? 맞으면 2p한테 주고 : 아니면 1p한테 줘
  roundScore = 0; //라운드스코어 0할당

  document.getElementById("current-0").textContent = "0"; //1p 라운드스코어 0으로 화면에 표시
  document.getElementById("current-1").textContent = "0"; //2p 라운드스코어 0으로 화면에 표시

  document.querySelector(".player-0-panel").classList.toggle("active"); //토글 기능으로 액티브 있었으면 빼주고 없었으면 추가해주고
  document.querySelector(".player-1-panel").classList.toggle("active"); //토글 기능으로 액티브 있었으면 빼주고 없었으면 추가해주고

  diceImg1.style.display = "none";
  diceImg2.style.display = "none"; //주사위 그림 숨기기
}
