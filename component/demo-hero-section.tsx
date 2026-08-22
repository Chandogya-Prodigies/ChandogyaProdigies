import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";

export default function DemoHeroSection() {
  return (
    <section className="relative isolate flex min-h-[440px] items-center justify-center overflow-hidden bg-[#B9651F] px-5 py-16 text-white dark:bg-[#160C07] sm:min-h-[520px] sm:py-20">
      <Image
        src="/images/mandalabg.jpg"
        alt=""
        fill
        preload
        sizes="100vw"
        className="-z-30 object-cover object-center"
      />
      <div className="absolute inset-0 -z-20 bg-[#A95618]/28 dark:bg-[#160C07]/54" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(69,37,12,0.08)_42%,rgba(69,37,12,0.45)_100%)]" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <p className="font-serif text-xl font-semibold text-white sm:text-3xl">
          Want to try some
        </p>
        <h1 className="mt-3 text-5xl font-bold leading-none tracking-normal text-white sm:text-7xl lg:text-8xl">
          Demo videos
        </h1>
        <Link
          href="#demo-videos"
          className="mt-8 inline-flex h-13 items-center justify-center gap-3 rounded-full bg-[#3D2A13]/82 px-7 text-base font-medium text-white shadow-[0_18px_44px_rgba(48,27,8,0.28)] transition hover:-translate-y-1 hover:bg-[#315C45] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8EBCF] dark:bg-[#D4A72C] dark:text-[#160C07] dark:hover:bg-[#E4BB46] sm:h-16 sm:px-10 sm:text-2xl"
        >
          <Play className="h-5 w-5 fill-current sm:h-6 sm:w-6" />
          Start exploring
        </Link>
      </div>
    </section>
  );
}
