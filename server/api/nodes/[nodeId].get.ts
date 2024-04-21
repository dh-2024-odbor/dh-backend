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

  console.log('fetching node details', {nodeId});

  const data = await mongoClient.collection('nodes').findOne({
    nodeId,
  });

  console.log(data)

  return data;
})