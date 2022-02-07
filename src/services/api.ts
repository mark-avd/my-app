import { SentenceAllResponse } from '../types'

export async function fetchGraphQL(): Promise<SentenceAllResponse> {
    const response = await fetch('https://academtest.ilink.dev/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
                query {
                    sentenceAll {
                        ru
                        en
                    }
                }
            `,
            variables: {},
        }),
    })
    return await response.json()
}
