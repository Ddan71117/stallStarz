import React, { useEffect, useState } from 'react';

// Component to display a list of reviews
const ReviewComponent = ({ reviews, onReact }) => {
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
              <button key={emoji} onClick={() => onReact(index, emoji)}>
                {emoji} {count} {/* Show emoji and count */}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Main component to represent a restroom listing
const ListingContainer = ({ listing }) => {
  const [showReviews, setShowReviews] = useState(false); // Toggle review visibility
  const [reviews, setReviews] = useState(
    listing.reviews.map((review) => ({
      ...review,
      emojis: { ':+1:': 0, ':-1:': 0, ':sparkles:': 0, ':hankey:': 0 }, // Default emoji counts
    }))
  );

  // Handle emoji reaction button clicks
  const handleReact = (reviewIndex, emoji) => {
    setReviews((prevReviews) => {
      const updatedReviews = [...prevReviews];
      updatedReviews[reviewIndex].emojis[emoji]++;
      return updatedReviews;
    });
  };

  // Toggle the visibility of the reviews
  const handleReadReviews = () => {
    setShowReviews(!showReviews);
  };

  // Add a new review to the reviews list
  const handleAddReview = (newReview) => {
    setReviews([
      ...reviews,
      {
        ...newReview,
        emojis: { ':+1:': 0, ':-1:': 0, ':sparkles:': 0, ':hankey:': 0 }, // Default emoji counts
      },
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
const AddReviewComponent = ({ onAddReview }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Handle form submission to add a review
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    onAddReview({
      title,
      content,
      emojis: { ':+1:': 0, ':-1:': 0, ':sparkles:': 0, ':hankey:': 0 }, // Initialize emoji counts
    });
    setTitle(''); // Clear the title input
    setContent(''); // Clear the content input
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
const fetchGitHubEmojis = async () => {
  try {
    const response = await fetch('https://api.github.com/emojis');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    // Return a subset of emojis with their URLs
    return { ':+1:': data['+1'], ':-1:': data['-1'], ':sparkles:': data['sparkles'], ':hankey:': data['hankey'] };
  } catch (error) {
    console.error('Error fetching emojis:', error);
    return {};
  }
};

// Main ReviewsAndRatings component
const ReviewsAndRatings = ({ listing }) => {
  const [emojiUrl, setEmojiUrl] = useState({});

  // Fetch emojis when the component mounts
  useEffect(() => {
    const fetchEmojis = async () => {
      const emojis = await fetchGitHubEmojis();
      setEmojiUrl(emojis);
    };
    fetchEmojis();
  }, []);

  return (
    <div>
      <ListingContainer listing={listing} />
    </div>
  );
};

export default ReviewsAndRatings;