import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <div className="relative h-16 w-16 md:h-24 md:w-24">
        <Image
          src="/download-removebg-preview (2).png"
          alt="Almarwazi University Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
      {/* <span className="text-xl md:text-2xl font-bold text-primary mr-3">
        جامعة المروزي
      </span> */}
    </Link>
  );
}
