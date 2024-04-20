import { DataFormat, NodeDetails } from '~/types/telemetry.d';

export default (nodeDetails: NodeDetails, buffer: Buffer) => {
  switch (nodeDetails.format) {
    case DataFormat.tph01:
      const temperature = buffer.readFloatLE(8);
      const pressure = buffer.readFloatLE(12);
      const humidity = buffer.readFloatLE(16);

      return {
        temperature,
        pressure,
        humidity
      };

    default:
      throw createError({
        statusCode: 400,
        statusMessage: 'Node uses unsupported format.'
      })
  }
}