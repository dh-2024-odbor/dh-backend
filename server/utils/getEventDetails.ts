const binaryStringToBuffer = (string: string) => {
    console.log({string});
  const groups = string.match(/.{4}/g);

  const numbers = groups?.map((binary) => parseInt(binary, 16))

  if (!numbers) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Cannot parse body.'
    });
  }

  return Buffer.from(string, 'hex');
}

export default defineEventHandler(async (event) => {
  const body = await readRawBody(event, 'hex');

  console.log(body);
  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No body provided.'
    })
  }

  const dataBuffer = binaryStringToBuffer(body);

  console.log(dataBuffer);

  const nodeId = dataBuffer.readUInt32LE();

  const eventId = dataBuffer.readUInt32LE(4);

  return {
    nodeId,
    eventId,
    dataBuffer,
  };
});