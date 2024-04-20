import getToken from './getToken';

export default defineEventHandler((event) => {
 const token = getToken(event)('Basic');

  if (token !== process.env.BASIC_AUTH_TOKEN) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid Basic token',
    });
  }

  console.log('Basic token is valid');

  return 'device1';
});