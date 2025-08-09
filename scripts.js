// === GLOBAL SCOPE DEMONSTRATION ===
// Variables in global scope accessible throughout the entire script
var globalCounter = 0;
const APP_NAME = "Immah's Research Portal";

// === MAIN APPLICATION FUNCTION ===
// Function scope demonstration with parameters and return values
function initializeApp() {
    console.log("Initializing " + APP_NAME);
    
    // Setup all event listeners
    setupEventListeners();
    
    // Initialize animations section
    initializeAnimations();
    
    return "Application initialized successfully";
}

// === EVENT LISTENERS SETUP ===
// Function with parameter demonstrating scope
function setupEventListeners() {
    // Local scope variables
    const form = document.getElementById('research-form');
    const themeToggle = document.getElementById('theme-toggle');
    const resetBtn = document.getElementById('reset-btn');
    
    // Form submission event handler
    form.addEventListener('submit', function(event) {
        // Local scope within event handler
        event.preventDefault();
        validateForm();
    });
    
    // Reset button event handler
    resetBtn.addEventListener('click', function() {
        clearErrors();
    });
    
    // Theme toggle event handler
    themeToggle.addEventListener('click', toggleTheme);
    
    // Progress tracker event handlers
    setupProgressTracker();
    
    // Animation button event handlers
    setupAnimationButtons();
    
    // Hobby item hover effects
    setupHobbyInteractions();
}

// === ANIMATION FUNCTIONALITY ===
// Function demonstrating parameters and return values
function initializeAnimations() {
    const animatedBox = document.getElementById('animated-box');
    
    // Add initial fade-in animation
    animatedBox.classList.add('fade-in');
    
    return "Animations initialized";
}

// Function with parameters for animation triggers
function triggerAnimation(animationType) {
    const animatedBox = document.getElementById('animated-box');
    
    // Remove all animation classes
    animatedBox.classList.remove('bounce-animation', 'pulse-animation', 'slide-animation', 'rotate-animation');
    
    // Add requested animation class based on parameter
    switch(animationType) {
        case 'bounce':
            animatedBox.classList.add('bounce-animation');
            break;
        case 'pulse':
            animatedBox.classList.add('pulse-animation');
            break;
        case 'slide':
            animatedBox.classList.add('slide-animation');
            break;
        case 'rotate':
            animatedBox.classList.add('rotate-animation');
            break;
        default:
            console.log('Unknown animation type: ' + animationType);
    }
    
    // Return status message
    return "Animation '" + animationType + "' triggered";
}

// Function to setup animation buttons
function setupAnimationButtons() {
    const bounceBtn = document.getElementById('bounce-btn');
    const pulseBtn = document.getElementById('pulse-btn');
    const slideBtn = document.getElementById('slide-btn');
    
    // Event handlers with function calls and parameters
    bounceBtn.addEventListener('click', function() {
        triggerAnimation('bounce');
    });
    
    pulseBtn.addEventListener('click', function() {
        triggerAnimation('pulse');
    });
    
    slideBtn.addEventListener('click', function() {
        triggerAnimation('slide');
    });
}

// === PROGRESS TRACKER FUNCTIONALITY ===
// Function demonstrating scope and parameters
function setupProgressTracker() {
    const addTaskBtn = document.getElementById('add-task');
    const newTaskInput = document.getElementById('new-task');
    
    addTaskBtn.addEventListener('click', function() {
        addNewTask(newTaskInput.value);
    });
    
    newTaskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addNewTask(newTaskInput.value);
        }
    });
    
    // Event delegation for delete buttons
    document.getElementById('task-list').addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-task')) {
            removeTask(event.target);
        }
    });
}

// Function with parameter and return value
function addNewTask(taskText) {
    // Local scope variable
    const taskList = document.getElementById('task-list');
    
    if (taskText.trim() !== '') {
        // Create new task element
        const li = document.createElement('li');
        li.className = 'task-item';
        li.textContent = taskText;
        
        // Add delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-task';
        deleteBtn.textContent = 'Delete';
        li.appendChild(deleteBtn);
        
        // Add to list with animation
        li.style.animation = 'fadeIn 0.3s ease-in';
        taskList.appendChild(li);
        
        // Clear input
        document.getElementById('new-task').value = '';
        
        // Increment global counter
        globalCounter++;
        
        return true; // Success
    } else {
        alert('Please enter a task!');
        return false; // Failure
    }
}

// Function with parameter
function removeTask(deleteButton) {
    // Local scope within function
    const taskItem = deleteButton.parentElement;
    taskItem.style.animation = 'fadeOut 0.3s ease-out';
    
    // Remove after animation completes
    setTimeout(function() {
        taskItem.remove();
        globalCounter--; // Decrement global counter
    }, 300);
}

// === FORM VALIDATION FUNCTIONALITY ===
// Function demonstrating parameters, return values, and scope
function validateForm() {
    // Local scope variables within validation function
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const email = document.getElementById('email').value;
    const topic = document.getElementById('research-topic').value;
    const field = document.getElementById('field').value;
    const message = document.getElementById('message').value;
    const agree = document.getElementById('agree').checked;
    
    // Clear previous errors
    clearErrors();
    
    // Validation flags
    let isValid = true;
    
    // Validate each field using helper functions
    if (!validateName(fname, 'fname-error')) isValid = false;
    if (!validateName(lname, 'lname-error')) isValid = false;
    if (!validateEmail(email, 'email-error')) isValid = false;
    if (!validateTopic(topic, 'topic-error')) isValid = false;
    if (!validateField(field, 'field-error')) isValid = false;
    if (!validateMessage(message, 'message-error')) isValid = false;
    if (!validateAgreement(agree, 'agree-error')) isValid = false;
    
    // If valid, show success
    if (isValid) {
        showSuccessMessage();
        document.getElementById('research-form').reset();
    }
    
    return isValid;
}

// Helper validation functions with parameters and return values
function validateName(name, errorId) {
    if (name.trim() === '') {
        showError(errorId, 'This field is required');
        return false;
    } else if (name.length < 2) {
        showError(errorId, 'Must be at least 2 characters');
        return false;
    }
    return true;
}

function validateEmail(email, errorId) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === '') {
        showError(errorId, 'Email is required');
        return false;
    } else if (!emailRegex.test(email)) {
        showError(errorId, 'Please enter a valid email');
        return false;
    }
    return true;
}

function validateTopic(topic, errorId) {
    if (topic.trim() === '') {
        showError(errorId, 'Research topic is required');
        return false;
    } else if (topic.length < 5) {
        showError(errorId, 'Must be at least 5 characters');
        return false;
    }
    return true;
}

function validateField(field, errorId) {
    if (field === '') {
        showError(errorId, 'Please select a field');
        return false;
    }
    return true;
}

function validateMessage(message, errorId) {
    if (message.trim() === '') {
        showError(errorId, 'Message is required');
        return false;
    } else if (message.length < 20) {
        showError(errorId, 'Must be at least 20 characters');
        return false;
    }
    return true;
}

function validateAgreement(agree, errorId) {
    if (!agree) {
        showError(errorId, 'Agreement is required');
        return false;
    }
    return true;
}

// Function with parameter
function showError(elementId, message) {
    document.getElementById(elementId).textContent = message;
}

// Function to clear all errors
function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(function(element) {
        element.textContent = '';
    });
}

// Function demonstrating return value
function showSuccessMessage() {
    alert('Form submitted successfully! Thank you for your collaboration request.');
    return "Success message displayed";
}

// === THEME TOGGLE FUNCTIONALITY ===
// Function demonstrating scope
function toggleTheme() {
    // Local scope variable
    const body = document.body;
    body.classList.toggle('dark-theme');
    
    // Update button text based on current theme
    const themeToggle = document.getElementById('theme-toggle');
    if (body.classList.contains('dark-theme')) {
        themeToggle.textContent = 'Light Theme';
    } else {
        themeToggle.textContent = 'Dark Theme';
    }
}

// === HOBBY INTERACTIONS ===
// Function demonstrating event handling
function setupHobbyInteractions() {
    const hobbyItems = document.querySelectorAll('#hobbies-list li');
    
    hobbyItems.forEach(function(item) {
        // Mouse enter event
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#788a81';
            this.style.cursor = 'pointer';
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });
        
        // Mouse leave event
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
            this.style.transform = 'scale(1)';
        });
    });
}

// === APPLICATION INITIALIZATION ===
// Call main initialization function when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Call main initialization function
    const initResult = initializeApp();
    console.log(initResult);
    
    // Log global counter status
    console.log("Global counter initialized to: " + globalCounter);
});