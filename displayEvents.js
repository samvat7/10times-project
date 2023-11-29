document.addEventListener('DOMContentLoaded', function() {
    const eventsContainer = document.getElementById('eventsContainer');

    // Function to display events
    function displayEvents() {
        const events = JSON.parse(localStorage.getItem('events')) || [];

        console.log('test');

        console.log(events);

        if(events.length === 0) {
            eventsContainer.innerHTML = '<p>No events to display.</p>';
            return;
        }

        const eventsHtml = events.map(event => {

            var eventType = `In Person: ${event.eventLocation}`;

            const startDate = new Date(event.startTime).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
            const startTime = new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
            const endDate = new Date(event.endTime).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
            const endTime = new Date(event.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    

            if(!event.eventLocation){
                eventType = "Virtual";

            }

            return `
                <div class="event">
                <div class="event-date">
                <h2>${startDate}</h2>
                <span class="tooltip-text">From ${startDate}, ${startTime} to ${endDate}, ${endTime}</span>
                </div>
                <div class="event-details">
                <div class="event-time">${startTime}</div>
                <div class="event-info">
                    <h3>${event.eventName}</h3>
                    <p class="event-host">By user</p>
                    <p class="event-type">${eventType}</p>
                    <button class="event-invite">Invited</button>
                </div>
                <div class="event-image">
                    <img src="${event.thumbnailImgUrl}" alt="Event Thumbnail">
                </div>
                </div>
                </div>
            `;
        }).join('');

        eventsContainer.innerHTML = eventsHtml;
    }

    displayEvents();
});
