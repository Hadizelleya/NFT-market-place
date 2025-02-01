import React, { useContext } from "react";
import { NFTContext } from "../context/NFTContext";

export default function Input({ inputType, title, placeHolder, handleClick }) {
  const { nftCurrency } = useContext(NFTContext);

  return (
    <div className="mt-10 w-full">
      <p className="font-semibold text-xl font-poppins dark:text-white text-nft-black-1 ">
        {title}
      </p>
      {inputType === "number" ? (
        <div className="dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-1  rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3 flexBetween flex-row">
          <input
            type="number"
            className="flex w-full dark:bg-nft-black-1 bg-white outline-none"
            placeholder={placeHolder}
            onChange={handleClick}
          />
          <p className="font-semibold text-xl font-poppins dark:text-white text-nft-black-1 ">
            {nftCurrency}
          </p>
        </div>
      ) : inputType === "textarea" ? (
        <textarea
          rows={10}
          className="dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-1  rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3"
          placeholder={placeHolder}
          onChange={handleClick}
        />
      ) : (
        <input
          type={inputType}
          className="dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-1  rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3"
          placeholder={placeHolder}
          onChange={handleClick}
        />
      )}
    </div>
  );
}
