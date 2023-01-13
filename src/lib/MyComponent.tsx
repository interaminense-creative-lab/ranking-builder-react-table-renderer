interface IMyComponentProps {
  name: string;
}

export const MyComponent: React.FC<IMyComponentProps> = ({ name }) => (
  <div>Hello, {name}!</div>
);
