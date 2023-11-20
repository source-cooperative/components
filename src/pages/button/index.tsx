import { Layout } from "../../components/Layout";
import { Heading } from "theme-ui";
import { sideNavLinks } from "../../utils/constants";
import Markdown from "../../components/Markdown";
import { useEffect, useState } from "react";
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