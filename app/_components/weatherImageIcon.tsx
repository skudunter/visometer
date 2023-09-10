import Image from "next/image";
export default function WeatherImageIcon({ imageURL }: { imageURL: string }) {
    return (
      <Image
        src={imageURL}
        alt="Weather Icon"
        width={600}
        height={600}
        className="w-14 h-14 object-contain" // Adjust these classes for styling
      />
    );
  }