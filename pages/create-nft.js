import { useState, useMemo, useCallback, useContext } from "react";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Button, Input } from "../components/export";
import images from "../assets";
import { NFTContext } from "../context/NFTContext";

export default function CreateNft() {
  const { theme } = useTheme();
  const [fileUrl, setFileUrl] = useState(null);
  const { uploadFileToPinata } = useContext(NFTContext);
  const [formInput, setFormInput] = useState({
    name: "",
    price: "",
    description: "",
  });

  const onDrop = useCallback(async (acceptedFile) => {
    const res = await uploadFileToPinata(acceptedFile[0]);
    const url = `https://gateway.pinata.cloud/ipfs/${res.IpfsHash}`;
    setFileUrl(url);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop, accept: "image/*", maxSize: 5000000 });

  const fileStyle = useMemo(
    () =>
      `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 flex flex-col items-center p-5 rounded-sm border-dashed 
      ${isDragActive && "border-fil-active"} 
      ${isDragAccept && "border-fil-accept"} 
      ${isDragReject && "border-fil-reject"}`,
    [isDragActive, isDragAccept, isDragReject]
  );

  return (
    <div className="flex justify-center sm:px-4 p-12 ">
      <div className="w-3/5 md:w-full ">
        <h1 className="flex-1 font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">
          Create New NFT
        </h1>
        <div className="mt-16 ">
          <p className="font-semibold text-xl font-poppins dark:text-white text-nft-black-1 ">
            Upload File
          </p>
          <div className="mt-4">
            <div {...getRootProps()} className={fileStyle}>
              <input {...getInputProps()} />
              <div className="flexCenter flex-col text-center">
                <p className="font-semibold text-xl font-poppins dark:text-white text-nft-black-1 ">
                  JPG, PNG, GIF, SVG, WEBM Max 100mb.
                </p>
                <div className="my-12 w-full flex justify-center">
                  <Image
                    src={images.upload}
                    width={100}
                    height={100}
                    objectFit={"contain"}
                    alt="fil upload"
                    className={theme === "light" ? "filter invert" : ""}
                  />
                </div>
                <p className="font-semibold text-sm font-poppins dark:text-white text-nft-black-1 ">
                  Drag and Drop File.
                </p>
                <p className="font-semibold text-sm font-poppins dark:text-white text-nft-black-1 ">
                  Or Browse media on your device.
                </p>
              </div>
            </div>
            {fileUrl && (
              <aside>
                <div>
                  <img src={fileUrl} alt="asset_file" />
                </div>
              </aside>
            )}
          </div>
        </div>
        <Input
          inputType="text"
          title="Name"
          placeHolder="NFT Name"
          handleClick={(e) =>
            setFormInput({ ...formInput, name: e.target.value })
          }
        />
        <Input
          inputType="textarea"
          title="Description"
          placeHolder="NFT Description"
          handleClick={(e) =>
            setFormInput({ ...formInput, description: e.target.value })
          }
        />
        <Input
          inputType="number"
          title="Price"
          placeHolder="NFT Price"
          handleClick={(e) =>
            setFormInput({ ...formInput, price: e.target.value })
          }
        />

        <div className="mt-7 w-full flex justify-end">
          <Button
            btnName={"Create NFT"}
            classStyles={"rounded-xl"}
            handleClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
}
