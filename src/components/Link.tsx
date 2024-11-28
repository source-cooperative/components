import NextLink from "next/link";
import { Link as ThemeLink } from "theme-ui";

export default function Link(props) {
	if (props.onClick) {
		return (
			<ThemeLink
				onClick={props.onClick}
				sx={{ variant: `links.${props.variant ? props.variant : "default"}` }}
			>
				{props.children}
			</ThemeLink>
		);
	}

	return (
		<NextLink
			href={props.href}
			sx={{ variant: props.variant ? `links.${props.variant}` : "links" }}
		>
			{props.children}
		</NextLink>
	);
}
