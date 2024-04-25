export const BaseHtml = ({ children }: { children: JSX.Element }) => {
	return (
		<html lang="en">
			<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<script
					src="https://unpkg.com/htmx.org@1.9.12"
					integrity="sha384-ujb1lZYygJmzgSwoxRggbCHcjc0rB2XoQrxeTUQyRjrOnlCoYta87iKBWq3EsdM2"
					crossorigin="anonymous"
				></script>
				<script src="https://cdn.tailwindcss.com"></script>
				<script src="https://unpkg.com/htmx.org@1.9.12/dist/ext/preload.js"></script>
				<script src="https://unpkg.com/tiny-editor/dist/bundle.js"></script>
			</head>
			<body hx-ext="preload">{children}</body>
			<script src="https://unpkg.com/tiny-editor/dist/bundle.js"></script>
			<script src="/script" />
		</html>
	);
};
