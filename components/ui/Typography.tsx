export function TypographyH1({ label }: { label: string }) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {label}
    </h1>
  );
}

export function TypographyP({ label }: { label: string }) {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{label}</p>;
}
