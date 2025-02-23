const subjects = {
    nebulaX: {
        name: 'Math Fun',
        icon: 'calculator',
        courses: [
            { id: 1, title: 'Counting Adventures', description: 'Learn to count with fun games!', youtube: 'https://www.youtube.com/watch?v=OEbRDtCAFdU' },
            { id: 2, title: 'Shapes & Patterns', description: 'Explore shapes and colorful patterns!', youtube: 'https://www.youtube.com/watch?v=zw47_q9wbBE' },
            { id: 3, title: 'Addition & Subtraction', description: 'Learn simple math with fun tricks!', youtube: 'https://www.youtube.com/watch?v=WT_wvvEvkw4' }
        ]
    },
    stellarWave: {
        name: 'English Fun',
        icon: 'book-open',
        courses: [
            { id: 1, title: 'ABC Songs', description: 'Sing and learn the alphabet!', youtube: 'https://www.youtube.com/watch?v=75p-N9YKqNo' },
            { id: 2, title: 'Phonics for Kids', description: 'Learn sounds and spell words!', youtube: 'https://youtu.be/d0Hq0fjT3r4?si=qZNspDcGwfb-qE8W' },
            { id: 3, title: 'Story Time', description: 'Enjoy classic bedtime stories!', youtube: 'https://www.youtube.com/watch?v=79kpoGF8KWU' }
        ]
    },
    quantumSpark: {
        name: 'Science for Kids',
        icon: 'flask-conical',
        courses: [
            { id: 1, title: 'The Solar System', description: 'Explore planets and stars!', youtube: 'https://www.youtube.com/watch?v=mQrlgH97v94' },
            { id: 2, title: 'Animals & Habitats', description: 'Learn about where animals live!', youtube: 'https://youtu.be/Xj1ASC-TlsI?si=5yR1cL7Zpuj-H8CZ' },
            { id: 3, title: 'Fun Experiments', description: 'Try cool science tricks at home!', youtube: 'https://youtu.be/hGwG--GZEfw?si=NNET1Ae18MAE39Mw' }
        ]
    }
};

// Track completed courses
const completedCourses = new Set();

const cosmicHub = document.getElementById('cosmic-hub');
const quantumPortal = document.getElementById('quantum-portal');
const starlightPath = document.getElementById('starlight-path');

// Create subject cards
function createSubjectCards() {
    cosmicHub.innerHTML = Object.entries(subjects)
        .map(([key, subject]) => `
            <div class="galactic-tile" data-subject="${key}">
                <div class="stellar-content">
                    <div class="icon-orbit">
                        <i data-lucide="${subject.icon}"></i>
                    </div>
                    <h2 class="star-name">${subject.name}</h2>
                    <p class="orbit-description">Click to explore fun lessons!</p>
                </div>
            </div>
        `)
        .join('');
    
    lucide.createIcons();
}

// Create course cards for a specific subject
function createCourseCards(subjectKey) {
    const subject = subjects[subjectKey];
    const supernovaDeck = quantumPortal.querySelector('.supernova-deck');
    
    supernovaDeck.innerHTML = subject.courses
        .map(course => `
            <div class="nebula-lesson ${completedCourses.has(`${subjectKey}-${course.id}`) ? 'nova-complete' : ''}" 
                 data-course-id="${subjectKey}-${course.id}">
                <div class="completion-badge">
                    <i data-lucide="check"></i> Completed
                </div>
                <div class="icon-orbit">
                    <i data-lucide="play-circle"></i>
                </div>
                <h3 class="star-name">${course.title}</h3>
                <p class="orbit-description">${course.description}</p>
                <button class="hyperdrive-start" data-youtube="${course.youtube}">
                    <i data-lucide="play"></i>
                    Watch Now
                </button>
            </div>
        `)
        .join('');
    
    lucide.createIcons();

    // Add click handlers for watch buttons
    supernovaDeck.querySelectorAll('.hyperdrive-start').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const youtubeLink = button.dataset.youtube;
            window.open(youtubeLink, '_blank'); // Open YouTube video in new tab

            const courseCard = button.closest('.nebula-lesson');
            const courseId = courseCard.dataset.courseId;

            // 10-second delay before marking as completed
            setTimeout(() => {
                completedCourses.add(courseId);
                courseCard.classList.add('nova-complete');
            }, 10000);
        });
    });
}

// Show courses for selected subject
function showCourses(subjectKey) {
    cosmicHub.classList.add('eclipse-hidden');
    quantumPortal.classList.remove('eclipse-hidden');
    createCourseCards(subjectKey);
}

// Show subjects
function showSubjects() {
    cosmicHub.classList.remove('eclipse-hidden');
    quantumPortal.classList.add('eclipse-hidden');
}

// Event Listeners
cosmicHub.addEventListener('click', (e) => {
    const subjectCard = e.target.closest('.galactic-tile');
    if (subjectCard) {
        const subjectKey = subjectCard.dataset.subject;
        showCourses(subjectKey);
    }
});

starlightPath.addEventListener('click', showSubjects);

// Initialize the app
createSubjectCards();
