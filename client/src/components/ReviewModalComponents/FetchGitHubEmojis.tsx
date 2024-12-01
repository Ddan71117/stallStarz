// Function to fetch emojis from the GitHub Emojis API
export const FetchGitHubEmojis = async (): Promise<{
  [emoji: string]: string;
}> => {
  try {
    const response = await fetch("https://api.github.com/emojis");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    // Return a subset of emojis with their URLs
    return {
      "👍": data["+1"],
      "👎": data["-1"],
      "✨": data["sparkles"],
      "💩": data["hankey"],
    };
  } catch (error) {
    console.error("Error fetching emojis:", error);
    return {};
  }
};
