import Link from "next/link";
import Image from "next/image";
import logo from "@/app/favicon_io/android-chrome-192x192.png";

export default function Logo({
  height,
  width,
}: {
  height: number;
  width: number;
}) {
  return (
    <Link href="/">
      <Image
        src={logo}
        key={"logo"}
        id="logo"
        alt=""
        className="rounded-full"
        width={width}
        height={height}
      />
    </Link>
  );
}
