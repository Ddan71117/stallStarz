import React, { useEffect, useState } from 'react';

// Define the structure of a review
interface Review {
    title: string; // Title of the review
    content: string; // Content of the review
    emojis: { '👍': number; '👎': number; '✨': number; '💩': number }; // Emoji counts for user reactions
}

// Component to display a list of reviews
const ReviewComponent = ({ 
    reviews, 
    onReact 
}: { 
    reviews: Review[], // List of reviews to display
    onReact: (reviewIndex: number, emoji: keyof Review['emojis']) => void // Function to handle emoji reactions
}) => {
    return (
        <div>
            {reviews.map((review, index) => (
                <div key={index}>
                    {/* Render the title and content of each review */}
                    <h4>{review.title}</h4>
                    <p>{review.content}</p>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        {/* Render buttons for each emoji with counts */}
                        {Object.entries(review.emojis).map(([emoji, count]) => (
                            <button 
                                key={emoji} 
                                onClick={() => onReact(index, emoji as keyof Review['emojis'])}
                            >
                                {emoji} {count} {/* Show emoji and count */}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

// Define the structure of a restroom listing
interface Listing {
    name: string; // Name of the restroom listing
    reviews: Review[]; // List of reviews for the restroom
}

// Main component to represent a restroom listing
const ListingContainer = ({ listing }: { listing: Listing }) => {
    // State to toggle review visibility
    const [showReviews, setShowReviews] = useState(false);

    // State to manage reviews, initializing with the listing's reviews and emoji counts
    const [reviews, setReviews] = useState(
        listing.reviews.map(review => ({
            ...review,
            emojis: { '👍': 0, '👎': 0, '✨': 0, '💩': 0 } // Default emoji counts
        }))
    );

    // Handle emoji reaction button clicks
    const handleReact = (reviewIndex: number, emoji: keyof Review['emojis']) => {
        setReviews(prevReviews => {
            // Create a copy of the reviews to update
            const updatedReviews = [...prevReviews];
            // Increment the count for the clicked emoji on the specific review
            updatedReviews[reviewIndex].emojis[emoji]++;
            return updatedReviews; // Return the updated reviews
        });
    };

    // Toggle the visibility of the reviews
    const handleReadReviews = () => {
        setShowReviews(!showReviews);
    };

    // Add a new review to the reviews list
    const handleAddReview = (newReview: Review) => {
        setReviews([
            ...reviews, 
            { 
                ...newReview, 
                emojis: { '👍': 0, '👎': 0, '✨': 0, '💩': 0 } // Initialize new review with default emoji counts
            }
        ]);
    };

    return (
        <div>
            {/* Display the restroom listing name */}
            <h3>{listing.name}</h3>
            {/* Button to toggle reviews */}
            <button onClick={handleReadReviews}>
                {showReviews ? 'Hide Reviews' : 'Read Reviews'}
            </button>
            {/* Conditionally render reviews if visible */}
            {showReviews && <ReviewComponent reviews={reviews} onReact={handleReact} />}
            {/* Form to add a new review */}
            <AddReviewComponent onAddReview={handleAddReview} />
        </div>
    );
};

// Component to allow users to add a new review
interface AddReviewProps {
    onAddReview: (review: Review) => void; // Function to pass the new review to the parent
}

const AddReviewComponent = ({ onAddReview }: AddReviewProps) => {
    // States to manage form inputs
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // Handle form submission to add a review
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault(); // Prevent default form submission behavior
        onAddReview({
            title, // User-provided title
            content, // User-provided content
            emojis: { '👍': 0, '👎': 0, '✨': 0, '💩': 0 } // Initialize emoji counts
        });
        setTitle(''); // Clear the title input field
        setContent(''); // Clear the content input field
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Input for the review title */}
            <input
                type="text"
                placeholder="Review Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            {/* Text area for the review content */}
            <textarea
                placeholder="Review Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
            {/* Submit button to add the review */}
            <button type="submit">Add Review</button>
        </form>
    );
};

// Function to fetch emojis from the GitHub Emojis API
const fetchGitHubEmojis = async (): Promise<{ [emoji: string]: string }> => {
    try {
        const response = await fetch('https://api.github.com/emojis');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Return a subset of emojis with their URLs
        return { '👍': data['+1'], '👎': data['-1'], '✨': data['sparkles'], '💩': data['hankey'] };
    } catch (error) {
        console.error('Error fetching emojis:', error);
        return {};
    }
};

// State to store fetched emoji URLs
const [emojiUrl, setEmojiUrl] = useState<{ [emoji: string]: string }>({});

// Fetch emojis
useEffect(() => {
    const fetchEmojis = async () => {
        const emojis = await fetchGitHubEmojis();
        setEmojiUrl(emojis); 
    };
    fetchEmojis();
}, []);
