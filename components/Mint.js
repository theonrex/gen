import { useState, useEffect } from "react";
import { initOnboard } from "../ulits/onboard";
import Image from "next/image";
import Link from "next/link";
import { config } from "../dapp.config";
import Navbars from "./Header";
import {
  getTotalMinted,
  getNumberMinted,
  getMaxSupply,
  isPausedState,
  isPublicSaleState,
  isWhitelistedSaleState,
  publicMint,
  whitelistedMint,
} from "../ulits/interact";
import Navbar from "./Navbar";

export default function Mint() {
  const [maxSupply, setMaxSupply] = useState(0);
  const [totalMinted, setTotalMinted] = useState(0);
  const [NumberMinted, setNumberMinted] = useState(0);
  const [maxMintAmount, setMaxMintAmount] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isPublicSale, setIsPublicSale] = useState(false);
  const [isWlMint, setIsWlMint] = useState(false);

  const [status, setStatus] = useState(null);
  const [mintAmount, setMintAmount] = useState(1);
  const [isMinting, setIsMinting] = useState(false);
  const [onboard, setOnboard] = useState(null);
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    const init = async () => {
      setMaxSupply(await getMaxSupply());
      setTotalMinted(await getTotalMinted());
      setNumberMinted(await getNumberMinted());

      setPaused(await isPausedState());
      setIsPublicSale(await isPublicSaleState());
      // const isWlMint = await isWhitelistedSaleState();
      setIsWlMint(isWlMint);

      setMaxMintAmount(
        isWlMint ? config.WlMaxMintAmount : config.maxMintAmount
      );
    };

    init();
  }, []);

  useEffect(() => {
    const onboardData = initOnboard({
      address: (address) => setWalletAddress(address ? address : ""),
      wallet: (wallet) => {
        if (wallet.provider) {
          window.localStorage.setItem("selectedWallet", wallet.name);
        } else {
          window.localStorage.removeItem("selectedWallet");
        }
      },
    });
    setOnboard(onboardData);
  }, []);

  const previouslySelectedWallet =
    typeof window !== "undefined" &&
    window.localStorage.getItem("selectedWallet");

  useEffect(() => {
    if (previouslySelectedWallet !== null && onboard) {
      onboard.walletSelect(previouslySelectedWallet);
    }
  }, [onboard, previouslySelectedWallet]);

  const connectWalletHandler = async () => {
    const walletSelected = await onboard.walletSelect();
    if (walletSelected) {
      await onboard.walletCheck();
      window.location.reload(false);
    }
  };
  const incrementMintAmount = () => {
    if (mintAmount < maxMintAmount) {
      setMintAmount(mintAmount + 1);
    }
  };

  const decrementMintAmount = () => {
    if (mintAmount > 1) {
      setMintAmount(mintAmount - 1);
    }
  };

  const wlMintHandler = async () => {
    setIsMinting(true);

    const { success, status } = await whitelistedMint(mintAmount);

    setStatus({
      success,
      message: status,
    });

    setIsMinting(false);
  };
  const publicMintHandler = async () => {
    setIsMinting(true);

    const { success, status } = await publicMint(mintAmount);

    setStatus({
      success,
      message: status,
    });

    setIsMinting(false);
  };
  const EligbleForFreeMint = NumberMinted < 1;

  return (
    <>
    <div >
      <div className="heroinner">
      <div className="heroin"> <Image
          src="/170982.jpg"
          alt='hro'
          layout="fill"
        /></div>
        <div>
      <div className="rrex">
              <h1 className="dayo2 font-Righteous uppercase font-bold text-3xl md:text-4xl text-brand-02 bg-clip-text mt-3">
                {paused
                  ? "Paused"
                  : isWlMint
                  ? "Whitelisted Sale"
                  : "Public Sale"}{" "}
              </h1>

              <h3 className="dayo text-sm text-gray-100 tracking-widest">
                {walletAddress
                  ? walletAddress.slice(0, 8) + "..." + walletAddress.slice(-4)
                  : ""}
              </h3>
            </div>
        <div className="heropage">
        <div className="heroin"> <Image
          src={"https://drive.google.com/file/d/12oA2k_ynfL_wfur0YPKnoU_YChXhm-Pu/view?usp=share_link"}
          alt='hro'
          width="250px"
          height="250px"
        /></div>
        <div className="mint">
        <div>

             

              <div className="minten " >
              <p className="cen dayo ">
                  Max Mint Amount Per Wallet:{" "}
                  {paused
                    ? "0"
                    : isWlMint
                    ? config.WlMaxMintAmount
                    : config.maxMintAmount}{" "}
                  <br />
                  <span className="textcol">{totalMinted}</span> / {maxSupply}
                </p>
                <div className="minteng">
                  <button
                    className="w-12 h-8 md:w-14 md:h-10 flex items-center justify-center text-black hover:shadow-lg bg-gray-300 font-bold rounded-md"
                    onClick={decrementMintAmount}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 md:h-8 md:w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18 12H6"
                      />
                    </svg>
                  </button>
                  <p className="dayo">
                    {mintAmount}
                  </p>
                  <button
                    className="w-12 h-8 md:w-14 md:h-10 flex items-center justify-center text-black hover:shadow-lg bg-gray-300 font-bold rounded-md"
                    onClick={incrementMintAmount}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 md:h-8 md:w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </button>
                </div>
                

                <div className=" Greatdan ">
                  <div className="dayo">

                    <div className="inmint">
                        <p>Total</p>
                      <p>
                        {Number.parseFloat(
                          paused
                          ? "0.00"
                          : isWlMint && EligbleForFreeMint
                          ? config.whitelistSalePrice * (mintAmount - 1)
                          : isWlMint && !EligbleForFreeMint
                          ? config.whitelistSalePrice * mintAmount
                          : config.publicSalePrice * mintAmount
                          ).toFixed(1)}{" "}
                        MATIC
                      </p>{" "}
                      <span className="text-yellow-300">+ GAS</span>
                    </div>
                  </div>
                </div>

                {/* Mint Button && Connect Wallet Button */}
                {walletAddress ? (
                  <div className="btn1">

                  <button
                    className="btn glowonhover"
                    // className={` ${
                      //   paused || isMinting
                      //     ? "bg-gray-900 cursor-not-allowed"
                      //     : "bg-gradient-to-br from-brand-01 to-brand-02 shadow-lg border border-transparent hover:shadow-black/60"
                      // } font-Righteous mt-auto mb-0  w-full px-6 py-3 rounded-md text-2xl text-black  mx-4 tracking-wide uppercase border-violet-50`}
                      disabled={paused || isMinting}
                      onClick={isWlMint ? wlMintHandler : publicMintHandler}
                      >
                    {isMinting ? "Minting..." : "Mint"}
                  </button>
                    </div>
                ) : (
                  <div className="btn1">
                    <button className="btn glowonhover" onClick={connectWalletHandler}>
                      Connect wallet
                    </button>
                  </div>
                )}
              </div>
            </div>
            

        </div>
        </div>

<div className="dayo">
{status && (
              <div
                className={`border ${
                  status.success
                    ? "border-green-500 text-white"
                    : "border-red-600 text-red-700"
                } rounded-md text-start h-full px-4 py-4 w-full mx-auto mt-8 md:mt-4"`}
              >
                <p className="flex flex-col space-y-2 text-sm md:text-base break-words ...">
                  {status.message}
                </p>
              </div>
            )}
              <h3 className="rrex ">
                Contract Address :
                <br />
                <Link
                  href={`https://polygonscan.com/address/${config.contractAddress}`}
                  target="_blank"
                  rel="noreferrer"
                  className="navtext"
                >
                  <span className="navtext">
                    {" " + config.contractAddress}
                  </span>
                </Link>
              </h3>
            </div>


      </div>
      
      </div>
    </div>
    
    </>
  );
}
