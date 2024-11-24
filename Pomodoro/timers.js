// Timer Variables
let timerDisplay = document.getElementById('timer-display');
let timerButton = document.getElementById('timer-btn');

let pomodoroTime = 25 * 60;  // 25 minutes
let breakTime = 5 * 60;      // 5 minutes

let currentTime = pomodoroTime; // Start with Pomodoro time
let isRunning = false;
let isPomodoro = true; // Flag to determine if it's Pomodoro or Break time

let timerInterval;

// Update the timer display
function updateDisplay() {
    let minutes = Math.floor(currentTime / 60);
    let seconds = currentTime % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Start or pause the timer
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timerButton.textContent = 'Pause Timer';
        document.body.classList.add('running'); // Darken background
        timerButton.classList.add('paused');  // Add "paused" class for dark button
        
        // Start the timer interval
        timerInterval = setInterval(() => {
            currentTime--;
            updateDisplay();
            
            if (currentTime <= 0) {
                clearInterval(timerInterval);  // Stop the timer
                
                // Switch between Pomodoro and Break
                if (isPomodoro) {
                    alert("Pomodoro time's up!");
                    currentTime = breakTime;  // Switch to Break
                    isPomodoro = false;
                    timerButton.textContent = 'Start Break';
                } else {
                    alert("Break time's up!");
                    currentTime = pomodoroTime;  // Switch to Pomodoro
                    isPomodoro = true;
                    timerButton.textContent = 'Start Pomodoro';
                }

                updateDisplay();
                document.body.classList.remove('running'); // Restore background
                timerButton.classList.remove('paused');  // Remove "paused" class to return to original color
                isRunning = false; // Reset the timer state
            }
        }, 1000); // Update every second
    }
}

// Pause the timer
function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    timerButton.textContent = 'Resume Timer';
    document.body.classList.remove('running');
    timerButton.classList.remove('paused');  // Remove "paused" class to return to original color
}

// Toggle start/pause on button click
timerButton.addEventListener('click', () => {
    if (isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
});

// Initialize the display
updateDisplay();
