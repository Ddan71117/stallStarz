import { Review } from "./ReviewComponent";
import { useState } from "react";
import { Form } from "react-bootstrap";
// Component to allow users to add a new review
export interface AddReviewProps {
  onAddReview: (review: Review) => void; // Function to pass the new review to the parent
}

export const AddReviewComponent = ({ onAddReview }: AddReviewProps) => {
  // States to manage form inputs
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Handle form submission to add a review
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault(); // Prevent default form submission behavior
    onAddReview({
      title, // User-provided title
      content, // User-provided content
      emojis: { "👍": 0, "👎": 0, "✨": 0, "💩": 0 }, // Initialize emoji counts
    });
    setTitle(""); // Clear the title input field
    setContent(""); // Clear the content input field
  };

  return (
    <form onSubmit={handleSubmit} id="reviewForm">
      {/* Input for the review title */}
      <Form.Group className="m-2" controlId="reviewTitle">
        <Form.Control
          type="text"
          placeholder="Name your Review"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>
      {/* Text area for the review content */}
      <Form.Group className="m-2" controlId="reviewContent">
        <Form.Control
          as="textarea"
          placeholder="Enter your review here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          required
        />
      </Form.Group>
    </form>
  );
};
