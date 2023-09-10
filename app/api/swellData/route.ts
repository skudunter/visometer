import { NextResponse } from "next/server";
import { writeFile, existsSync, readFileSync } from "fs";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const side: string | undefined = new URLSearchParams(url.search)
      .get("side")
      ?.toString();

    const filePath = `public/${side}Swell.json`;

    if (existsSync(filePath)) {
      const data = JSON.parse(readFileSync(filePath, "utf8"));
      const currentDate = new Date();
      const firstDataDateTime = data.hours[0].time;
      const firstDataDate = new Date(firstDataDateTime.split("T")[0]);
      const oneDayAgo = new Date(currentDate);
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);
      if (firstDataDate < oneDayAgo) {
        const apiUrl =
          side === "atlantic"
            ? "https://api.stormglass.io/v2/weather/point?lat=-33.9408&lng=18.3725&params=swellHeight,waterTemperature"
            : "https://api.stormglass.io/v2/weather/point?lat=-34.2306&lng=18.4754&params=swellHeight,waterTemperature";
        if (!process.env.STORMGLASS_API_KEY) {
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
        console.log("swell data gotten by api call");

        return NextResponse.json({ data });
      }
      console.log("swell data retrieved from file");

      return NextResponse.json({ data });
    } else {
      const apiUrl =
        side === "atlantic"
          ? "https://api.stormglass.io/v2/weather/point?lat=-33.9408&lng=18.3725&params=swellHeight,waterTemperature"
          : "https://api.stormglass.io/v2/weather/point?lat=-34.2306&lng=18.4754&params=swellHeight,waterTemperature";
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
      console.log("swell data gotten by api call");
      return NextResponse.json({ data });
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
