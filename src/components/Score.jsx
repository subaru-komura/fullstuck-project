import { useState, useEffect } from "react";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

// Scoreコンポーネント
export default function Score({ winTime }) {
  const [timingsheet, setTimingSheet] = useState([]);

  useEffect(() => {
    const fetchTimingSheet = async () => {
      try {
        const res = await fetch(`${baseUrl}/timingsheet`);
        if (!res.ok) {
          throw new Error(`Failed to fetch timingsheet: ${res.status}`);
        }
        const data = await res.json();
        setTimingSheet(data);
        console.log("Fetched timingsheet data:", data);
      } catch (err) {
        console.error("Error fetching timingsheet:", err);
      }
    };

    fetchTimingSheet(); // 初回レンダリング時にAPIをコール
  }, [winTime]);

  return (
    <div>
      <h3>ScoreBoard {winTime && `${winTime}`}</h3>
      <ul>
        {timingsheet.map((entry, index) => (
          <li key={entry.id}>
            {index + 1 + "位 "}
            {entry.player}: {entry.time.seconds} seconds{" "}
          </li>
        ))}
      </ul>
    </div>
  );
}
