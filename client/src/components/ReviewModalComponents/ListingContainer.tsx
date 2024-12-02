import { useState } from "react";
import { ReviewComponent } from "./ReviewComponent";
import { AddReviewComponent } from "./AddReviewComponent";
import { Review } from "./ReviewComponent";
import { Button } from "react-bootstrap";
import { useEffect } from "react";

// Define the structure of a restroom listing
interface Listing {
  name: string; // Name of the restroom listing
  reviews: Review[]; // List of reviews for the restroom
}

// Main component to represent a restroom listing
export const ListingContainer = ({
  listing,
  showReviews,
}: {
  listing: Listing;
  showReviews: Boolean;
}) => {
  // State to manage reviews, initializing with the listing's reviews and emoji counts
  const [reviews, setReviews] = useState(
    listing.reviews.map((review) => ({
      ...review,
      emojis: { "👍": 0, "👎": 0, "✨": 0, "💩": 0 }, // Default emoji counts
    }))
  );

  useEffect(() => {
    setReviews(
      listing.reviews.map((review) => ({
        ...review,
        emojis: { "👍": 0, "👎": 0, "✨": 0, "💩": 0 },
      }))
    );
  }, [listing]);

  // Handle emoji reaction button clicks
  const handleReact = (reviewIndex: number, emoji: keyof Review["emojis"]) => {
    setReviews((prevReviews: any) => {
      // Create a copy of the reviews to update
      const updatedReviews = [...prevReviews];
      // Increment the count for the clicked emoji on the specific review
      updatedReviews[reviewIndex].emojis[emoji]++;
      return updatedReviews; // Return the updated reviews
    });
  };

  // Add a new review to the reviews list
  const handleAddReview = (newReview: Review) => {
    setReviews([
      ...reviews,
      {
        ...newReview,
        emojis: { "👍": 0, "👎": 0, "✨": 0, "💩": 0 }, // Initialize new review with default emoji counts
      },
    ]);
  };

  return (
    <div>
      {/* Display the restroom listing name */}
      <h3 className="w-100 text-center">{listing.name}</h3>

      {/* Form to add a new review */}
      <AddReviewComponent onAddReview={handleAddReview} />
      {/* Conditionally render reviews if visible */}
      {showReviews && (
        <ReviewComponent reviews={reviews} onReact={handleReact} />
      )}
    </div>
  );
};
