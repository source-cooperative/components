/**
 * @fileoverview Type definitions and schemas for the Source Cooperative API.
 *
 * This module defines the core data structures, enums, and Zod schemas used throughout
 * the Source Cooperative application. It includes definitions for:
 * - Repositories and their associated data
 * - User and organization accounts
 * - Memberships and roles
 * - API keys
 * - User sessions
 * - Action types for authorization
 *
 * The module uses Zod for runtime type checking and validation of these structures.
 *
 * @module api/types
 * @requires zod
 *
 * @example
 * import { Repository, Account, Membership, Actions } from '@/api/types';
 *
 * // Use the types in your code
 * const repo: Repository = {
 *   account_id: 'user123',
 *   repository_id: 'repo456',
 *   // ... other properties
 * };
 *
 * // Use the schemas for validation
 * const validRepo = RepositorySchema.parse(someData);
 */

import { z } from "zod";

export const ID_REGEX = /^(?=.{3,40}$)[a-z0-9](?:(?!--)[a-z0-9-])*[a-z0-9]$/;

export enum DataProvider {
  S3 = "s3",
  Azure = "az",
  GCP = "gcp",
}

export enum S3Regions {
  AF_SOUTH_1 = "af-south-1",
  AP_EAST_1 = "ap-east-1",
  AP_NORTHEAST_1 = "ap-northeast-1",
  AP_NORTHEAST_2 = "ap-northeast-2",
  AP_NORTHEAST_3 = "ap-northeast-3",
  AP_SOUTH_1 = "ap-south-1",
  AP_SOUTH_2 = "ap-south-2",
  AP_SOUTHEAST_1 = "ap-southeast-1",
  AP_SOUTHEAST_2 = "ap-southeast-2",
  AP_SOUTHEAST_3 = "ap-southeast-3",
  AP_SOUTHEAST_4 = "ap-southeast-4",
  AP_SOUTHEAST_5 = "ap-southeast-5",
  CA_CENTRAL_1 = "ca-central-1",
  CA_WEST_1 = "ca-west-1",
  CN_NORTH_1 = "cn-north-1",
  CN_NORTHWEST_1 = "cn-northwest-1",
  EU_CENTRAL_1 = "eu-central-1",
  EU_CENTRAL_2 = "eu-central-2",
  EU_NORTH_1 = "eu-north-1",
  EU_SOUTH_1 = "eu-south-1",
  EU_SOUTH_2 = "eu-south-2",
  EU_WEST_1 = "eu-west-1",
  EU_WEST_2 = "eu-west-2",
  EU_WEST_3 = "eu-west-3",
  IL_CENTRAL_1 = "il-central-1",
  ME_CENTRAL_1 = "me-central-1",
  ME_SOUTH_1 = "me-south-1",
  SA_EAST_1 = "sa-east-1",
  US_EAST_1 = "us-east-1",
  US_EAST_2 = "us-east-2",
  US_GOV_EAST_1 = "us-gov-east-1",
  US_GOV_WEST_1 = "us-gov-west-1",
  US_WEST_1 = "us-west-1",
  US_WEST_2 = "us-west-2",
}

export enum AzureRegions {
  WEST_EUROPE = "westeurope",
}

export const RepositoryMirrorSchema = z.object({
  data_connection_id: z.string(),
  prefix: z.string(),
});

export type RepositoryMirror = z.infer<typeof RepositoryMetaSchema>;

export const RepositoryDataSchema = z.object({
  primary_mirror: z.string({
    required_error: "Primary mirror is required",
    invalid_type_error: "Primary mirror must be a string",
  }),
  mirrors: z.record(RepositoryMirrorSchema),
});

export const RepositoryMetaSchema = z.object({
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title must be a string",
  }),
  description: z.string({
    required_error: "Description is required",
    invalid_type_error: "Description must be a string",
  }),
  tags: z.array(
    z.string({
      required_error: "Tag is required",
      invalid_type_error: "Tag must be a string",
    })
  ),
});

export type RepositoryMeta = z.infer<typeof RepositoryMetaSchema>;

export type RepositoryListResponse = {
  repositories: Repository[];
  next?: string;
  count: Number;
};

export enum RepositoryState {
  Listed = "listed",
  Unlisted = "unlisted",
}

export const RepositoryStateSchema = z.nativeEnum(RepositoryState, {
  errorMap: () => ({ message: "Invalid repository mode" }),
});

export enum RepositoryDataMode {
  Open = "open",
  Subscription = "subscription",
  Private = "private",
}

export const RepositoryDataModeSchema = z.nativeEnum(RepositoryDataMode, {
  errorMap: () => ({ message: "Invalid repository data mode" }),
});

export enum RepositoryFeatured {
  Featured = 1,
  NotFeatured = 0,
}

export const RepositorySchema = z.object({
  account_id: z.string().regex(ID_REGEX, "Invalid account ID format"),
  repository_id: z.string().regex(ID_REGEX, "Invalid repository ID format"),
  state: RepositoryStateSchema,
  data_mode: RepositoryDataModeSchema,
  featured: z.nativeEnum(RepositoryFeatured, {
    errorMap: () => ({ message: "Invalid featured value" }),
  }),
  meta: RepositoryMetaSchema,
  data: RepositoryDataSchema,
  published: z.string().datetime({ offset: true }),
  disabled: z.boolean(),
});

export enum S3AuthenticationType {
  AccessKey = "access_key",
  IAMRole = "iam_role",
}

export enum AzureAuthenticationType {
  SasToken = "sas_token",
}

export const S3AccessKeyAuthenticationSchema = z.object({
  type: z.literal(S3AuthenticationType.AccessKey),
  access_key_id: z.string(),
  secret_access_key: z.string(),
});

export const S3AuthenticationSchema = z.discriminatedUnion("type", [
  S3AccessKeyAuthenticationSchema,
]);

export const AzureSasTokenAuthenticationSchema = z.object({
  type: z.literal(AzureAuthenticationType.SasToken),
  sas_token: z.string(),
});

export const AzureAuthenticationSchema = z.discriminatedUnion("type", [
  AzureSasTokenAuthenticationSchema,
]);

export type S3Authentication = z.infer<typeof S3AuthenticationSchema>;
export type AzureAuthentication = z.infer<typeof AzureAuthenticationSchema>;

export const S3DataConnectionSchema = z.object({
  provider: z.literal(DataProvider.S3),
  bucket: z.string(),
  base_prefix: z.string(),
  region: z.nativeEnum(S3Regions),
  authentication: z.optional(S3AuthenticationSchema),
});

export const AzureDataConnectionSchema = z.object({
  provider: z.literal(DataProvider.Azure),
  account_name: z.string(),
  container_name: z.string(),
  base_prefix: z.string(),
  region: z.nativeEnum(AzureRegions),
  authentication: z.optional(AzureAuthenticationSchema),
});

export type S3DataConnection = z.infer<typeof S3DataConnectionSchema>;
export type AzureDataConnection = z.infer<typeof AzureDataConnectionSchema>;

export const DataConnnectionDetailsSchema = z.discriminatedUnion("provider", [
  S3DataConnectionSchema,
  AzureDataConnectionSchema,
]);

export type DataConnectionDetails = z.infer<
  typeof DataConnnectionDetailsSchema
>;

export const DataConnectionSchema = z.object({
  data_connection_id: z
    .string()
    .regex(ID_REGEX, "Invalid data connection ID format"),
  name: z.string(),
  prefix_template: z.optional(z.string()),
  read_only: z.boolean(),
  details: DataConnnectionDetailsSchema,
});

export type DataConnection = z.infer<typeof DataConnectionSchema>;

export type Repository = z.infer<typeof RepositorySchema>;

export enum AccountType {
  USER = "user",
  ORGANIZATION = "organization",
  SERVICE = "service",
}

export const AccountTypeSchema = z.nativeEnum(AccountType, {
  errorMap: () => ({ message: "Invalid account type" }),
});

export enum AccountFlags {
  ADMIN = "admin",
  CREATE_REPOSITORIES = "create_repositories",
  CREATE_ORGANIZATIONS = "create_organizations",
}

export const AccountFlagsSchema = z.array(
  z.nativeEnum(AccountFlags, {
    errorMap: () => ({ message: "Invalid account flag" }),
  })
);

export const AccountProfileSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(1, "Name must not be empty")
    .max(100, "Name must not exceed 50 characters"),
  bio: z.optional(z.string()),
  location: z.optional(z.string()),
  url: z.optional(z.string().url("Invalid URL format")),
});

export type AccountProfile = z.infer<typeof AccountProfileSchema>;

export type AccountProfileResponse = {
  name?: string;
  bio?: string;
  location?: string;
  url?: string;
  profile_image: string;
};

export const AccountSchema = z.object({
  account_id: z.string().regex(ID_REGEX, "Invalid account ID format"),
  account_type: AccountTypeSchema,
  identity_id: z.optional(z.string()),
  email: z.optional(z.string().email("Invalid email format")),
  disabled: z.boolean(),
  profile: AccountProfileSchema,
  flags: AccountFlagsSchema,
});

export type Account = z.infer<typeof AccountSchema>;

export type ErrorResponse = {
  code: number;
  message: string | object;
  errors?: any;
};

export enum MembershipRole {
  Owners = "owners",
  Maintainers = "maintainers",
  ReadData = "read_data",
  WriteData = "write_data",
}

export const MembershipRoleSchema = z.nativeEnum(MembershipRole, {
  errorMap: () => ({ message: "Invalid membership role" }),
});

export enum MembershipState {
  Invited = "invited",
  Revoked = "revoked",
  Member = "member",
}

export const MembershipStateSchema = z.nativeEnum(MembershipState, {
  errorMap: () => ({ message: "Invalid membership state" }),
});

export const MembershipSchema = z.object({
  account_id: z.string().regex(ID_REGEX, "Invalid account ID format"),
  membership_account_id: z
    .string()
    .regex(ID_REGEX, "Invalid membership account ID format"),
  repository_id: z.optional(
    z.string().regex(ID_REGEX, "Invalid repository ID format")
  ),
  role: MembershipRoleSchema,
  state: MembershipStateSchema,
  state_changed: z.string().datetime("Invalid date format for state changed"),
});

export type Membership = z.infer<typeof MembershipSchema>;

export const APIKeySchema = z.object({
  access_key_id: z.string({
    required_error: "Access key ID is required",
    invalid_type_error: "Access key ID must be a string",
  }),
  account_id: z.string().regex(ID_REGEX, "Invalid account ID format"),
  repository_id: z.optional(z.string().regex(ID_REGEX, "Invalid account ID format")),
  disabled: z.boolean(),
  expires: z.string().datetime("Invalid expiration date format"),
  name: z.string({
    required_error: "API key name is required",
    invalid_type_error: "API key name must be a string",
  }), // TODO: Add regex for name
  secret_access_key: z.string({
    required_error: "Secret access key is required",
    invalid_type_error: "Secret access key must be a string",
  }),
});

export type APIKey = z.infer<typeof APIKeySchema>;

export const APIKeyRequestSchema = z.object({
  name: z.string({
    required_error: "API key name is required",
    invalid_type_error: "API key name must be a string",
  }),
  expires: z.string().datetime("Invalid expiration date format"),
});

export type APIKeyRequest = z.infer<typeof APIKeyRequestSchema>;

export const UserSessionSchema = z.object({
  identity_id: z.optional(z.string()),
  account: z.optional(AccountSchema),
  memberships: z.optional(z.array(MembershipSchema)),
});

export type UserSession = z.infer<typeof UserSessionSchema>;

export enum Actions {
  CreateRepository = "repository:create",
  PutRepository = "repository:put",
  DisableRepository = "repository:disable",
  ListRepository = "repository:list",
  GetRepository = "repository:get",

  ReadRepositoryData = "repository:data:read",
  WriteRepositoryData = "repository:data:write",

  CreateAccount = "account:create",
  DisableAccount = "account:disable",
  GetAccount = "account:get",
  ListAccount = "account:list",
  ListAccountAPIKeys = "account:listAPIKeys",

  GetAccountFlags = "account:flags:get",
  PutAccountFlags = "account:flags:put",

  GetAccountProfile = "account:profile:get",
  PutAccountProfile = "account:profile:put",

  GetAPIKey = "api_key:get",
  CreateAPIKey = "api_key:create",
  RevokeAPIKey = "api_key:revoke",

  GetMembership = "membership:get",
  AcceptMembership = "membership:accept",
  RejectMembership = "membership:reject",
  RevokeMembership = "membership:revoke",
  InviteMembership = "membership:invite",
}
