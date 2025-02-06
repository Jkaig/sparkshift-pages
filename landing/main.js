document.addEventListener('DOMContentLoaded', () => {
    // Ensure single redirection attempt
    if (!window.location.href.includes('/landing/')) {
        window.location.href = '/landing/';
    }
});
