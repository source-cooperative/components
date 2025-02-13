import {
  Repository,
  RepositoryList,
  RepositoryListResponse,
} from '@/api/types'
import useSWR, { SWRResponse } from 'swr'

export function listFeaturedRepositories(
  refreshInterval = 5,
  revalidateOnFocus = false,
): SWRResponse<RepositoryListResponse, Error> {
  return useSWR<RepositoryListResponse, Error>(
    { path: '/api/v1/repositories/featured' },
    { refreshInterval, revalidateOnFocus },
  )
}

export function listRepositories(
  page = 1,
  limit = 10,
  search_term?: string,
  tags?: string[],
  refreshInterval = 5,
  revalidateOnFocus = false,
): SWRResponse<RepositoryListResponse, Error> {
  return useSWR<RepositoryListResponse, Error>(
    {
      path: '/api/v1/repositories/',
      args: { next: page, limit, tags, q: search_term },
    },
    { refreshInterval, revalidateOnFocus },
  )
}

export function listRepositoriesByAccount(
  account_id: string,
  page = 1,
  limit = 10,
  search_term?: string,
  tags?: string[],
  refreshInterval = 5,
  revalidateOnFocus = false,
): SWRResponse<RepositoryList, Error> {
  return useSWR<RepositoryList, Error>(
    {
      path: `/api/v1/repositories/${account_id}`,
      args: { next: page, limit, tags, q: search_term },
    },
    { refreshInterval, revalidateOnFocus },
  )
}

export function getRepository(
  account_id: string,
  repository_id: string,
  refreshInterval = 5,
  revalidateOnFocus = false,
): SWRResponse<Repository, Error> {
  return useSWR<Repository, Error>(
    {
      path: `/api/v1/repositories/${account_id}/${repository_id}`,
    },
    { refreshInterval, revalidateOnFocus },
  )
}
