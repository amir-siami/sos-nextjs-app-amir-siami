import Image from "next/image";
import Link from "next/link";

export interface LogoProps {}

const Logo: React.FC<LogoProps> = () => {
  return (
    <div className="">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="Iran SOS Logo"
          width={200}
          height={40}
          quality={100}
        />
      </Link>
    </div>
  );
};

export default Logo;
