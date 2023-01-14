import { RankingBuilder } from "ranking-builder";
import { RankingBuilderRenderer } from "./lib/RankingBuilderRenderer";

import "./App.css";

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGIN_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const getRndInteger = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

function App() {
  const rankingBuilder = new RankingBuilder({ path: "/users" }, config);
  const timestamp = new Date().getTime();

  // @ts-ignore
  window.rankingBuilder = rankingBuilder;

  return (
    <div className="App">
      <button
        onClick={() => {
          rankingBuilder.createUser({
            name: `user-${timestamp}`,
            score: getRndInteger(0, 1000),
            time: getRndInteger(0, 100),
            flipCount: getRndInteger(0, 20),
          });
        }}
      >
        add user
      </button>

      <RankingBuilderRenderer
        className="my-ranking-table-demo"
        customCells={[
          { header: "Flips", value: "flipCount" },
          { header: "id", value: "id" },
        ]}
        rankingBuilder={rankingBuilder}
        title="Ranking Builder"
        description="List of top 20 users with EASY level"
        topResults={20}
      />
    </div>
  );
}

export default App;
