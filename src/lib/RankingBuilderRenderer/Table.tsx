import { RankingBuilder } from "ranking-builder";
import { Icon } from "../Icon";
import { EditMode } from "./EditMode";
import { convertToTimeFormat, getDate, getPosition } from "./utils";
import { Data, SortBy, User } from "ranking-builder/dist/types";
import { useState } from "react";

import ArrowDownSVG from "../../assets/arrow-down.svg";
import ArrowUpSVG from "../../assets/arrow-up.svg";

interface ITableProps {
  customCells?: {
    header: string;
    value: number | string;
  }[];
  data: Data;
  onSort: (sortBy: SortBy) => void;
  rankingBuilder: RankingBuilder;
  sortBy: SortBy;
}

type Columns = ({ user, index }: { user: User | null; index: number }) => {
  label: string;
  sortable: boolean;
  value: number | string;
  content: any;
}[];

export function Table({
  customCells = [],
  data,
  onSort,
  rankingBuilder,
  sortBy,
}: ITableProps) {
  const [editMode, setEditMode] = useState<{ id: string } | null>(null);

  const columns: Columns = ({ user, index }) => [
    {
      label: "Rank",
      sortable: false,
      value: "rank",
      content: getPosition(index + 1),
    },
    {
      label: "Name",
      sortable: false,
      value: "name",
      content:
        editMode && editMode.id === user?.id ? (
          <EditMode
            name={user.name as string}
            onNameChange={async (name) => {
              await rankingBuilder.updateUser(user.id as string, {
                ...user,
                name,
              });

              setEditMode(null);
            }}
          />
        ) : (
          user?.name
        ),
    },
    {
      label: "Score",
      sortable: true,
      value: "score",
      content: user?.score,
    },
    {
      label: "Time",
      sortable: true,
      value: "time",
      content: convertToTimeFormat(user?.time as number),
    },
    ...customCells.map(({ header, value }) => ({
      label: header,
      sortable: true,
      value,
      content: user?.[value],
    })),
    {
      label: "Create Date",
      sortable: true,
      value: "createDate",
      content: getDate(user?.createDate as number),
    },
  ];

  return (
    <table cellPadding={0} cellSpacing={0} className="rbr__table">
      <thead>
        <tr>
          {columns({ user: null, index: 0 }).map(
            ({ label, sortable, value }) => {
              if (sortBy.value !== "score" && value === "rank") return null;

              return (
                <th
                  key={value}
                  onClick={
                    sortable
                      ? () =>
                          onSort({
                            value: value as string,
                            type: sortBy.type === "DESC" ? "ASC" : "DESC",
                          })
                      : () => {}
                  }
                >
                  <span>{label}</span>
                  {sortable &&
                    sortBy.value === value &&
                    (sortBy.type === "DESC" ? (
                      <Icon svg={ArrowDownSVG} />
                    ) : (
                      <Icon svg={ArrowUpSVG} />
                    ))}
                </th>
              );
            }
          )}

          {!rankingBuilder.isAnonymous && (
            <>
              <th key="EDIT"></th>
              <th key="DELETE"></th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {data?.users.map((user, index) => (
          <tr key={user.id}>
            {columns({ user, index }).map(({ value, content }) => {
              if (sortBy.value !== "score" && value === "rank") return null;

              return (
                <td key={value} id={value as string}>
                  <span>{content || "-"}</span>
                </td>
              );
            })}

            {!rankingBuilder.isAnonymous && (
              <>
                <td key="EDIT">
                  <button
                    onClick={() =>
                      setEditMode({ id: user.id } as { id: string })
                    }
                  >
                    edit
                  </button>
                </td>
                <td key="DELETE">
                  <button
                    onClick={() => {
                      rankingBuilder.deleteUser(user.id as string);
                    }}
                  >
                    delete
                  </button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
