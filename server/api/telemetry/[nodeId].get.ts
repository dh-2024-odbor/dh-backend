export default defineEventHandler(async (event) => {
  const user = await useAuthenticatedUser(event);
  const nodeIdString = getRouterParam(event, 'nodeId');

  if (!nodeIdString) {
    throw createError({
      statusCode: 400,
      statusMessage: 'nodeId is required'
    });
  }

  const nodeId = parseInt(nodeIdString, 10);

  console.log(nodeId);

  const data = mongoClient.collection('telemetry').find({
    nodeId,
  }).toArray();

  return data;
})