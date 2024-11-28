import Layout from "../../components/BaseLayout";
import { sideNavLinks } from "../../utils/constants";
import Button from "../../components/Button";

export default function ButtonPage() {
	return (
		<>
			<Layout sideNavLinks={sideNavLinks}>
				<Button>Hello World</Button>
			</Layout>
		</>
	);
}
