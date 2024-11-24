let cachedData = null;
let lastUpdate = 0;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export async function GET() {
  const now = Date.now();

  // Serve cached data if still valid
  if (cachedData && (now - lastUpdate) < CACHE_DURATION) {
    return Response.json(cachedData); // Serve from cache
  }

  try {
    
    const response = await fetch('https://open-platform.nodereal.io/67cab1fd2af841e6a89015375cdb7510/pancakeswap-free/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `{
          pairHourDatas(first: 1000, skip: 0, orderBy: hourStartUnix, orderDirection: desc, where: { pair: "0xF31cb18759FE8356348c81268b859d2a32bf2117" }) {
            hourStartUnix
            reserve0
            reserve1
          }
        }`
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from NodeReal');
    }

    const data = await response.json();
    cachedData = data;  // Update cache
    lastUpdate = now;

    return Response.json(data); // Send data to frontend
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
