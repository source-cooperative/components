import { AccountProfileResponse } from "@/api/types";
import { AccountSideNavLinks } from "@/components/AccountSideNav";
import { Layout } from "@/components/Layout";
import { APIKeyForm } from "@/components/account/APIKeyForm";
import { APIKeyList } from "@/components/account/APIKeyList";
import { AccountObject } from "@/components/account/AccountObject";
import { BrowserSettings } from "@/components/account/BrowserSettings";
import { DangerBox } from "@/components/account/DangerBox";
import { EditProfileForm } from "@/components/account/EditProfileForm";
import { FlagsForm } from "@/components/account/FlagsForm";
import { Invitations } from "@/components/account/Invitations";
import { ClientError } from "@/lib/client/accounts";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Box, Grid } from "theme-ui";

export default function ManageAccount() {
  const router = useRouter();
  const { account_id } = router.query;

  const [accountId, setAccountId] = useState<string>(account_id as string);

  useEffect(() => {
    setAccountId(account_id as string);
  }, [account_id]);

  const sideNavLinks = AccountSideNavLinks({
    account_id: accountId,
  });

  const { isLoading: _profileIsLoading, error: profileError } = useSWR<
    AccountProfileResponse,
    ClientError
  >(account_id ? { path: `/api/v1/accounts/${account_id}/profile` } : null, {
    refreshInterval: 0,
  });

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
          <Invitations account_id={accountId} />
          <Box sx={{ gridColumn: "1 / -1" }}>
            <EditProfileForm account_id={accountId} />
          </Box>

          <Box sx={{ gridColumn: "1" }}>
            <APIKeyForm account_id={accountId} />
          </Box>
          <Box
            sx={{
              gridColumn: ["span 1", "span 2", "span 2", "span 3"],
              gridRow: "span 5",
            }}
          >
            <APIKeyList account_id={accountId} />
          </Box>
          <BrowserSettings account_id={accountId} />
          <FlagsForm account_id={accountId} />
          <DangerBox account_id={accountId} />
        </Grid>
      </Layout>
    </>
  );
}
