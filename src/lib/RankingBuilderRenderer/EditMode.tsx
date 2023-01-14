import { useState } from "react";

interface IEditModeProps {
  name: string;
  onNameChange: (name: string) => void;
}

export function EditMode({ name: initialName, onNameChange }: IEditModeProps) {
  const [name, setName] = useState(initialName);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        name && onNameChange(name);
      }}
    >
      <input
        autoFocus
        required
        type="text"
        value={name}
        onChange={({ target: { value } }) => setName(value)}
        maxLength={30}
      />
    </form>
  );
}
