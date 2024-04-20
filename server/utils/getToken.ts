export default defineEventHandler((event) => (requiredTokenType: string) => {
  const authorizationHeader = getHeader(event, 'Authorization');

  if (!authorizationHeader) {
    throw createError({
      statusCode: 401,
      statusMessage: 'No Authorization header found',
    });
  }

  const [providedTokenType, providedToken] = authorizationHeader.split(' ');

  if (requiredTokenType !== providedTokenType) {
     throw createError({
      statusCode: 401,
      statusMessage: `Invalid token type. Expected "${requiredTokenType}".`,
    });
  }

  if (!providedToken) {
    throw createError({
      statusCode: 401,
      statusMessage: `No ${requiredTokenType} token found`,
    });
  }

  return providedToken;
});