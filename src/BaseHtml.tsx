export const BaseHtml = ({
  children,
  solo,
}: {
  children: JSX.Element;
  solo: boolean;
}) => {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>{children}</body>
      <script src="https://unpkg.com/tiny-editor/dist/bundle.js"></script>
      {solo ? <script src="/script/solo" /> : <script src="/script" />}
    </html>
  );
};
