

// Need to be able to view reviews

// Need to be able to edit existing reviews

// Need to be able to react to reviews by calling an external API to apply emojis to reviews
// API route
const fetchGitHubEmojis = async () => {
    try {
        // API call using fetch 
        const response = await fetch('https://api.github.com/emojis');
        
        if (!response.ok) {
            throw new Error(`Watch out: splash zone! Status: ${response.status}`);
        }
        
        const data = await response.json(); // Parse the JSON response
        console.log('Sad Emoji:', data.sob); // Log sad emoji URL
        console.log('Smiley Emoji:', data.smile); // Log smiley emoji URL
        console.log('Thumbs Up Emoji:', data['+1']); // Log thumbs up emoji URL
        console.log('Thumbs Down Emoji:', data['-1']); // Log thumbs down emoji URL
        console.log('Sparkles Emoji:', data.sparkles); // Log sparkles emoji URL
    } catch (error) {
        console.error('Error fetching emojis:', error.message);
    }
};

fetchGitHubEmojis();