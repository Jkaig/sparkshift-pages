// Firebase Configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const analytics = firebase.analytics();

// Initialize Stripe
const stripe = Stripe('pk_test_your_stripe_key'); // Replace with your Stripe public key

// Auth state observer
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log('User is signed in:', user.uid);
        checkSubscriptionStatus(user.uid);
    } else {
        console.log('No user is signed in.');
    }
});

// Check subscription status
async function checkSubscriptionStatus(userId) {
    try {
        const doc = await db.collection('subscriptions')
            .doc(userId)
            .get();
        
        if (doc.exists && doc.data().status === 'active') {
            showPremiumContent();
        } else {
            showFreemiumContent();
        }
    } catch (error) {
        console.error('Error checking subscription:', error);
    }
}

// Payment handling
async function handlePayment(planId) {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error('Please sign in first');
        }

        const response = await fetch('YOUR_PAYMENT_ENDPOINT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${await user.getIdToken()}`
            },
            body: JSON.stringify({ planId })
        });

        const { clientSecret } = await response.json();
        const { error } = await stripe.confirmPayment({
            clientSecret,
            confirmParams: {
                return_url: window.location.origin + '/success'
            }
        });

        if (error) {
            throw new Error(error.message);
        }
    } catch (error) {
        console.error('Payment error:', error);
        alert(error.message);
    }
}

// Initialize Stripe
const stripe = Stripe(process.env.STRIPE_PUBLIC_KEY);

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    
    // Show loading screen
    app.innerHTML = `
        <div class="loading-screen">
            <div class="loader"></div>
            <h1>Launching SparkShift</h1>
        </div>
    `;

    // Load main content after delay
    setTimeout(() => {
        app.innerHTML = `
            <header class="hero">
                <h1>Ace Your Journeyman Exams with <span>SparkShift</span></h1>
                <p class="subtitle">Comprehensive prep courses with AI-powered practice tests and study plans</p>
            </header>
            
            <section class="features-grid">
                <article class="feature-card">
                    <div class="feature-icon">📚</div>
                    <h3>Smart Study Plans</h3>
                    <p>AI-generated study schedules tailored to your exam date</p>
                </article>
                
                <article class="feature-card">
                    <div class="feature-icon">✅</div>
                    <h3>Practice Exams</h3>
                    <p>1000+ practice questions with detailed explanations</p>
                </article>
                
                <article class="feature-card">
                    <div class="feature-icon">👨🏫</div>
                    <h3>Expert Instructors</h3>
                    <p>Live support from licensed journeyman professionals</p>
                </article>
            </section>
            
            ${renderSampleTest()}
            
            <div class="cta-section">
                <div class="store-badges">
                    <a href="https://apps.apple.com/us/app/sparkshift/id6737710285">
                        <img src="app-store-badge.svg" alt="Download on the App Store" class="store-badge">
                    </a>
                    <a href="https://play.google.com/store/apps/details?id=com.sparkshift">
                        <img src="play-store-badge.svg" alt="Get on Google Play" class="store-badge">
                    </a>
                </div>
                <p class="cta-note">Available on iOS and Android</p>
            </div>
        `;
    }, 1500);
});

function loadModernInterface() {
    const contentDiv = document.querySelector('.content');
    contentDiv.innerHTML = `
        <header class="hero">
            <h1>Ace Your Journeyman Exams with <span>SparkShift</span></h1>
            <p class="subtitle">Comprehensive prep courses with AI-powered practice tests and study plans</p>
        </header>
        
        <section class="features-grid">
            <article class="feature-card">
                <div class="feature-icon">📚</div>
                <h3>Smart Study Plans</h3>
                <p>AI-generated study schedules tailored to your exam date</p>
            </article>
            
            <article class="feature-card">
                <div class="feature-icon">✅</div>
                <h3>Practice Exams</h3>
                <p>1000+ practice questions with detailed explanations</p>
            </article>
            
            <article class="feature-card">
                <div class="feature-icon">👨🏫</div>
                <h3>Expert Instructors</h3>
                <p>Live support from licensed journeyman professionals</p>
            </article>
        </section>
        
        ${renderSampleTest()}
        
        <div class="cta-section">
            <div class="store-badges">
                <a href="https://apps.apple.com/us/app/sparkshift/id6737710285">
                    <img src="app-store-badge.svg" alt="Download on the App Store" class="store-badge">
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.sparkshift">
                    <img src="play-store-badge.svg" alt="Get on Google Play" class="store-badge">
                </a>
            </div>
            <p class="cta-note">Available on iOS and Android</p>
        </div>
    `;
    document.body.classList.remove('loading');
}

function renderAuthUI() {
    return `
        <div class="auth-container" id="authUI">
            <h2>Sign In to Access Premium Content</h2>
            <button onclick="signInWithGoogle()" class="auth-button google">
                <img src="google-icon.svg" alt="Google"> Continue with Google
            </button>
            <button onclick="signInWithApple()" class="auth-button apple">
                <img src="apple-icon.svg" alt="Apple"> Continue with Apple
            </button>
            <div class="auth-divider">or</div>
            <form onsubmit="handleEmailAuth(event)" class="auth-form">
                <input type="email" id="authEmail" placeholder="Email" required>
                <input type="password" id="authPassword" placeholder="Password" required>
                <button type="submit" class="auth-button email">Sign In / Sign Up</button>
            </form>
        </div>
    `;
}

async function signInWithGoogle() {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        await auth.signInWithPopup(provider);
    } catch (error) {
        console.error('Google sign-in error:', error);
        alert(error.message);
    }
}

async function signInWithApple() {
    try {
        const provider = new firebase.auth.OAuthProvider('apple.com');
        await auth.signInWithPopup(provider);
    } catch (error) {
        console.error('Apple sign-in error:', error);
        alert(error.message);
    }
}

async function handleEmailAuth(event) {
    event.preventDefault();
    const email = document.getElementById('authEmail').value;
    const password = document.getElementById('authPassword').value;

    try {
        await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
        if (error.code === 'auth/user-not-found') {
            try {
                await auth.createUserWithEmailAndPassword(email, password);
            } catch (signUpError) {
                console.error('Sign up error:', signUpError);
                alert(signUpError.message);
            }
        } else {
            console.error('Sign in error:', error);
            alert(error.message);
        }
    }
}

function showDeeplinkError() {
    const contentDiv = document.querySelector('.content');
    contentDiv.innerHTML = `
        <div class="deeplink-error">
            <h2>🔗 Invalid Link</h2>
            <p>This QR code points to a resource that doesn't exist.</p>
            <div class="action-buttons">
                <button onclick="loadModernInterface()" class="cta-button">
                    Go to Home
                </button>
            </div>
        </div>
    `;
    document.body.classList.remove('loading');
}

function renderSampleTest() {
    return `
    <section class="sample-test">
        <h2>Free Diagnostic Quiz</h2>
        <div class="test-content">
            <p>Try 5 sample questions from our full exam bank:</p>
            <!-- Question components would go here -->
        </div>
        <div class="paywall-overlay">
            <p>Unlock full tests with SparkShift Pro</p>
            <button class="cta-button" onclick="window.location.href='/pricing/'">Upgrade Now</button>
        </div>
    </section>
    `;
}
