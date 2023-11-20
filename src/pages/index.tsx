import { Heading, Box } from "theme-ui";
import { Layout } from "../components/Layout";
import Link from "../components/Link";
import { sideNavLinks } from "../utils/constants";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
      <Layout sideNavLinks={sideNavLinks} topMenu={<Box sx={{width: "100%"}}><SearchBar /></Box>}>
        <Heading as="h1">Components</Heading>
        <ul>
          <li>
            <Link href="/button" >Button</Link>
          </li>
          <li>
            <Link href="/browser">Browser</Link>
          </li>
        </ul>
      </Layout>
  )
}
