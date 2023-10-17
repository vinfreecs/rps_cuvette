const options = ["rock", "paper", "scissors"];

let computerScore = localStorage.getItem("dataComp");
let playerScore = localStorage.getItem("dataPlayer");
let playerChoice;
let computerChoice;
function computerInput() {
  return options[Math.floor(Math.random() * 3)];
}
function playRound(playerInput, computerInput) {
  switch (playerInput) {
    case "rock":
      switch (computerInput) {
        case "rock":
          return "tie";
        case "paper":
          return "lose";
        case "scissors":
          return "win";
      }
      break;
    case "paper":
      switch (computerInput) {
        case "rock":
          return "win";
          break;
        case "paper":
          return "tie";
          break;
        case "scissors":
          return "lose";
          break;
      }
      break;
    case "scissors":
      switch (computerInput) {
        case "rock":
          return "lose";
          break;
        case "paper":
          return "win";
          break;
        case "scissors":
          return "tie";
          break;
      }
      break;
    default:
      console.log("not working");
  }
}
function PlayRound() {}
function ManageRules() {
  const gameRules = document.querySelector(".game_rules");
  document.querySelector(".open_rules").addEventListener("click", () => {
    gameRules.style.display = "flex";
  });
  document.querySelector(".close_rules").addEventListener("click", () => {
    gameRules.style.display = "none";
  });
}
function UpdateScore() {
  const computerScoreDom = document.querySelector(
    ".computer_score .score_number"
  );
  const playerScoreDom = document.querySelector(".your_score .score_number");
  computerScoreDom.textContent = computerScore;
  playerScoreDom.textContent = playerScore;
}
function PlayAgain() {
  document.addEventListener("click", (e) => {
    if (e.target.classList.value === "play_again") {
      console.log("clicked");
      document.querySelector(".options").style.display = "flex";
      document.querySelector(".result").style.display = "none";
      document.querySelector(".open_hurray").style.display = "none";
      document.querySelector(".header").style.display = "flex";
      document.querySelector(".hurray").style.display = "none";
      document.querySelector(".triangle").style.display = "block";
    }
  });
}
function ManageNext() {
  document.querySelector(".open_hurray").addEventListener("click", () => {
    document.querySelector(".options").style.display = "none";
    document.querySelector(".header").style.display = "none";
    document.querySelector(".hurray").style.display = "flex";
    document.querySelector(".result").style.display = "none";
    document.querySelector(".open_hurray").style.display = "none";
  });
}
function UpdateResult(res) {
  const result = document.querySelector(".result");
  result.style.display = "flex";
  switch (res) {
    case "win":
      document.querySelector(".open_hurray").style.display = "block";
      result.innerHTML = `
      <div class="circle_1">
        <div class="circle_2">
            <div class="circle_3">
              <div class="player_choice player_choice_win">
                <p>You've Picked</p>
                <button  id="${playerChoice}_selected" class="">
                  <img src="${playerChoice}.png" alt="${playerChoice}">
                </button>
              </div>
            </div>
          </div>
      </div>
        
        <div class="result_details">
            <p>YOU ${res} <br> AGAINST PC</p>
            <button class="play_again">Play Again</button>
        </div>
        <div class="computer_choice">
            <p>Computer Picked</p>
            <button  id="${computerChoice}_selected" class="">
                <img src="${computerChoice}.png" alt="${computerChoice}">
            </button>
        </div>
        `;
      break;
    case "lose":
      result.innerHTML = `
        <div class="player_choice">
            <p>You've Picked</p>
            <button  id="${playerChoice}_selected" class="">
                <img src="${playerChoice}.png" alt="${playerChoice}">
            </button>
        </div>
        <div class="result_details">
            <p>YOU ${res} <br> AGAINST PC</p>
            <button class="play_again">Play Again</button>
        </div>
        <div class="circle_1">
        <div class="circle_2">
            <div class="circle_3">
              <div class="computer_choice computer_choice_win">
                <p>PC Picked</p>
                <button  id="${computerChoice}_selected" class="">
                <img src="${computerChoice}.png" alt="${computerChoice}">
            </button>
              </div>
            </div>
          </div>
      </div>
        `;
      break;
    case "tie":
      result.innerHTML = `
        <div class="player_choice">
            <p>You've Picked</p>
            <button  id="${playerChoice}_selected" class="">
                <img src="${playerChoice}.png" alt="${playerChoice}">
            </button>
        </div>
        <div class="result_details">
            <p>TIE UP</p>
            <button class="play_again">REPLAY</button>
        </div>
        <div class="computer_choice">
            <p>Computer Picked</p>
            <button  id="${computerChoice}_selected" class="">
                <img src="${computerChoice}.png" alt="${computerChoice}">
            </button>
        </div>
    `;
  }
}
function ScreenController() {
  const playerInput = document.querySelectorAll(".option");
  console.log(playerInput);
  playerInput.forEach((item) => {
    item.addEventListener("click", () => {
      document.querySelector(".options").style.display = "none";
      document.querySelector(".triangle").style.display = "none";
      playerChoice = item.id;
      computerChoice = computerInput();
      let res = playRound(playerChoice, computerChoice);
      switch (res) {
        case "win":
          playerScore++;
          localStorage.setItem("dataPlayer", playerScore);
          break;
        case "lose":
          computerScore++;
          localStorage.setItem("dataComp", computerScore);
          break;
        case "tie":
          break;
        default:
          console.log("broke in screenController!");
      }
      UpdateScore();
      UpdateResult(res);
    });
  });
  PlayAgain();
  ManageRules();
  ManageNext();
}
UpdateScore();
ScreenController();
