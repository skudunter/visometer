import Link from "next/link";
import TopTitleBar from "./_components/topTitleBar";

export default function Page404() {
  return (
    <main>
      <TopTitleBar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-primary text-white">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-center">404 - Page Not Found</h1>
        <p className="text-lg sm:text-xl md:text-2xl text-center">
          Oops! The page you are looking for does not exist.
        </p>
        <Link href="/">
          <p className="text-lg sm:text-xl mt-4 text-tersiary hover:text-quint hover:underline cursor-pointer transition ease-in-out duration-300">
            Go back to the home page
          </p>
        </Link>
      </div>
      <footer className="bg-primary text-white py-8 border-t-4 border-tersiary">
        <div className="container mx-auto text-center">
          <p className="text-lg mt-2 font-semibold decoration-4 underline transition ease-in-out hover:text-quint duration-300 ">
            <Link href="https://github.com/skudunter/visometer" target="_blank">
              Visometer
            </Link>
          </p>
          <p className="text-lg mt-2 underline decoration-4 font-semibold mb-4 transition ease-in-out hover:text-quint duration-300">
            <Link href="https://skudunter.com" target="_blank">
              Skudunter.com
            </Link>
          </p>
        </div>
      </footer>
    </main>
  );
}