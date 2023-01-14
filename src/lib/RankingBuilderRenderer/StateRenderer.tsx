import { Data } from "ranking-builder/dist/types";

interface IStateRendererProps {
  data: Data | null;
  children: (data: Data) => JSX.Element;
  loading: boolean;
}

export function StateRenderer({
  children,
  data,
  loading,
}: IStateRendererProps) {
  if (loading || !data) {
    return <div>loading...</div>;
  }

  if (!data?.users.length) {
    return <div>There are no users.</div>;
  }

  return <>{children(data)}</>;
}
