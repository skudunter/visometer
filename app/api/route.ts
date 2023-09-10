// api endpoint to return weather data according to baySide
import { NextResponse } from "next/server";
import { writeFile } from "fs";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    let side: string | undefined = new URLSearchParams(url.search)
      .get("side")
      ?.toString();
      
    const apiUrl =
      side === "atlantic"
        ? "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=-33.9408&lon=18.3725"
        : "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=-34.2306&lon=18.4754";

    const res = await fetch(apiUrl, { next: { revalidate: 4000 } });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    // Write the JSON data to a file
    writeFile("public/weatherData.json", JSON.stringify(data, null, 2), () => {});

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
