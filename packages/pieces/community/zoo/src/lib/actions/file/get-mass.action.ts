import { createAction, Property } from '@activepieces/pieces-framework';
import { zooAuth } from '../../../index'
import { httpClient, HttpMethod } from '@activepieces/pieces-common';

export const getMassAction = createAction({
  name: 'get_mass',
  displayName: 'Get Mass',
  description: 'Calculate the mass of a CAD file',
  auth: zooAuth,
  // category: 'File Operations',
  props: {
    file: Property.File({
      displayName: 'CAD File',
      required: true,
      description: 'The CAD file to analyze',
    }),
  },
  async run({ auth, propsValue }) {
    const formData = new FormData();
    formData.append('file', new Blob([propsValue.file.data]), propsValue.file.filename);

    const response = await httpClient.sendRequest({
      method: HttpMethod.POST,
      url: 'https://api.zoo.dev/file/mass',
      headers: {
        Authorization: `Bearer ${auth}`,
      },
      body: formData,
    });
    return response.body;
  },
});
