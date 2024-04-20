import getToken from './getToken';
import axios from 'axios';

const issuerUrl = 'https://dh-2024-odbor.eu.auth0.com';

export default defineEventHandler(async (event) => {
  const token = getToken(event)('Bearer');

  try {
  const { data } = await axios.get(`${issuerUrl}/userinfo`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(data);

  return data;

} catch (error) {
  console.error(error);
  throw createError({
    statusCode: 401,
    statusMessage: 'Invalid token',
  });
}

});