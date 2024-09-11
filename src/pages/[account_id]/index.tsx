import { Layout } from "@/components/Layout";
import { useRouter } from "next/router";
import { Heading, Divider, Grid } from "theme-ui";
import { RepositoryList } from "@/components/RepositoryList";

import { getProfile, getFlags } from "@/lib/client/accounts";
import { AccountObject } from "@/components/AccountObject";
import { listRepositoriesByAccount } from "@/lib/client/repositories";
import { SideNavLink } from "@/lib/types";
import { useUser } from "@/lib/api";
import { useEffect, useState } from "react";
import {
  AccountFlags,
  AccountType,
  MembershipRole,
  MembershipState,
} from "@/api/types";

export default function TenantDetails() {
  const router = useRouter();
  const { account_id } = router.query;

  const { data: profile, error } = getProfile(account_id as string);
  const { data: accountFlags, error: accountFlagsError } = getFlags(
    account_id as string
  );
  const { user, isLoading, isError } = useUser();

  var baseSideNavLinks: SideNavLink[] = [
    {
      href: `/${account_id}`,
      title: "Repositories",
      active: true,
    },
  ];

  const [sideNavLinks, setSideNavLinks] =
    useState<SideNavLink[]>(baseSideNavLinks);

  useEffect(() => {
    if (!account_id) {
      return;
    }

    if (!user) {
      return;
    }

    var newSideNav = [...baseSideNavLinks];
    var editPermissions = false;
    var adminPermissions = false;

    if (account_id === user?.account?.account_id) {
      newSideNav.push({
        href: `/${account_id}/sc.invitations`,
        title: "Invitations",
        active: false,
      });
    }

    if (profile?.account_type === AccountType.ORGANIZATION) {
      newSideNav.push({
        href: `/${account_id}/sc.members`,
        title: "Members",
        active: false,
      });
    }

    if (user?.account?.flags.includes(AccountFlags.ADMIN)) {
      editPermissions = true;
      adminPermissions = true;
    }

    if (user?.account?.account_id === account_id) {
      editPermissions = true;
    }

    for (const membership of user?.memberships) {
      if (
        membership.membership_account_id === account_id &&
        membership.state === MembershipState.Member &&
        (membership.role === MembershipRole.Owners ||
          membership.role === MembershipRole.Maintainers)
      ) {
        editPermissions = true;
      }
    }

    if (editPermissions) {
      newSideNav.push({
        href: `/${account_id}/sc.manage`,
        title: "Manage",
        active: false,
      });

      newSideNav.push({
        href: `/${account_id}/sc.api-keys`,
        title: "API Keys",
        active: false,
      });

      if (accountFlags?.includes(AccountFlags.CREATE_REPOSITORIES)) {
        newSideNav.push({
          href: `/${account_id}/sc.new-repository`,
          title: "New Repository",
          active: false,
        });
      }
    }

    if (adminPermissions) {
      newSideNav.push({
        href: `/${account_id}/sc.flags`,
        title: "Edit Flags",
        active: false,
      });
    }
    setSideNavLinks(newSideNav);
  }, [account_id, user, profile, accountFlags]);

  const { data: repositories, error: repositoriesError } =
    listRepositoriesByAccount(account_id as string);

  return (
    <>
      <Layout
        notFound={error && error.status === 404}
        sideNavLinks={sideNavLinks}
      >
        <AccountObject profile={profile} account_id={account_id as string} />
        <Heading sx={{ mb: 2 }} as="h1">
          Repositories
        </Heading>
        <Divider />
        <Grid
          sx={{
            gridTemplateColumns: "1fr",
            justifyContent: "stretch",
            gridGap: 4,
          }}
        >
          {repositories ? (
            repositories.repositories.length > 0 ? (
              <RepositoryList
                repositoryResult={repositories}
                isLoading={false}
                isError={false}
              />
            ) : (
              <Heading as="h2">No Repositories Found</Heading>
            )
          ) : (
            <></>
          )}
        </Grid>
      </Layout>
    </>
  );
}
