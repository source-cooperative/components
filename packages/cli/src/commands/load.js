import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'
import * as fs from 'fs'
import * as path from 'path'

/**
 * Load an array from a JSON file at the specified path.
 *
 * @param {string} path the path to the JSON file
 *
 * @returns {Promise<unknown[]>} the parsed JSON data (it's expected to be an array, as created by the dump command)
 */
async function loadJsonArray(path) {
  const fileContent = await fs.promises.readFile(path, 'utf-8')

  // Parse the JSON
  const array = JSON.parse(fileContent)

  if (!Array.isArray(array)) {
    throw new Error(`Expected an array in ${path}`)
  }

  return array
}

/**
 * Sleep for the specified number of milliseconds.
 *
 * @param {number} ms the number of milliseconds to sleep
 *
 * @returns {Promise<void>} a Promise that resolves after the specified number of milliseconds
 */
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

/**
 * Batch insert items into a DynamoDB table.
 *
 * It expects the local aws config (environment variables).
 * TODO(SL): explicitly pass the region and credentials?
 *
 * @param {string} tableName the name of the table to insert items into
 * @param {any[]} items the items to insert
 * @param {boolean} production true if the production environment is being used
 *
 * @returns {Promise<void>} a Promise that resolves when all items have been inserted
 */
async function batchInsertIntoDynamoDB(tableName, items, production) {
  // Create a DynamoDB client
  let client
  if (!production) {
    client = new DynamoDBClient({ endpoint: 'http://localhost:8000' })
  } else {
    client = new DynamoDBClient()
  }
  const docClient = DynamoDBDocumentClient.from(client)
  for (const item of items) {
    const params = {
      TableName: tableName,
      Item: item,
    }

    try {
      const command = new PutCommand(params)
      await docClient.send(command)
      // To avoid ProvisionedThroughputExceededException, sleep for 40ms between each write
      if (production) {
        await sleep(40)
      }
    } catch (error) {
      console.error(`Error inserting item into ${tableName}:`, error)
      throw error
    }
  }

  console.log('All items inserted successfully')
}

/**
 * Load data from the specified directory into DynamoDB.
 *
 * @param {string} loadDirectory the directory containing the data to load (it's expected to be created by the dump command)
 * @param {boolean} production true if the production environment is being used
 *
 * @returns {Promise<void>} a Promise that resolves when all data has been loaded
 */
export async function load(loadDirectory, production) {
  console.log(`Loading data from ${loadDirectory}`)
  const repositories = await loadJsonArray(
    path.join(loadDirectory, 'table', 'sc-repositories.json'),
  )
  const accounts = await loadJsonArray(
    path.join(loadDirectory, 'table', 'sc-accounts.json'),
  )
  const apiKeys = await loadJsonArray(
    path.join(loadDirectory, 'table', 'sc-api-keys.json'),
  )
  const memberships = await loadJsonArray(
    path.join(loadDirectory, 'table', 'sc-memberships.json'),
  )
  const dataConnections = await loadJsonArray(
    path.join(loadDirectory, 'table', 'sc-data-connections.json'),
  )

  console.log(`Repository Count: ${repositories.length}`)
  console.log(`Account Count: ${accounts.length}`)
  console.log(`Membership Count: ${memberships.length}`)
  console.log(`API Key Count: ${apiKeys.length}`)
  console.log(`Data Connection Count: ${dataConnections.length}`)

  console.log('Inserting data into sc-accounts...')
  await batchInsertIntoDynamoDB('sc-accounts', accounts, production)

  console.log('Inserting data into sc-repositories...')
  await batchInsertIntoDynamoDB('sc-repositories', repositories, production)

  console.log('Inserting data into sc-api-keys...')
  await batchInsertIntoDynamoDB('sc-api-keys', apiKeys, production)

  console.log('Inserting data into sc-memberships...')
  await batchInsertIntoDynamoDB('sc-memberships', memberships, production)

  console.log('Inserting data into sc-data-connections...')
  await batchInsertIntoDynamoDB(
    'sc-data-connections',
    dataConnections,
    production,
  )

  console.log('Done!')
}
