import { useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Box, Grid } from "theme-ui";

import { Layout } from "@/components/Layout";
import { AccountObject } from "@/components/account/AccountObject";
import { AccountSideNavLinks } from "@/components/AccountSideNav";
import { AccountProfileResponse } from "@/api/types";
import { ClientError } from "@/lib/client/accounts";
import { NewRepositoryForm } from "@/components/repository/NewRepositoryForm";
import { useEffect } from "react";

export default function TenantDetails() {
  const router = useRouter();
  const { account_id } = router.query;
  const [accountId, setAccountId] = useState<string>(account_id as string);

  useEffect(() => {
    setAccountId(account_id as string);
  }, [account_id]);

  const sideNavLinks = AccountSideNavLinks({
    account_id: accountId,
  });

  const { error: profileError } = useSWR<AccountProfileResponse, ClientError>(
    account_id ? { path: `/api/v1/accounts/${account_id}/profile` } : null,
    {
      refreshInterval: 0,
    }
  );

  return (
    <>
      <Layout
        notFound={
          profileError &&
          (profileError.status === 404 || profileError.status === 401)
        }
        sideNavLinks={sideNavLinks}
      >
        <Grid
          sx={{
            gap: 4,
            gridTemplateColumns: [
              "1fr",
              "1fr 1fr",
              "1fr 1fr 1fr",
              "1fr 1fr 1fr 1fr",
            ],
          }}
        >
          <Box sx={{ gridColumn: "1 / -1" }}>
            <AccountObject account_id={accountId} />
          </Box>
          <Box sx={{ gridColumn: "1 / -1" }}>
            <NewRepositoryForm account_id={accountId} />
          </Box>
        </Grid>
      </Layout>
    </>
  );
}
