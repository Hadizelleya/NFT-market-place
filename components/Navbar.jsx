import { useState, useEffect, useContext, act } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import images from "../assets";
import { FaSun } from "react-icons/fa";
import { Button } from "../components/export";
import { FaMoon } from "react-icons/fa";
import { NFTContext } from "../context/NFTContext";

const MenuItems = ({ isMobile, active, setActive }) => {
  const generateLink = (i) => {
    switch (i) {
      case 0:
        return "/";
      case 1:
        return "/created-nfts";
      case 2:
        return "/my-nfts";
      default:
        return "/";
    }
  };

  return (
    <ul
      className={`list-none flexCenter flex-row ${
        isMobile && "flex-col h-full gap-6"
      }`}
    >
      {["Explore NFTs", "Listed NFTs", "My NFTs"].map((item, i) => (
        <li
          key={i}
          className={` ${
            isMobile ? " text-xl" : "text-base"
          } flex transition-all ease-in duration-200 flex-row items-center font-poppins font-semibold cursor-pointer dark:hover:text-white hover:text-nft-dark mx-3 ${
            active === item
              ? "dark:text-white text-nft-black-1"
              : "dark:text-nft-gray-3 text-nft-gray-2"
          }`}
          onClick={() => setActive(item)}
        >
          <Link href={generateLink(i)}>{item}</Link>
        </li>
      ))}
    </ul>
  );
};

const ButtonGroup = ({ setActive, router }) => {
  const { connectWallet, currentAccount } = useContext(NFTContext);

  return currentAccount ? (
    <Button
      handleClick={() => {
        setActive("");
        router.push("/create-nft");
      }}
      btnName={"Create"}
      classStyles={"mx-2  rounded-xl"}
    ></Button>
  ) : (
    <Button
      handleClick={connectWallet}
      btnName={"Connect"}
      classStyles={"mx-2 rounded-xl"}
    ></Button>
  );
};

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [active, setActive] = useState("Explore NFTs");
  const [isOpen, setIsOpen] = useState(false);
  console.log({ theme });

  return (
    <nav className="flexBetween w-full fixed z-10 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-3 border-nft-white">
      <div className="flex flex-1 flex-row justify-start">
        <Link href={"/"}>
          <div className="flexCenter md:hidden gap-1 cursor-pointer">
            <Image
              src={images.logo02}
              objectFit={"contain"}
              width={32}
              height={32}
              alt="logo"
            />
            <p className="dark:text-white text-nft-black-1 font-semibold text-lg">
              CryptoKet
            </p>
          </div>
        </Link>
        <Link href={"/"}>
          <div className="hidden md:flex" onClick={() => {}}>
            <Image
              src={images.logo02}
              objectFit={"contain"}
              width={32}
              height={32}
              alt="logo"
            />
          </div>
        </Link>
      </div>
      <div className="flex flex-initial flex-row justify-end ">
        <div className="flex items-center mr-2">
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          />
          <label
            htmlFor="checkbox"
            className="flexBetween gap-1 w-8 h-4 bg-black rounded-2xl p-1 relative label"
          >
            <FaSun className=" text-yellow-300" />
            <FaMoon className=" text-pink-300" />
            <div className="w-3 h-3 absolute bg-white rounded-full ball" />
          </label>
        </div>

        <div className="md:hidden flex">
          <MenuItems isMobile={false} active={active} setActive={setActive} />
          <div className=" ml-4">
            <ButtonGroup router={router} setActive={setActive} />
          </div>
        </div>
      </div>

      <div className="hidden md:flex ml-2 ">
        {isOpen ? (
          <Image
            src={images.cross}
            objectFit={"contain"}
            width={20}
            height={20}
            alt="close"
            onClick={() => setIsOpen(false)}
            className={` cursor-pointer ${
              theme === "light" && " filter invert"
            }`}
          />
        ) : (
          <Image
            objectFit={"contain"}
            width={25}
            height={25}
            alt="menu"
            onClick={() => setIsOpen(true)}
            className={`cursor-pointer ${
              theme === "light" && " filter invert"
            }`}
            src={images.menu}
          />
        )}

        {isOpen && (
          <div className=" fixed inset-0 top-65 dark:bg-nft-dark bg-white z-10  nav-h flex justify-between flex-col">
            <div className="flex-1 p-4">
              <MenuItems active={active} setActive={setActive} isMobile />
            </div>
            <div className="p-4 border-t dark:border-nft-black-1 border-nft-gray-1">
              <ButtonGroup setActive={setActive} router={router} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
