const SectionHeading = ({
  title,
  description,
  as: Tag = "h2",
}: {
  title: string;
  description?: string;
  as?: "h1" | "h2";
}) => (
  <div className="mb-12">
    <Tag className="h2 mb-3">
      <span className="text-accent">$ </span>
      {title}
    </Tag>
    {description && (
      <p className="text-theme-fg/70 max-w-xl">{description}</p>
    )}
  </div>
);

export default SectionHeading;
