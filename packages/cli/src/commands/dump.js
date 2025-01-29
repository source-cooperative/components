/**
 * @file dump.ts
 * @description This file contains functions for dumping data from various sources to JSON files.
 * It includes functionality to export DynamoDB table contents.
 *
 * The main functions in this file are:
 * - dumpTable: Exports the contents of a DynamoDB table to a JSON file.
 *
 * Each function handles pagination and writes the retrieved data to a specified output directory.
 *
 * @module dump
 * @requires @aws-sdk/client-dynamodb
 * @requires @aws-sdk/util-dynamodb
 */

// Import necessary AWS SDK and utility functions
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import * as fs from "fs";
import * as path from "path";

/**
 * Ensure output directory exists, by creating it if it doesn't.
 * 
 * @param {string} output - The base output directory path.
 * @param {string} subDir - The subdirectory to create.
 */
export function ensureOutputDir(output, subDir)  {
  const dir = path.join(output, subDir);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * Write data to JSON file
 * 
 * @param {string} output - The base output directory path.
 * @param {string} subDir - The subdirectory to write to.
 * @param {string} fileName - The name of the file to write.
 * @param {unknown} data - The data to write to the file.
 * @throws {Error} If there's an error writing the file.
 */
export function writeJsonFile(output, subDir, fileName, data) {
  const filePath = path.join(output, subDir, fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
  console.log(`Data written to ${filePath}`);
}

/**
 * Dumps the contents of all DynamoDB tables to JSON files.
 * 
 * @param {string} output - The base output directory path.
 * @param {boolean} production - True if the production environment is being used.
 * 
 * @returns {Promise<void>} a Promise that resolves when all tables have been dumped.
 */
export async function dump(output, production) {
  await dumpTable("sc-accounts", output, production);
  await dumpTable("sc-repositories", output, production);
  await dumpTable("sc-api-keys", output, production);
  await dumpTable("sc-memberships", output, production);
  await dumpTable("sc-data-connections", output, production);
}

/**
 * Dumps the contents of a DynamoDB table to a JSON file.
 *
 * This function scans the entire specified DynamoDB table,
 * handling pagination to ensure all items are retrieved.
 * The items are then unmarshalled and written to a JSON file.
 *
 * @param {string} tableName - The name of the DynamoDB table to dump.
 * @param {string} output - The base output directory path.
 * 
 * @returns {Promise<void>} a Promise that resolves when the table has been dumped or rejects with an error.
 */
export async function dumpTable(tableName, output, production) {
  console.log(`Dumping table ${tableName}...`);
  // Ensure the output directory exists
  ensureOutputDir(output, "table");
  let client;
  if (!production) {
    client = new DynamoDBClient({ endpoint: "http://localhost:8000" });
  } else {
    client = new DynamoDBClient();
  }

  let items = [];
  let lastEvaluatedKey;
  try {
    // Scan the entire table, handling pagination
    do {
      const command = new ScanCommand({
        TableName: tableName,
        ExclusiveStartKey: lastEvaluatedKey,
      });

      const response = await client.send(command);

      // Unmarshall and add items to the array
      if (response.Items) {
        items = items.concat(response.Items.map((item) => unmarshall(item)));
      }

      lastEvaluatedKey = response.LastEvaluatedKey;
    } while (lastEvaluatedKey);

    // Write items to a JSON file
    writeJsonFile(output, "table", `${tableName}.json`, items);
  } catch (error) {
    console.error("Error scanning table:", error);
    throw error;
  }
}
