function selectTheme(themeId) {
    // Remove the 'selected' class from all images and spans
    document.querySelectorAll('.theme img').forEach(img => {
        img.classList.remove('selected');
    });
    document.querySelectorAll('.theme span').forEach(span => {
        span.classList.remove('selected');
    });

    // Add the 'selected' class to the clicked image and its corresponding span
    document.getElementById(themeId).classList.add('selected');
    document.querySelector(`[onclick="selectTheme('${themeId}')"] span`).classList.add('selected');

    document.getElementById('selected-theme').value = themeId;

    console.log(document.getElementById('selected-theme').value);
}

// Ensure the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Function to adjust the height of the image
    function adjustImageHeight() {
        var img = document.getElementById('theme-preview-img');
        if (img) {
            var width = img.offsetWidth; // Get the width of the image
            img.style.height = width + 'px'; // Set the height equal to the width
        }
    }

    // Set the height initially
    adjustImageHeight();

    // Add the event listener for 'resize' event
    window.addEventListener('resize', adjustImageHeight);

    document.getElementById('theme-preview-img').addEventListener('click', function () {
        document.getElementById('image-url-input').style.display = 'block'; // Show the input field

        document.getElementById('')
    });

    document.getElementById('theme-preview-img').addEventListener('click', function () {
        var themePreviewDiv = document.getElementById('theme-preview-div');
        themePreviewDiv.classList.toggle('hide-hover-text');
    });


    // Function to update the image and hidden input when the new URL is submitted
    document.getElementById('update-image-button').addEventListener('click', function () {
        var imageUrl = document.getElementById('image-url').value;
        document.getElementById('theme-preview-img').src = imageUrl; // Update the image src
        document.getElementById('thumbnail-img-url').value = imageUrl; // Update the hidden input value
    });
});

function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get all form data
    var formData = {
        eventName: document.getElementById('eventName').value,
        startTime: document.getElementById('start-datetime').value, // Assuming id 'datetime' is your start time
        endTime: document.getElementById('end-datetime').value, // Add correct ID for end time
        multiSessionEvent: document.getElementById('multiSessionEvent').checked,
        eventLocation: document.getElementById('eventLocation').value,
        tickets: document.getElementById('tickets').value,
        requireApproval: document.getElementById('tickets-toggle').checked,
        capacity: document.getElementById('capacity-textarea').value,
        visibility: document.getElementById('visibility-select').value, //line 62
        selectedTheme: document.getElementById('selected-theme').value,
        thumbnailImgUrl: document.getElementById('thumbnail-img-url').value
    };

    console.log(formData);

    // Retrieve the existing events from local storage
    var eventsJson = localStorage.getItem('events');
    var events = eventsJson ? JSON.parse(eventsJson) : []; // Add a check here

    // Add the new event to the array
    events.push(formData);

    // Store the updated events array in local storage
    localStorage.setItem('events', JSON.stringify(events));

    console.log('Form Data Saved:', formData);

    resetForm();
}

function resetForm() {
    document.getElementById('createEventForm').reset();

    // After the form reset, also clear the 'selected' class from themes and reset the hidden select
    document.querySelectorAll('.theme img.selected').forEach(img => {
        img.classList.remove('selected');
    });
    document.querySelectorAll('.theme span.selected').forEach(span => {
        span.classList.remove('selected');
    });

    // Reset the hidden select to its default value, if needed
    document.getElementById('selected-theme').value = ''; // or set to the default value you want

}


// Add event listener to form submission
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('createEventForm').addEventListener('submit', handleFormSubmit);
});