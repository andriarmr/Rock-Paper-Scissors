const gameContainer = document.querySelector(".container"),
  userResult = document.querySelector(".user_result img"),
  cpuResult = document.querySelector(".cpu_result img"),
  result = document.querySelector(".result"),
  optionImages = document.querySelectorAll(".option_image");


optionImages.forEach((image, index) => {
  image.addEventListener("click", (e) => {
    image.classList.add("active");

    userResult.src = cpuResult.src = "images/rock.png";
    result.textContent = "Wait...";

    
    optionImages.forEach((image2, index2) => {
      
      index !== index2 && image2.classList.remove("active");
    });

    gameContainer.classList.add("start");

    
    let time = setTimeout(() => {
      gameContainer.classList.remove("start");

    
      let imageSrc = e.target.querySelector("img").src;
      
      userResult.src = imageSrc;

      
      let randomNumber = Math.floor(Math.random() * 3);
      
      let cpuImages = ["images/rock.png", "images/paper.png", "images/scissors.png"];
      
      cpuResult.src = cpuImages[randomNumber];

      
      let cpuValue = ["R", "P", "S"][randomNumber];
    
      let userValue = ["R", "P", "S"][index];

      
      let outcomes = {
        RR: "DRAW",
        RP: "BOT",
        RS: "YOU",
        PP: "DRAW",
        PR: "YOU",
        PS: "BOT",
        SS: "DRAW",
        SR: "BOT",
        SP: "YOU",
      };

      
      let outComeValue = outcomes[userValue + cpuValue];

      
      result.textContent = userValue === cpuValue ? "MATCH DRAW" : `${outComeValue} WON!!`;
    }, 2500);
  });
});
document.addEventListener('DOMContentLoaded', () => {
    const scoreForm = document.getElementById('scoreForm');
    const highScoresList = document.getElementById('highScoresList');

    // Load high scores from local storage
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

    // Function to display high scores
    function displayHighScores() {
        highScoresList.innerHTML = highScores.map(score => {
            return `<li>${score.name} - ${score.score}</li>`;
        }).join('');
    }

    // Function to save high scores to local storage
    function saveHighScores() {
        localStorage.setItem('highScores', JSON.stringify(highScores));
    }

    // Form submit event listener
    scoreForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const score = parseInt(document.getElementById('score').value);

        // Add new score to high scores array
        highScores.push({ name, score });

        // Sort high scores array
        highScores.sort((a, b) => b.score - a.score);

        // Keep only top 5 scores
        highScores.splice(5);

        // Save and display high scores
        saveHighScores();
        displayHighScores();

        // Clear the form
        scoreForm.reset();
    });

    // Initial display of high scores
    displayHighScores();
});


