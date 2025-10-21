document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('site-header');
    const trigger = document.getElementById('show-header-vertical-trigger');

    if (!header) {
        console.error('Header not found!');
        return;
    }

    if (!trigger) {
        console.error('Trigger element not found!');
        return;
    }

    window.addEventListener('scroll', () => {
        const triggerBottom = trigger.getBoundingClientRect().bottom;
        if (triggerBottom <= 0) {
            header.classList.add('show');
        } else {
            header.classList.remove('show');
        }
    });
});
