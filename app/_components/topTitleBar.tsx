import Link from "next/link";

export default function TopTitleBar() {
  return (
    <div className="flex items-center justify-between ">
      <span className="text-tersiary font-bold text-5xl my-5 ml-2 lg:text-9xl md:ml-4 sm:ml-4 sm:text-7xl transition ease-in-out duration-300">
        Visometer.
      </span>
      <p className="hover:text-primary hover:bg-tersiary transition ease-in-out scale-75 duration-300 text-tersiary text-right font-bold p-2 mr-0 lg:mr-10 sm:mr-4 lg:scale-100 sm:scale-90  mt-5 border-4 border-tersiary bg-transparent ">
        <Link href={"/#from_name"}> Contact Me</Link>
      </p>
    </div>
  );
}
