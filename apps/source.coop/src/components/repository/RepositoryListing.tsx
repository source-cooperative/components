import { Repository, RepositoryDataMode, RepositoryState } from '@/api/types'
import RepositoryTag from '@/components/repository/RepositoryTag'
import { Link } from '@source-cooperative/components'
import moment from 'moment'
import { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Card, Flex, Heading, Paragraph, Text } from 'theme-ui'

export function RepositoryListing({
  repository,
  truncate,
}: {
  repository: Repository;
  truncate: boolean;
}) {
  const [expanded, setExpanded] = useState(false)

  let description,
    title,
    details,
    tags = null
  let unlisted,
    priv,
    disabled,
    featured = false

  if (repository) {
    const showExpandOption =
      truncate && repository.meta.description.length > 300
    title =
      <Link
        sx={{ display: 'inline' }}
        href={
          '/repositories/' +
          repository.account_id +
          '/' +
          repository.repository_id +
          '/description'
        }
      >
        {repository.meta.title}
      </Link>

    details =
      <>
        Provided By{' '}
        <Link href={'/' + repository.account_id}>
          {'@' + repository.account_id}
        </Link>{' '}
        • Published on {moment(repository.published).format('MMMM DD, YYYY')}
      </>

    tags = repository.meta.tags.map((tag, i) => {
      return tag.length > 0 ?
        <RepositoryTag key={'tag-' + i} tag={tag} />
        :
        <></>

    })
    unlisted = repository.state === RepositoryState.Unlisted
    priv = repository.data_mode === RepositoryDataMode.Private
    disabled = repository.disabled
    featured = repository.featured == 1

    if (!showExpandOption) {
      description = repository.meta.description
    } else {
      if (expanded) {
        description =
          <>
            {repository.meta.description}{' '}
            <Link
              variant="link"
              onClick={(e) => { setExpanded(false) }}
              sx={{ ml: 1, fontSize: 0 }}
            >
              [View Less]
            </Link>
          </>

      } else {
        description =
          <>
            {repository.meta.description.substring(0, 300)}...{' '}
            <Link
              variant="link"
              onClick={(e) => { setExpanded(true) }}
              sx={{ ml: 1, fontSize: 0 }}
            >
              [View More]
            </Link>
          </>

      }
    }
  }

  return (
    <Card
      key={
        repository
          ? repository.account_id + '/' + repository.repository_id
          : null
      }
      variant="listing"
    >
      <Heading variant="title">
        {title || <Skeleton />}
        {featured ? <RepositoryTag tag={'Featured'} /> : <></>}
        {unlisted ? <RepositoryTag tag={'Unlisted'} /> : <></>}
        {priv ? <RepositoryTag tag={'Private'} /> : <></>}
        {disabled ? <RepositoryTag tag={'Disabled'} /> : <></>}
      </Heading>
      <Paragraph variant="description">
        {description != null ?
          repository.meta.description.length > 0 ?
            description
            :
            'No Description Provided'

          :
          <Skeleton count={2} />
        }
      </Paragraph>
      <Text variant="detail">{details || <Skeleton />}</Text>
      <Flex sx={{ flexWrap: 'wrap', gap: 2, mt: 1, alignItems: 'center' }}>
        {tags != null ? tags : <Skeleton />}
      </Flex>
    </Card>
  )
}
