import React from "react";
import Image from "next/image";
export default function WeatherArrowIcon({
  direction,
  windSpeed,
}: any) {
  const rotation = direction - 180;
  const scaleFactor = Math.min(1.3, Math.max(0.7, windSpeed / 6));

  const styles = {
    transform: `rotate(${rotation}deg) scale(${scaleFactor})`,
    width: "50px", 
    height: "50px", 
  };

  return <Image src="/arrow.png" alt="Arrow" style={styles} width={600} height={600} />;
}
