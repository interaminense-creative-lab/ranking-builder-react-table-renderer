# RankingBuilderRenderer

The `RankingBuilderRenderer` component is a React component that utilizes the `RankingBuilder` module from the `ranking-builder` package to display some data in a table format.

<div align="center"><img src="https://user-images.githubusercontent.com/12699849/211705923-bc2550a2-28fc-4854-b1a0-0ffe722065f2.png" alt="screenshot" /></div>

## Props

| Prop             | Type   | Description                                                                                                                        |
| ---------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `className`      | string | A string that is passed to the root `div` element to set its class name.                                                           |
| `customCells`    | array  | An array of objects representing custom cells to be added to the table. Each object should have a `header` and a `value` property. |
| `description`    | string | A string that is used to set the description of the component, usually used in the `Header` component.                             |
| `rankingBuilder` | object | The instance of the `RankingBuilder` class which is used to fetch the data.                                                        |
| `title`          | string | A string that is used to set the title of the component, usually used in the `Header` component.                                   |
| `topResults`     | number | A number that represents the maximum number of results to be fetched.                                                              |

## Data Fetching

The component uses the `useEffect` hook to fetch the data from the `rankingBuilder.listData` method when the component is first rendered and every time the `sortBy` or `topResults` props change. It keeps the state of the data fetched and a loading flag to show a spinner while loading.

## Data Display

It uses the `StateRenderer` component to conditionally render the table of data only when the data is loaded. The `Table` component is used to display the data, and it's passed several props to control its behavior, including `customCells`, `data`, `rankingBuilder`, `sortBy`, and a callback `onSort` that sets the `sortBy` state when called.

## Layout

The `Header` and `Footer` components are also rendered, providing a consistent layout and structure to the component.

In summary, this component `RankingBuilderRenderer` uses React hooks and components to efficiently handle the data fetching, display, and sorting of data using the `RankingBuilder` module, which is all wrapped in a custom React component that can easily be re-used in other parts of an application.
