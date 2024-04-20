const binaryStringToBuffer = (string: string) => {
  const groups = string.match(/[01]{8}/g);
  const numbers = groups?.map((binary) => parseInt(binary, 2))

  if (!numbers) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Cannot parse body.'
    });
  }

  return Buffer.from(numbers);
}

export default defineEventHandler(async (event) => {
  const body = await readRawBody(event, 'utf8');

  console.log(body);
  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No body provided.'
    })
  }

  const dataBuffer = binaryStringToBuffer(body);

  console.log(dataBuffer);

  const nodeId = dataBuffer.readUInt32BE();

  const eventId = dataBuffer.readUInt32BE(4);

  return {
    nodeId,
    eventId,
    dataBuffer,
  };
});