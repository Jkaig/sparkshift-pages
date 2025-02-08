document.addEventListener("DOMContentLoaded",()=>{let e=document.querySelector(".loading-indicator"),t=document.querySelector(".content");e.classList.add("visible"),t.style.opacity="0.3",setTimeout(()=>{e.classList.remove("visible"),t.style.opacity="1",document.querySelector(".content").innerHTML=`
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
    `,document.body.classList.remove("loading")},1500)});
//# sourceMappingURL=index.33f9d395.js.map
