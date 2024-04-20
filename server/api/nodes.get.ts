export default defineEventHandler(async (event) => {
  const user = await useAuthenticatedUser(event);
 
  /// fetch all nodes from collection nodes and join last telemetry data from collection telemetry
  const data = mongoClient.collection('nodes').aggregate([
    {
      $lookup: {
        from: 'telemetry',
        localField: 'nodeId',
        foreignField: 'nodeId',
        as: 'telemetry'
      }
    },
    {
      $unwind: {
        path: '$telemetry',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $sort: {
        'telemetry.timestamp': -1
      }
    },
    {
      $group: {
        _id: '$_id',
        nodeId: { $first: '$nodeId' },
        label: { $first: '$label' },
        features: { $first: '$features' },
        format: { $first: '$format' },
        telemetry: { $first: '$telemetry' }
      }
    },
    {
      $project: {
        _id: 1,
        nodeId: 1,
        label: 1,
        features: 1,
        format: 1,
        telemetry: 1
      }
    }
  ]).toArray();

  return data;
})