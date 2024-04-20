import { useAuth0 } from '@auth0/auth0-vue';

export default async () => {
  const { getAccessTokenSilently } = useAuth0();
  
  return {
    Authorization: `Bearer ${await getAccessTokenSilently()}`
  };
}