import { NodeDetails } from '~/types/telemetry.d';
import getEventDetails from '../utils/getEventDetails';
import parseData from '../utils/parseData';
import useAuthenticatedDevice from '../utils/useAuthenticatedDevice';

export default defineEventHandler(async (event) => {
  const device = useAuthenticatedDevice(event);

  const { nodeId, messageId, dataBuffer } = await getEventDetails(event);

  console.log({ nodeId, messageId });
 
  try {
    const nodeDetails = await mongoClient.collection('nodes').findOne<NodeDetails>({ nodeId });

    if (!nodeDetails) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Node not found',
      });
    }


    console.log(nodeDetails);

    const parsedData = parseData(nodeDetails, dataBuffer);

    console.log(parsedData);
  
    const result = await mongoClient.collection('telemetry').insertOne({
      nodeId: nodeId,
      messageId: messageId,
      data: parsedData,
      timestamp: new Date(),
    });

   console.log(result);
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Error inserting data',
    });
  }

  return 'K';
})