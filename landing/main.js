document.addEventListener('DOMContentLoaded', () => {
    const loadingIndicator = document.querySelector('.loading-indicator');
    const content = document.querySelector('.content');
    
    // Show content immediately without redirects
    loadingIndicator.classList.add('visible');
    content.style.opacity = '0.3';

    // Load content after a brief delay
    setTimeout(() => {
        loadingIndicator.classList.remove('visible');
        content.style.opacity = '1';
        loadModernInterface();
    }, 1500);
});

function loadModernInterface() {
    const contentDiv = document.querySelector('.content');
    contentDiv.innerHTML = `
        <header class="hero">
            <h1>Transform ML Workflows with <span>SparkShift</span></h1>
            <p class="subtitle">Enterprise-grade machine learning deployment made simple</p>
        </header>
        
        <section class="features-grid">
            <article class="feature-card">
                <div class="feature-icon">🚀</div>
                <h3>One-Click Deployment</h3>
                <p>Deploy TensorFlow/PyTorch models with automated scaling</p>
            </article>
            
            <article class="feature-card">
                <div class="feature-icon">📊</div>
                <h3>Live Analytics</h3>
                <p>Real-time performance monitoring & drift detection</p>
            </article>
            
            <article class="feature-card">
                <div class="feature-icon">🔗</div>
                <h3>Smart Integrations</h3>
                <p>Connect with S3, BigQuery, Snowflake & more</p>
            </article>
        </section>
        
        <div class="cta-section">
            <button class="cta-button">Start Free Trial</button>
            <p class="cta-note">14-day trial • No credit card required</p>
        </div>
    `;
    document.body.classList.remove('loading');
}

function showDeeplinkError() {
    const contentDiv = document.querySelector('.content');
    contentDiv.innerHTML = `
        <div class="deeplink-error">
            <h2>🔗 Invalid Link</h2>
            <p>This QR code points to a resource that doesn't exist.</p>
            <div class="action-buttons">
                <button onclick="window.location.href='/sparkshift-pages/'" class="cta-button">
                    Go to Home
                </button>
            </div>
        </div>
    `;
    document.body.classList.remove('loading');
}
