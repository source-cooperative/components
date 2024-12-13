import { Box, Grid, Input } from "theme-ui";
import Button from "./Button";

interface SearchBarProps {
	placeholder?: string;
	defaultValue?: string;
	buttonText?: string;
	handleSubmit?: (val: string) => void;
}

const defaultProps = {
	placeholder: "Search",
	defaultValue: null,
	buttonText: "Browse",
	handleSubmit: null,
};

export default function SearchBar(props: SearchBarProps) {
	const { placeholder, defaultValue, buttonText, handleSubmit } = props;

	const handler = (e) => {
		e.stopPropagation();
		e.preventDefault();

		const form = e.currentTarget.parentElement.parentElement;
		let body;

		if (form && form instanceof HTMLFormElement) {
			const formData = new FormData(form);

			// map the entire form data to JSON for the request body
			body = Object.fromEntries(formData);
			const method = e.currentTarget;
			body = {
				...body,
				...{ [method.name]: method.value },
			};

			if (handleSubmit) {
				handleSubmit(body.query);
			}
		}
	};

	return (
		<Box as="form" onSubmit={handler} sx={{ width: "100%" }}>
			<Grid sx={{ gridGap: 3, gridTemplateColumns: "auto max-content" }}>
				<Input
					placeholder={placeholder}
					name="query"
					defaultValue={defaultValue}
				/>
				<Button variant="nav" onClick={handler}>
					{buttonText}
				</Button>
			</Grid>
		</Box>
	);
}

SearchBar.defaultProps = defaultProps;
