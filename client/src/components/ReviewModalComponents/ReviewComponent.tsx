import { useState, useEffect } from "react";
import { FetchGitHubEmojis } from "./FetchGitHubEmojis";
import { ListGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";

// Define the structure of a review
export interface Review {
  title: string; // Title of the review
  content: string; // Content of the review
  emojis: { "👍": number; "👎": number; "✨": number; "💩": number }; // Emoji counts for user reactions
}

// Component to display a list of reviews
export const ReviewComponent = ({
  reviews,
  onReact,
}: {
  reviews: Review[]; // List of reviews to display
  onReact: (reviewIndex: number, emoji: keyof Review["emojis"]) => void; // Function to handle emoji reactions
}) => {
  // State to store fetched emoji URLs
  const [emojiUrl, setEmojiUrl] = useState<{ [emoji: string]: string }>({});

  // Fetch emojis
  useEffect(() => {
    const fetchEmojis = async () => {
      const emojis = await FetchGitHubEmojis();
      setEmojiUrl(emojis);
    };
    fetchEmojis();
  }, []);

  return (
    <ListGroup>
      {reviews.map((review, index) => (
        <ListGroup.Item
          key={index}
          style={{ backgroundColor: "#16485C", color: "#FFFFFF" }}
        >
          <h5>{review.title}</h5>
          <p>{review.content}</p>
          <div>
            {Object.entries(review.emojis).map(([emoji, count]) => (
              <Button
                key={emoji}
                variant="outline-light"
                size="sm"
                className="m-1"
                onClick={() => onReact(index, emoji as keyof Review["emojis"])}
              >
                {emoji} {count}
              </Button>
            ))}
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};
