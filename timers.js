// Timer variables
let background = document.getElementsByTagName('body');
let timerDisplay = document.getElementById('timer-display');
let pomodoroButton = document.getElementById('pomodoro-timer');
let breakButton = document.getElementById('break-timer');

let pomodoroTime = 25 * 60;  // 25 minutes in seconds
let breakTime = 5 * 60;      // 5 minutes in seconds

let timerInterval;
let isRunning = false;
let currentTime = pomodoroTime;  // Default to Pomodoro time
let isPomodoro = true; // Flag to track whether we are in Pomodoro or Break mode

// Function to update the timer display
function updateDisplay() {
    let minutes = Math.floor(currentTime / 60);
    let seconds = currentTime % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Start or resume the timer
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        // Update the button text to "Pause Pomodoro"
        pomodoroButton.textContent = 'Pause Pomodoro';
        
        // Start the countdown
        timerInterval = setInterval(() => {
            currentTime--; // Decrease the time by 1 second
            updateDisplay(); // Update the display with the current time

            // When the timer reaches 0, stop the countdown and alert the user
            if (currentTime <= 0) {
                clearInterval(timerInterval); // Stop the interval
                isRunning = false;  // Timer is no longer running
                pomodoroButton.textContent = 'Start Pomodoro'; // Reset button text
                alert(isPomodoro ? "Pomodoro time's up!" : "Break time's up!");
                
                // Switch to break if it was a Pomodoro, or back to Pomodoro
                if (isPomodoro) {
                    currentTime = breakTime;  // Switch to break time
                    isPomodoro = false;
                    pomodoroButton.textContent = 'Start Break';  // Change button text
                } else {
                    currentTime = pomodoroTime;  // Switch to Pomodoro time
                    isPomodoro = true;
                    pomodoroButton.textContent = 'Start Pomodoro';  // Change button text
                }
                updateDisplay(); // Update the display with the new time
            }
        }, 1000); // Run the timer every second
    }
}

//changes background!!!!
/*
function setBackground{
    background.col
}
*/

// Pause the timer
function pauseTimer() {
    clearInterval(timerInterval); // Stop the interval
    isRunning = false; // Set running state to false
    pomodoroButton.textContent = 'Resume Pomodoro'; // Change button text to "Resume Pomodoro"
}

// Event listener for Pomodoro Button (start, pause, resume)
pomodoroButton.addEventListener('click', () => {
    if (isRunning) {
        // If the timer is running, pause it
        pauseTimer();
    } else {
        // If the timer is paused or stopped, start it
        startTimer();
    }
});

// Event listener for Break Button (just like Pomodoro, but starts the break)
breakButton.addEventListener('click', () => {
    currentTime = breakTime;  // Set time to Break duration
    isPomodoro = false;  // We are in Break mode now
    updateDisplay(); // Update display
    startTimer(); // Start the Break timer
});

// Initialize the display with the default time (Pomodoro)
updateDisplay();
