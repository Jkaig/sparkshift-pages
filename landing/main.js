document.addEventListener('DOMContentLoaded', () => {
    // Ensure single redirection attempt
    if (!window.location.href.includes('/landing/')) {
        window.location.href = '/landing/';
    }

    const loadingIndicator = document.querySelector('.loading-indicator');
    const content = document.querySelector('.content');
    
    // Show loading state
    if (loadingIndicator && content) {
        loadingIndicator.style.display = 'block';
        content.style.opacity = '0.3';

        // Load actual content after a brief delay
        setTimeout(() => {
            loadingIndicator.style.display = 'none';
            content.style.opacity = '1';
            loadMainContent();
        }, 1000);
    }
});

function loadMainContent() {
    const contentDiv = document.querySelector('.content');
    if (contentDiv) {
        contentDiv.innerHTML = `
            <h1>Welcome to Spark Shift</h1>
            <div class="features">
                <div class="feature-card">
                    <h2>🚀 Instant Deployment</h2>
                    <p>Deploy machine learning models with one click</p>
                </div>
                <div class="feature-card">
                    <h2>🔗 Smart Integrations</h2>
                    <p>Connect with popular ML frameworks and data sources</p>
                </div>
                <div class="feature-card">
                    <h2>📊 Real-time Analytics</h2>
                    <p>Monitor model performance in live dashboards</p>
                </div>
            </div>
            <button class="cta-button">Get Started</button>
        `;
    }
}
