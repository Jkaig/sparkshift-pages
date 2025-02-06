document.addEventListener("DOMContentLoaded",()=>{let e=document.getElementById("app");e.innerHTML=`
        <div class="loading-screen">
            <div class="loader"></div>
            <h1>Launching SparkShift</h1>
        </div>
    `,setTimeout(()=>{e.innerHTML=`
            <header class="hero">
                <h1>Transform ML Workflows with <span>SparkShift</span></h1>
                <p class="subtitle">Enterprise-grade machine learning deployment made simple</p>
            </header>
            
            <section class="features-grid">
                <article class="feature-card">
                    <div class="feature-icon">\u{1F680}</div>
                    <h3>One-Click Deployment</h3>
                    <p>Deploy TensorFlow/PyTorch models with automated scaling</p>
                </article>
                
                <article class="feature-card">
                    <div class="feature-icon">\u{1F4CA}</div>
                    <h3>Live Analytics</h3>
                    <p>Real-time performance monitoring & drift detection</p>
                </article>
                
                <article class="feature-card">
                    <div class="feature-icon">\u{1F517}</div>
                    <h3>Smart Integrations</h3>
                    <p>Connect with S3, BigQuery, Snowflake & more</p>
                </article>
            </section>
            
            <div class="cta-section">
                <button class="cta-button">Start Free Trial</button>
                <p class="cta-note">14-day trial \u{2022} No credit card required</p>
            </div>
        `},1500)});
//# sourceMappingURL=index.4fa79803.js.map
