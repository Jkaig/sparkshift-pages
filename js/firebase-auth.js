// Initialize Firebase
const firebaseConfig = {
    // Your Firebase configuration will go here
    // You'll need to replace these with your actual Firebase config values
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Handle Sign In
function handleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            // Handle successful sign in
            const user = result.user;
            updateUIForUser(user);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// Handle Sign Out
function handleSignOut() {
    firebase.auth().signOut()
        .then(() => {
            updateUIForUser(null);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// Update UI based on auth state
function updateUIForUser(user) {
    const signInButton = document.getElementById('signInButton');
    if (user) {
        signInButton.textContent = 'Sign Out';
        signInButton.onclick = handleSignOut;
    } else {
        signInButton.textContent = 'Sign In';
        signInButton.onclick = handleSignIn;
    }
}

// Check auth state on page load
firebase.auth().onAuthStateChanged(function(user) {
    updateUIForUser(user);
});
