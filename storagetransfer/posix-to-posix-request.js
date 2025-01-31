/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

async function main(
  projectId = 'my-project',
  sourceAgentPoolName = '',
  sinkAgentPoolName = '',
  rootDirectory = '',
  destinationDirectory = '',
  bucketName = ''
) {
  // [START storagetransfer_transfer_posix_to_posix]

  // Imports the Google Cloud client library
  const {
    StorageTransferServiceClient,
  } = require('@google-cloud/storage-transfer');

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // Your project id
  // const projectId = 'my-project'

  // The agent pool associated with the POSIX data source. Defaults to the default agent
  // const sourceAgentPoolName = 'projects/my-project/agentPools/transfer_service_default'

  // The agent pool associated with the POSIX data sink. Defaults to the default agent
  // const sinkAgentPoolName = 'projects/my-project/agentPools/transfer_service_default'

  // The root directory path on the source filesystem
  // const rootDirectory = '/directory/to/transfer/source'

  // The root directory path on the sink filesystem
  // const destinationDirectory = '/directory/to/transfer/sink'

  // The ID of the GCS bucket for intermediate storage
  // const bucketName = 'my-intermediate-bucket'

  // Creates a client
  const client = new StorageTransferServiceClient();

  /**
   * Creates a request to transfer from the local file system to the sink bucket
   */
  async function transferDirectory() {
    const createRequest = {
      transferJob: {
        projectId,
        transferSpec: {
          sourceAgentPoolName,
          sinkAgentPoolName,
          posixDataSource: {
            rootDirectory,
          },
          posixDataSink: {
            rootDirectory: destinationDirectory,
          },
          gcsIntermediateDataLocation: {
            bucketName,
          },
        },
        status: 'ENABLED',
      },
    };

    // Runs the request and creates the job
    const [transferJob] = await client.createTransferJob(createRequest);

    const runRequest = {
      jobName: transferJob.name,
      projectId: projectId,
    };

    await client.runTransferJob(runRequest);

    console.log(
      `Created and ran a transfer job from '${rootDirectory}' to '${destinationDirectory}' with name ${transferJob.name}`
    );
  }

  transferDirectory();
  // [END storagetransfer_transfer_posix_to_posix]
}

main(...process.argv.slice(2));

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
