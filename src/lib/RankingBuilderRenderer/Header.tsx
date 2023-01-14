interface IHeaderProps {
  description?: string;
  title?: string;
}

export function Header({ description, title }: IHeaderProps) {
  return (
    <header className="rbr__header">
      {title && <h2 className="rbr__header-title">{title}</h2>}
      {description && <p className="rbr__header-description">{description}</p>}
    </header>
  );
}
