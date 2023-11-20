import { Layout } from "../../components/Layout";
import { Box, Text } from "theme-ui";
import { sideNavLinks } from "../../utils/constants";
import Markdown from "../../components/Markdown";
import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";

export default function MarkdownPage() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    fetch("https://data.source.coop/vizzuality/lg-land-carbon-data/README.md").then((result) => {
      result.text().then((text) => {
        setContent(text);
      })
    })
  })
  return (
    <>
      <Layout sideNavLinks={sideNavLinks} topMenu={<SearchBar />}>
        <Box>
        <Markdown content={content} />
        </Box>
      </Layout>
    </>
  );
}