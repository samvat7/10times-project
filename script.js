function selectTheme(themeId) {
    
    document.querySelectorAll('.theme img').forEach(img => {
        img.classList.remove('selected');
    });
    document.querySelectorAll('.theme span').forEach(span => {
        span.classList.remove('selected');
    });

    document.getElementById(themeId).classList.add('selected');
    document.querySelector(`[onclick="selectTheme('${themeId}')"] span`).classList.add('selected');

    document.getElementById('selected-theme').value = themeId;

    console.log(document.getElementById('selected-theme').value);
}

document.addEventListener('DOMContentLoaded', function () {

    function adjustImageHeight() {
        var img = document.getElementById('theme-preview-img');
        if (img) {
            var width = img.offsetWidth; 
            img.style.height = width + 'px'; 
        }
    }

    adjustImageHeight();

    window.addEventListener('resize', adjustImageHeight);

    document.getElementById('theme-preview-img').addEventListener('click', function () {
        document.getElementById('image-url-input').style.display = 'block'; 

        document.getElementById('')
    });

    document.getElementById('theme-preview-img').addEventListener('click', function () {
        var themePreviewDiv = document.getElementById('theme-preview-div');
        themePreviewDiv.classList.toggle('hide-hover-text');
    });


    document.getElementById('update-image-button').addEventListener('click', function () {
        var imageUrl = document.getElementById('image-url').value;
        document.getElementById('theme-preview-img').src = imageUrl; 
        document.getElementById('thumbnail-img-url').value = imageUrl; 
    });
});

function handleFormSubmit(event) {
    event.preventDefault(); 

    var formData = {
        eventName: document.getElementById('eventName').value,
        startTime: document.getElementById('start-datetime').value,
        endTime: document.getElementById('end-datetime').value,
        multiSessionEvent: document.getElementById('multiSessionEvent').checked,
        eventLocation: document.getElementById('eventLocation').value,
        tickets: document.getElementById('tickets').value,
        requireApproval: document.getElementById('tickets-toggle').checked,
        capacity: document.getElementById('capacity-textarea').value,
        visibility: document.getElementById('visibility-select').value,
        selectedTheme: document.getElementById('selected-theme').value,
        thumbnailImgUrl: document.getElementById('thumbnail-img-url').value
    };

    console.log(formData);

    var eventsJson = localStorage.getItem('events');
    var events = eventsJson ? JSON.parse(eventsJson) : []; 

    events.push(formData);

    localStorage.setItem('events', JSON.stringify(events));

    console.log('Form Data Saved:', formData);

    resetForm();
}

function resetForm() {
    document.getElementById('createEventForm').reset();

    document.querySelectorAll('.theme img.selected').forEach(img => {
        img.classList.remove('selected');
    });
    document.querySelectorAll('.theme span.selected').forEach(span => {
        span.classList.remove('selected');
    });

    document.getElementById('selected-theme').value = '';
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('createEventForm').addEventListener('submit', handleFormSubmit);
});