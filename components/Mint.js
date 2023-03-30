import { useState, useEffect } from "react";
import { initOnboard } from "../ulits/onboard";
import Image from "next/image";
import { config } from "../dapp.config";
// import Navbars from "./Header";
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
    {/* <Navbars /> */}
    <div className="min-h-screen h-full w-full overflow-hidden flex flex-col items-center justify-center bg-brand-background ">
      <div className="relative w-full h-full flex flex-col items-center justify-center py-2">
        <Image
          src="/hero.jpg"
          className="absolute inset-auto block w-full min-h-screen object-cover"
        />
        <div>
          <div
            className=" z-1 md:max-w-3xl w-full bg-black/75 filter  py-4 rounded-md px-2 md:px-10 flex flex-col items-center
            bg-gray-800 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 border-2 border-gray-100 backdrop-saturate-150"
          >
            <div className="rrex">
              <h1 className="dayo font-Righteous uppercase font-bold text-3xl md:text-4xl text-brand-02 bg-clip-text mt-3">
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

            <div>
              <div className="relative w-full">
                {/* <Image
                src="/nft.gif"
                  className="object-cover w-full mt-auto mb-0 sm:h-[280px] md:w-[250px] rounded-md border border-gray-100"
                /> */}
              </div>

              {/* Increment and decrement */}

              <div className=" flex flex-col items-center w-full px-4 mt-16 md:mt-0 ">
                <div className="font-Righteous flex items-center justify-between w-full">
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
                  <p className="dayo flex items-center justify-center flex-1 grow text-center font-bold text-brand-02 text-3xl md:text-4xl">
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
                <p className="cen text-sm text-gray-100 tracking-widest mt-5">
                  Max Mint Amount Per Wallet:{" "}
                  {paused
                    ? "0"
                    : isWlMint
                    ? config.WlMaxMintAmount
                    : config.maxMintAmount}{" "}
                  <br />
                  <span className="text-col">{totalMinted}</span> / {maxSupply}
                </p>

                <div className=" Greatdan border-t border-b py-4 mt-9 w-full">
                  <div className="w-full text-xl font-Righteous flex items-center justify-between text-yellow-300">
                    <p>Total</p>

                    <div className="flex items-center space-x-3">
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
                    className="btn"
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
                    <button className="btn" onClick={connectWalletHandler}>
                      Connect wallet
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/*Status*/}

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

            {/* Contract Address */}

            <div className="flex flex-col items-center mt-4 py-2 w-full">
              <h3 className="rrex text-1xl text-white uppercase mt-2 font-normal">
                Contract Address :
                <br />
                <Link
                  href={`https://polygonscan.com/address/${config.contractAddress}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white mt-4 font-normal"
                >
                  <span className="break-all ...">
                    {" " + config.contractAddress}
                  </span>
                </Link>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
