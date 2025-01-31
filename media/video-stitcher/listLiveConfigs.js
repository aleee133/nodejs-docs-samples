/**
 * Copyright 2023 Google LLC
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

function main(projectId, location) {
  // [START videostitcher_list_live_configs]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  // projectId = 'my-project-id';
  // location = 'us-central1';

  // Imports the Video Stitcher library
  const {VideoStitcherServiceClient} =
    require('@google-cloud/video-stitcher').v1;
  // Instantiates a client
  const stitcherClient = new VideoStitcherServiceClient();

  async function listLiveConfigs() {
    const iterable = await stitcherClient.listLiveConfigsAsync({
      parent: stitcherClient.locationPath(projectId, location),
    });
    console.info('Live configs:');
    for await (const response of iterable) {
      console.log(response.name);
    }
  }

  listLiveConfigs().catch(err => {
    console.error(err.message);
    process.exitCode = 1;
  });
  // [END videostitcher_list_live_configs]
}

// node listLiveConfigs.js <projectId> <location>
main(...process.argv.slice(2));
