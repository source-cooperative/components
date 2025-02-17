import {
  AccountFlags,
  AccountProfileResponse,
  RedactedAPIKey,
} from '@/api/types'
import useSWR, { SWRResponse } from 'swr'
import useSWRImmutable from 'swr/immutable'

export interface ClientError {
  status: number;
}

export function getProfile(
  account_id: string,
  refreshInterval = 5000,
  revalidateOnFocus = false,
): SWRResponse<AccountProfileResponse, ClientError> {
  return useSWRImmutable<AccountProfileResponse, ClientError>(
    account_id ? { path: `/api/v1/accounts/${account_id}/profile` } : null,
  )
}

export function getFlags(
  account_id: string,
  refreshInterval = 5000,
  revalidateOnFocus = false,
): SWRResponse<AccountFlags[], ClientError> {
  return useSWR<AccountFlags[], ClientError>(
    account_id ? { path: `/api/v1/accounts/${account_id}/flags` } : null,
    { refreshInterval, revalidateOnFocus },
  )
}

export function getAPIKeys(
  account_id: string,
  refreshInterval = 5000,
  revalidateOnFocus = false,
): SWRResponse<RedactedAPIKey[], ClientError> {
  return useSWR<RedactedAPIKey[], ClientError>(
    account_id ? { path: `/api/v1/accounts/${account_id}/api-keys` } : null,
    { refreshInterval, revalidateOnFocus },
  )
}
