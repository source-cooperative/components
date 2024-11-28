import { Html, Head, Main, NextScript } from "next/document";
import { Toaster } from "react-hot-toast";
import { Box } from "theme-ui";

export default function Document() {
	return (
		<Html lang="en">
			<Head></Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
