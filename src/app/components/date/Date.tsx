export default function DateComponent({ className }: { className?: string }) {
  const formatter = new Intl.DateTimeFormat("es", {
    dateStyle: "full",
  });

  const date = formatter.format(new Date());
  const capitalizedDate = date.charAt(0).toUpperCase() + date.slice(1);

  return <p className={className}>{capitalizedDate}</p>;
}
