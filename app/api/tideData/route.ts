import { NextResponse } from "next/server";
import { writeFile, existsSync, readFileSync } from "fs";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const side: string | undefined = new URLSearchParams(url.search)
      .get("side")
      ?.toString();

    const filePath = `public/${side}Tide.json`;

    if (existsSync(filePath)) {
      // Read data from the file if it exists
      const data = JSON.parse(readFileSync(filePath, "utf8"));
      const currentDate = new Date();
      const firstDataDate = new Date(data.data[0].time);
      const oneDayAgo = new Date(currentDate);
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);
      if (firstDataDate < oneDayAgo) {
        const apiUrl =
          side === "atlantic"
            ? "https://api.stormglass.io/v2/tide/extremes/point?lat=-33.9408&lng=18.3725"
            : "https://api.stormglass.io/v2/tide/extremes/point?lat=-34.2306&lng=18.4754";

        const res = await fetch(apiUrl, {
          next: { revalidate: 4000 },
          headers: {
            Authorization:
              process.env.STORMGLASS_API_KEY!,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();

        // Write the JSON data to a file
        writeFile(filePath, JSON.stringify(data, null, 2), () => {});
        console.log("tide data gotten by api call");

        return NextResponse.json({ data });
      }
      console.log("tide data retrieved from file");

      return NextResponse.json({ data });
    } else {
      const apiUrl =
        side === "atlantic"
          ? "https://api.stormglass.io/v2/tide/extremes/point?lat=-33.9408&lng=18.3725"
          : "https://api.stormglass.io/v2/tide/extremes/point?lat=-34.2306&lng=18.4754";
          if (!process.env.STORMGLASS_API_KEY){
            throw new Error("Stormglass API key is invalid");
          }
      const res = await fetch(apiUrl, {
        next: { revalidate: 4000 },
        headers: {
          Authorization: process.env.STORMGLASS_API_KEY,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();
      // Write the JSON data to a file
      writeFile(filePath, JSON.stringify(data, null, 2), () => {});
      console.log("tide data gotten by api call");
      return NextResponse.json({ data });
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
