export default defineEventHandler(async (event) => {
  const user = await useAuthenticatedUser(event);
  console.log(user);

  const data = mongoClient.collection('telemetry').find().toArray();

  return data;
})