import TopTitle from "./_components/topTitleBar";
import VizIndicator from "./_components/vizIndicator";
import ContactForm from "./_components/contactForm";
import { FooterItem } from "./_components/FooterItem";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <TopTitle />
      <div className="flex flex-col">
        <article className="">
          <div className="bg-main-screen-diving-image h-screen bg-cover bg-center flex items-center justify-center bg-fixed">
            <p className="hover:scale-105 hover:border-primary transition ease-in-out duration-300 mt-10 text-tersiary text-xl  font-bold p-6  border-tersiary border-8">
              Dive Conditions <b>ASAP</b>
            </p>
          </div>
        </article>
        <article className="my-10 w-11/12 mx-auto ">
          <h2 className="text-tersiary mb-10 font-extrabold text-5xl">
            Atlantic side:
          </h2>
          {/* @ts-ignore */}
          <VizIndicator side="atlantic" />
        </article>
        <article className="my-10  w-11/12 mx-auto">
          <h2 className="text-tersiary mb-10 font-extrabold text-5xl">
            False Bay side:
          </h2>
          {/* @ts-ignore */}
          <VizIndicator side="false bay" />
        </article>
        <article>
          <div className="bg-main-screen-diving-image-secondary h-screen bg-cover bg-center flex items-center justify-center bg-fixed">
            <p className="hover:scale-105 hover:border-primary transition ease-in-out duration-300 mt-10 text-tersiary text-xl  font-bold p-6  border-tersiary border-8">
              Contact Me
            </p>
          </div>
        </article>
        <article id="scroll">
          <ContactForm />
        </article>
        <footer className="bg-primary text-white py-8 border-t-4 border-tersiary">
          <div className="container mx-auto text-center">
            <p className="text-base sm:text-lg md:text-lg lg:text-lg xl:text-lg mt-2 font-semibold decoration-4 underline transition ease-in-out hover:text-quint duration-300">
              <Link
                href="https://github.com/skudunter/visometer"
                target="_blank"
              >
                Visometer
              </Link>
            </p>
            <p className="text-base sm:text-lg md:text-lg lg:text-lg xl:text-lg mt-2 underline decoration-4 font-semibold mb-4 transition ease-in-out hover:text-quint duration-300">
              <Link href="https://skudunter.com" target="_blank">
                Skudunter.com
              </Link>
            </p>
            <div className="flex flex-wrap justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <FooterItem text="Special thanks to yr-Weather for free API access" />
              <FooterItem text="Thanks to stormglass.io for API access" />
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
