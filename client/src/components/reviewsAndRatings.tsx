import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ListingContainer } from "./ReviewModalComponents/ListingContainer";

interface ReviewsAndRatingsProps {
  restroomId: string;
  restroomName: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ReviewsAndRatings({ restroomId, restroomName, isOpen, onClose }: ReviewsAndRatingsProps) {
  // Remove the redundant showReviews state, use isOpen prop instead
  const [reviews, setReviews] = useState([
    {
      title: "Clean and well-maintained",
      content: "Great restroom!",
      emojis: { "👍": 0, "👎": 0, "✨": 0, "💩": 0 },
    },
    {
      title: "Could be better",
      content: "It was okay, but needs more attention.",
      emojis: { "👍": 0, "👎": 0, "✨": 0, "💩": 0 },
    },
  ]);

  const testListing = { name: restroomName || "Random restroom location", reviews };

  const handleAddReview = (newReview: any) => {
    setReviews((prevReviews) => [...prevReviews, newReview]);
  };

  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header
        style={{ backgroundColor: "#690B3E", color: "#FFFFFF" }}
        closeButton
      >
        <Modal.Title className="w-100 text-center">
          Ratings and Reviews
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#16485C", color: "#FFFFFF" }}>
        <ListingContainer listing={testListing} showReviews={true} />
      </Modal.Body>
      <Modal.Footer
        style={{ backgroundColor: "#16485C", color: "#FFFFFF" }}
        className="flex-d justify-content-center"
      >
        <Button
          style={{
            backgroundColor: "#1F2020",
            color: "#FFFFFF",
          }}
          className="ml-3"
          type="submit"
          form="reviewForm"
        >
          Add Review
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ReviewsAndRatings;