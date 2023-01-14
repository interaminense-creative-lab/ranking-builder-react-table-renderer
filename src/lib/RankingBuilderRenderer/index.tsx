import { HTMLAttributes, useEffect, useState } from "react";
import { RankingBuilder } from "ranking-builder";
import { Data, SortBy } from "ranking-builder/dist/types";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { StateRenderer } from "./StateRenderer";
import { Table } from "./Table";
import classnames from "classnames";

import "./index.css";

interface IRankingBuilderRendererProps extends HTMLAttributes<HTMLElement> {
  customCells?: {
    header: string;
    value: number | string;
  }[];
  description?: string;
  rankingBuilder: RankingBuilder;
  title?: string;
  topResults?: number;
}

const RankingBuilderRenderer = ({
  className,
  customCells,
  description,
  rankingBuilder,
  title,
  topResults,
}: IRankingBuilderRendererProps) => {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortBy>({
    value: "score",
    type: "DESC",
  });

  useEffect(() => {
    rankingBuilder.listData(
      (data: Data) => {
        setData(data);
        setLoading(false);
      },
      {
        topResults,
        sortBy,
      }
    );
  }, [rankingBuilder, sortBy, topResults]);

  return (
    <div className={classnames("rbr", className)}>
      <Header title={title} description={description} />

      <StateRenderer loading={loading} data={data}>
        {(data: Data) => (
          <Table
            onSort={setSortBy}
            customCells={customCells}
            data={data}
            rankingBuilder={rankingBuilder}
            sortBy={sortBy}
          />
        )}
      </StateRenderer>

      <Footer />
    </div>
  );
};

export { RankingBuilderRenderer };
