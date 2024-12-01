import { useState, useEffect } from "react";
import { FetchGitHubEmojis } from "./FetchGitHubEmojis";

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
    <div>
      {reviews.map((review, index) => (
        <div key={index}>
          {/* Render the title and content of each review */}
          <h5>{review.title}</h5>
          <p>{review.content}</p>
          <div style={{ display: "flex", gap: "10px" }}>
            {/* Render buttons for each emoji with counts */}
            {Object.entries(review.emojis).map(([emoji, count]) => (
              <button
                key={emoji}
                onClick={() => onReact(index, emoji as keyof Review["emojis"])}
              >
                <img
                  src={emojiUrl[emoji]}
                  alt={emoji}
                  style={{ width: 20, height: 20 }}
                />{" "}
                {count} {/* Show emoji and count */}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
