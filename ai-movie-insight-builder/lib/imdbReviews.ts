export async function fetchMovie(imdbId: string) {
  const res = await fetch("https://caching.graphql.imdb.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: "https://www.imdb.com",
      Referer: "https://www.imdb.com/",
      "User-Agent": "Mozilla/5.0"
    },
    body: JSON.stringify({
      query: `
        query TitleDetails($const: ID!) {
          title(id: $const) {
            id
            titleText { text }
            releaseYear { year }
            ratingsSummary { aggregateRating }
            plot { plotText { plainText } }
            primaryImage { url }

            credits(first: 5) {
              edges {
                node {
                  name {
                    nameText { text }
                  }
                }
              }
            }
          }
        }
      `,
      variables: { const: imdbId }
    }),
    cache: "no-store"
  });

  const data = await res.json();
  const title = data?.data?.title;

  const cast =
    title?.credits?.edges?.map(
      (edge: any) => edge.node.name.nameText.text
    ) || [];

  return {
    imdbId: title.id,
    title: title.titleText?.text,
    year: title.releaseYear?.year,
    rating: title.ratingsSummary?.aggregateRating,
    plot: title.plot?.plotText?.plainText,
    poster: title.primaryImage?.url,
    cast
  };
}

export async function fetchIMDbReviews(imdbId: string) {
  const res = await fetch("https://caching.graphql.imdb.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: "https://www.imdb.com"
    },
    body: JSON.stringify({
      query: `
        query TitleReviewsRefine($const: ID!) {
          title(id: $const) {
            reviews(first: 3) {
              edges {
                node {
                  text {
                    originalText {
                      plainText
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables: { const: imdbId }
    })
  });

  const data = await res.json();

  const edges = data?.data?.title?.reviews?.edges || [];

  return edges
    .map((e: any) => e.node?.text?.originalText?.plainText)
    .filter(Boolean);
}