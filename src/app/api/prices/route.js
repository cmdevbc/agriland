let cachedData = {
  hourly: null,
  daily: null,
};
let lastUpdate = {
  hourly: 0,
  daily: 0,
};
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "hourly"; // Default to 'hourly'

  const now = Date.now();

  // Serve cached data if still valid
  if (cachedData[type] && now - lastUpdate[type] < CACHE_DURATION) {
    return Response.json(cachedData[type]); // Serve from cache
  }

  try {
    const query =
      type === "daily"
        ? `
      {
              pairDayDatas(
                first: 30,
                skip: 0,
                orderBy: date,
                orderDirection: desc,
                where: { pairAddress: "0x7eD5978d6FC0B26144b12D2BF9Da8397A3Ba7548" }
              ) {
                pairAddress {
                  id
                  name
                }
                date
                dailyVolumeUSD
                dailyTxns
                dailyVolumeToken0
                dailyVolumeToken1
                reserve0
                reserve1
                reserveUSD
                totalSupply
              }
            }
    `
        : ` {
              pairHourDatas(
                first: 30,
                skip: 0,
                orderBy: hourStartUnix,
                orderDirection: desc,
                where: { pair: "0x7eD5978d6FC0B26144b12D2BF9Da8397A3Ba7548" }
              ) {
                pair {
                  id
                  name
                }
                hourStartUnix
                reserve0
                reserve1
              }
            }
          `;

    console.log("query", query);

    const response = await fetch(
      "https://open-platform.nodereal.io/67cab1fd2af841e6a89015375cdb7510/pancakeswap-free/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data from NodeReal");
    }

    const data = await response.json();
    cachedData = data; // Update cache
    lastUpdate = now;

    return Response.json(data); // Send data to frontend
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
