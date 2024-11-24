// Timer Variables
let timerDisplay = document.getElementById('timer-display');
let timerButton = document.getElementById('timer-btn');
let pomodoroLengthInput = document.getElementById('pomodoro-length');
let breakLengthInput = document.getElementById('break-length');

let currentTime;
let isRunning = false;
let isPomodoro = true; // Flag to determine if it's Pomodoro or Break time

let timerInterval;

// Function to update the display
function updateDisplay() {
    let minutes = Math.floor(currentTime / 60);
    let seconds = currentTime % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Start or pause the timer
function startTimer() {
    if (!isRunning) {
        // Get the latest input values for Pomodoro and Break time
        let pomodoroTime = parseInt(pomodoroLengthInput.value) * 60;  // in seconds
        let breakTime = parseInt(breakLengthInput.value) * 60;  // in seconds

        currentTime = isPomodoro ? pomodoroTime : breakTime;

        // Update the timer display to show the correct starting time
        updateDisplay();

        isRunning = true;
        timerButton.textContent = 'Pause Timer';

        // Hide timer settings
        document.querySelector('.timer-settings').style.display = 'none';

        // Apply dark background when timer starts
        document.body.classList.add('running');

        // Start the timer
        timerInterval = setInterval(() => {
            currentTime--;
            updateDisplay();

            if (currentTime <= 0) {
                clearInterval(timerInterval);

                if (isPomodoro) {
                    alert("Pomodoro time's up!");
                    currentTime = breakTime;
                    isPomodoro = false;
                    timerButton.textContent = 'Start Break';
                } else {
                    alert("Break time's up!");
                    currentTime = pomodoroTime;
                    isPomodoro = true;
                    timerButton.textContent = 'Start Pomodoro';
                }

                updateDisplay();

                // Show timer settings again after switching cycle
                document.querySelector('.timer-settings').style.display = 'block';
                document.body.classList.remove('running'); // Restore the background
                isRunning = false;
            }
        }, 1000);
    } else {
        pauseTimer();
    }
}

// Pause the timer
function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    timerButton.textContent = 'Resume Timer';
    document.body.classList.remove('running'); // Restore the background
}

// Button click event
timerButton.addEventListener('click', startTimer);

// Initialize the display
updateDisplay();
