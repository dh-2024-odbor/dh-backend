export default defineEventHandler((event) => {
  const authorizationHeader = getHeader(event, 'Authorization');

  if (!authorizationHeader) {
    throw createError({
      statusCode: 401,
      statusMessage: 'No Authorization header found',
    });
  }

  const [tokenType, token] = authorizationHeader.split(' ');

  if (tokenType !== 'Bearer') {
      throw createError({
      statusCode: 401,
      statusMessage: 'Invalid token type. Expected "Bearer"',
    });
  }

  

  event.context.auth = { user: 123 }
})