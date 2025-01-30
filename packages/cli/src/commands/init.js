import { CreateTableCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'

/**
 * Initialize the DynamoDB tables.
 *
 * @param {boolean} production - True if the production environment is being used.
 *
 * @returns {Promise<void>} a Promise that resolves when all tables have been created.
 */
export async function init(production) {
  let client
  if (!production) {
    client = new DynamoDBClient({ endpoint: 'http://localhost:8000' })
  } else {
    client = new DynamoDBClient()
  }

  await createTables(client)
}

/**
 * Create the DynamoDB tables.
 *
 * @param {DynamoDBClient} client - The DynamoDB client to use.
 *
 * @returns {Promise<void>} a Promise that resolves when all tables have been created.
 */
async function createTables(client) {
  const createAccountsTableCommand = new CreateTableCommand({
    TableName: 'sc-accounts',
    AttributeDefinitions: [
      {
        AttributeName: 'account_id',
        AttributeType: 'S',
      },
      {
        AttributeName: 'identity_id',
        AttributeType: 'S',
      },
      {
        AttributeName: 'account_type',
        AttributeType: 'S',
      },
    ],
    KeySchema: [
      {
        AttributeName: 'account_id',
        KeyType: 'HASH',
      },
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: 'identity_id',
        KeySchema: [{ AttributeName: 'identity_id', KeyType: 'HASH' }],
        Projection: {
          ProjectionType: 'ALL',
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
      },
      {
        IndexName: 'account_type',
        KeySchema: [{ AttributeName: 'account_type', KeyType: 'HASH' }],
        Projection: {
          ProjectionType: 'ALL',
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  })

  const createRepositoriesTableCommand = new CreateTableCommand({
    TableName: 'sc-repositories',
    AttributeDefinitions: [
      {
        AttributeName: 'account_id',
        AttributeType: 'S',
      },
      {
        AttributeName: 'repository_id',
        AttributeType: 'S',
      },
      {
        AttributeName: 'featured',
        AttributeType: 'N',
      },
    ],
    KeySchema: [
      {
        AttributeName: 'account_id',
        KeyType: 'HASH',
      },
      {
        AttributeName: 'repository_id',
        KeyType: 'RANGE',
      },
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: 'featured',
        KeySchema: [{ AttributeName: 'featured', KeyType: 'HASH' }],
        Projection: {
          ProjectionType: 'ALL',
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  })

  const createApiKeysTableCommand = new CreateTableCommand({
    TableName: 'sc-api-keys',
    AttributeDefinitions: [
      {
        AttributeName: 'account_id',
        AttributeType: 'S',
      },
      {
        AttributeName: 'access_key_id',
        AttributeType: 'S',
      },
    ],
    KeySchema: [
      {
        AttributeName: 'access_key_id',
        KeyType: 'HASH',
      },
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: 'account_id',
        KeySchema: [{ AttributeName: 'account_id', KeyType: 'HASH' }],
        Projection: {
          ProjectionType: 'ALL',
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  })

  const createMembershipsTableCommand = new CreateTableCommand({
    TableName: 'sc-memberships',
    AttributeDefinitions: [
      {
        AttributeName: 'membership_id',
        AttributeType: 'S',
      },
      {
        AttributeName: 'account_id',
        AttributeType: 'S',
      },
      {
        AttributeName: 'membership_account_id',
        AttributeType: 'S',
      },
      {
        AttributeName: 'repository_id',
        AttributeType: 'S',
      },
    ],
    KeySchema: [
      {
        AttributeName: 'membership_id',
        KeyType: 'HASH',
      },
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: 'membership_account_id_repository_id',
        KeySchema: [
          { AttributeName: 'membership_account_id', KeyType: 'HASH' },
          { AttributeName: 'repository_id', KeyType: 'RANGE' },
        ],
        Projection: {
          ProjectionType: 'ALL',
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
      },
      {
        IndexName: 'membership_account_id',
        KeySchema: [
          { AttributeName: 'membership_account_id', KeyType: 'HASH' },
        ],
        Projection: {
          ProjectionType: 'ALL',
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
      },
      {
        IndexName: 'account_id',
        KeySchema: [{ AttributeName: 'account_id', KeyType: 'HASH' }],
        Projection: {
          ProjectionType: 'ALL',
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  })

  const createDataConnectionsTableCommand = new CreateTableCommand({
    TableName: 'sc-data-connections',
    AttributeDefinitions: [
      {
        AttributeName: 'data_connection_id',
        AttributeType: 'S',
      },
    ],
    KeySchema: [
      {
        AttributeName: 'data_connection_id',
        KeyType: 'HASH',
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  })

  try {
    await client.send(createAccountsTableCommand)
  } catch (_) {
    console.warn('Error creating accounts table')
  }

  try {
    await client.send(createRepositoriesTableCommand)
  } catch (_) {
    console.warn('Error creating repositories table')
  }

  try {
    await client.send(createApiKeysTableCommand)
  } catch (_) {
    console.warn('Error creating api keys table')
  }

  try {
    await client.send(createMembershipsTableCommand)
  } catch (_) {
    console.warn('Error creating memberships table')
  }

  try {
    await client.send(createDataConnectionsTableCommand)
    const localDataConnection = {
      data_connection_id: 'local',
      name: 'Local S3 Endpoint',
      prefix_template:
        '{{repository.account_id}}/{{repository.repository_id}}/',
      read_only: false,
      allowed_data_modes: ['open'], // RepositoryDataMode.Open, see source.coop types
      details: {
        provider: 's3', // DataProvider.S3
        bucket: 'source-cooperative',
        base_prefix: '',
        region: 'us-west-2', // S3Regions.US_WEST_2
      },
      authentication: {
        type: 's3_local', // DataConnectionAuthenticationType.S3Local
      },
    }

    const docClient = DynamoDBDocumentClient.from(client)
    const params = {
      TableName: 'sc-data-connections',
      Item: localDataConnection,
    }

    const command = new PutCommand(params)
    await docClient.send(command)
  } catch (_) {
    console.warn('Error creating data connections table')
  }
}
