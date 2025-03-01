import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <div className="relative h-12 w-12 md:h-14 md:w-14">
        <Image
          src="/logo.png"
          alt="Almarwazi University Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
      {/* <span className="text-xl md:text-2xl font-bold text-primary ml-3">
        جامعة الامام محمد بن نصر المروزي
      </span> */}
    </Link>
  );
}
