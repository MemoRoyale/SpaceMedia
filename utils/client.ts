import sanityClient from '@sanity/client';


export const client = sanityClient({
  projectId: 'js8t45ta',
  dataset: 'production',
  apiVersion: '2022-03-10',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN
  
});
