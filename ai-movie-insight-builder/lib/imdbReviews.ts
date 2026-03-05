// Fetch 3 reviews from IMDb GraphQL
export async function fetchIMDbReviews(imdbId: string) {
  const url = "https://caching.graphql.imdb.com/";
  const payload = {
    query: `
      query TitleReviewsRefine($const: ID!, $first: Int!) {
        title(id: $const) {
          reviews(first: $first) {
            edges {
              node {
                text { originalText { plainText } }
              }
            }
          }
        }
      }
    `,
    operationName: "TitleReviewsRefine",
    variables: { const: imdbId, first: 3 },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Origin": "https://www.imdb.com",
      "Accept-Language": "en-US,en;q=0.9",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  // Extract review texts safely
  const edges = data?.data?.title?.reviews?.edges || [];
  return edges
    .map((edge: any) => edge.node?.text?.originalText?.plainText)
    .filter(Boolean);
}

