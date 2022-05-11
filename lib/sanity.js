import sanityClient from '@sanity/client';

export const sanity = sanityClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2021-03-25',
    useCdn: false,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
})