import { Repository } from "@/api/types";
import { InviteMember } from "@/components/account/InviteMember";
import { MemberList } from "@/components/account/MemberList";
import { Layout } from "@/components/Layout";
import { RepositoryListing } from "@/components/repository/RepositoryListing";
import { RepositorySideNavLinks } from "@/components/RepositorySideNav";
import { ClientError } from "@/lib/client/accounts";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Box, Grid } from "theme-ui";

export default function TenantDetails() {
  const router = useRouter();

  const { account_id, repository_id } = router.query;
  const [accountId, setAccountId] = useState<string>(account_id as string);
  const [repositoryId, setRepositoryId] = useState<string>(
    repository_id as string
  );

  useEffect(() => {
    setAccountId(account_id as string);
    setRepositoryId(repository_id as string);
  }, [account_id, repository_id]);

  const {
    data: repository,
    mutate: refreshRepository,
    isLoading: repositoryIsLoading,
    error: repositoryError,
  } = useSWR<Repository, ClientError>(
    account_id && repository_id
      ? { path: `/api/v1/repositories/${account_id}/${repository_id}` }
      : null,
    {
      refreshInterval: 0,
    }
  );

  const sideNavLinks = RepositorySideNavLinks({
    account_id: accountId,
    repository_id: repositoryId,
  });

  return (
    <Layout
      notFound={
        repositoryError &&
        (repositoryError.status === 404 || repositoryError.status === 401)
      }
      sideNavLinks={sideNavLinks}
    >
      <Grid
        sx={{
          gap: 4,
          gridTemplateColumns: ["1fr", "1fr", "1fr 3fr", "1fr 5fr"],
        }}
      >
        <Box sx={{ gridColumn: "1 / -1" }}>
          <RepositoryListing repository={repository} truncate={false} />
        </Box>
        <InviteMember account_id={accountId} repository_id={repositoryId} />
        <MemberList account_id={accountId} repository_id={repositoryId} />
      </Grid>
    </Layout>
  );
}
