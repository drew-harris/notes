export const BaseHtml = ({ children }: { children: JSX.Element }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://unpkg.com/tiny-editor/dist/bundle.js"></script>
      </head>
      <body hx-ext="preload">{children}</body>
      <script src="https://unpkg.com/tiny-editor/dist/bundle.js"></script>
      <script src="/script" />
    </html>
  );
};
