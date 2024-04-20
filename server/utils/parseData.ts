import { DataFormat, NodeDetails } from '~/types/telemetry.d';

export default (nodeDetails: NodeDetails, buffer: Buffer) => {
  switch (nodeDetails.format) {
    case DataFormat.tph01:
      const temperature = buffer.readFloatBE(8);
      const pressure = buffer.readFloatBE(12);
      const humidity = buffer.readFloatBE(16);

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