import Link from "next/link";
import { LocateFixed } from "lucide-react";
import Typewriter from "@/components/typewriter";
import { Cinzel, Merriweather } from "next/font/google";
import StarField from "@/components/home/StarField";

const cinzel = Cinzel({ weight: "400", subsets: ["latin"] });
const playFair = Merriweather({ weight: "400", subsets: ["latin"] });

export default function Home() {
  return (
    <div className=" w-full h-full overflow-hidden">
      <StarField />
      <div className=" absolute top-28 left-5 md:top-36 md:left-10 lg:top-36 lg:left-16  mix-blend-difference">
        <h1
          className={` ${cinzel.className} text-7xl font-medium md:text-8xl lg:text-9xl text-white`}
        >
          Asad Qureshi
        </h1>

        <div className=" flex justify-between my-3">
          <Typewriter texts={["FullStack & DevOps", "Coder & Engineer", ""]} />
        </div>
        {/* <p className=" absolute text-white">
          As engineers, we don’t say no—we find a way to make it happen.
        </p> */}
      </div>
      <div className="absolute right-2 bottom-2 md:right-5 md:bottom-5">
        <div className=" w-16 h-16 md:w-24 md:h-24 mt-5">
          <LocateFixed
            className={`w-full h-full stroke-white stroke-1 transition-transform duration-500 cursor-pointer rotate-0`}
          />
          <div
            className={`absolute inset-0 flex items-center justify-centerm ${playFair.className}`}
          >
            <Link
              href="/projects"
              className={`absolute text-white text-sm md:text-lg transition-opacity duration-500 opacity-100`}
              style={{ transform: "translate(0%, -180%)" }}
            >
              PROJECTS
            </Link>
            <Link
              href="/me"
              className={`absolute text-white text-sm md:text-lg transition-opacity duration-500 opacity-100`}
              style={{ transform: "translate(-100%, 30%)" }}
            >
              ME
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
