"use client";
import { BrowserProvider } from "ethers";
import { JsonRpcProvider } from "ethers/providers";
import Image from "next/image";
import Minting from "../components/mintingPanel";
import Staking from "../components/stakingPanel";
import ConnectMessage from "../components/connectMessage";
import Withdraw from "../components/withdrawPanel";
import { useEffect, useState } from "react";
import { getContract } from "../config";
import Background from "../public/images/BG.png";
export default function Home() {
  const [walletKey, setwalletKey] = useState("");
  const [chosenButton, setChosenButton] = useState<number>();

  const showCard = () => {
    switch (chosenButton) {
      case 0:
        return <Minting />;
      case 1:
        return <Staking />;
      case 2:
        return <Withdraw />;
      default:
        return <ConnectMessage />;
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (walletKey !== "") {
        setChosenButton(0);
      } else {
        setChosenButton(4);
      }
    }
  }, [walletKey]);

  const connectWallet = async () => {
    const { ethereum } = window as any;

    await ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          nativeCurrency: {
            name: "ETH",
            symbol: "ETH",
            decimals: 18,
          },
          rpcUrls: [
            "https://sepolia-rollup.arbitrum.io/rpc",
            "https://arbitrum-sepolia.blockpi.network/v1/rpc/public",
          ],
          chainId: "0x66eee",
          chainName: "Arbitrum Sepolia",
        },
      ],
    });

    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setwalletKey(accounts[0]);

    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [
        {
          chainId: "0x66eee",
        },
      ],
    });
  };

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between p-12 relative"
      style={{
        
        backgroundImage: `url(${Background.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundPositionY: "80%",
        overflow: "hidden",
      }}
    >
      <div className="absolute top-0 left-0 w-full h-30vh bg-pink-900 bg-opacity-50 z-10;">
        <p className="left-0 top-0 flex w-full justify-space-between items-center p-8 pb-6 pt-8 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:p-4 lg:dark:bg-transparent">
          <div className="flex items-center group">
            <a
              href="https://www.youtube.com/shorts/7fTHD07Q9Pw"
              target="_blank"
              rel="noopener noreferrer"
              className=""
            >
              <Image
                src="/images/Meowcha.png"
                alt="Meowcha"
                className="mr-3 mb-1 group-hover:scale-105 group transition duration-300 motion-reduce:transform-none"
                width={80}
                height={84}
                priority
              />
            </a>
            <a
              href="https://www.youtube.com/shorts/7fTHD07Q9Pw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-wonderbar text-3xl -ml-2 group-hover:scale-105 transition duration-300 motion-reduce:transform-none "
            >
              <span>Meowcha</span>
            </a>
          </div>
          <button
            onClick={() => {
              connectWallet();
            }}
            className="text-white hover:text-gray-200 font-wonderbar text-xl ml-auto hover:scale-105 transition duration-300 motion-reduce:transform-none border-4 rounded-3xl border-pink-400 hover:border-pink-600 p-4 shadow"
          >
            {walletKey !== "" && (
              <>
                <span className=""> You are Connected!: </span>
                <span className="font-sans">
                  {walletKey.substring(0, 7)}
                  {walletKey.length > 7 ? "..." : ""}
                </span>
              </>
            )}
            {walletKey === "" && <span className="">Click Here to Connect Wallet</span>}
          </button>
        </p>
      </div>

      <div
  className="text-white fixed left-20 top-60 lg:top-55 grid text-left p-5 bg-gradient-to-b from-pink-500 to-pink-700 shadow-xl rounded-3xl border-8 border-white transition duration-200 ease-in-out hover:bg-gray-300 hover:shadow-lg"
  style={{
    width: "20%",
    height: "50vh",
    zIndex: 999 
  }}
>

        <button
          className="group rounded-3xl border border-transparent px-5 py-4 transition-all duration-300 hover:shadow-lg hover:bg-gray-800/30 focus:bg-gray-900/40"
          onClick={() => (walletKey ? setChosenButton(0) : setChosenButton(3))}
        >
          <h2
            className={`flex items-center justify-center font-wonderbar text-white text-3xl ml-auto transition-transform group-hover:scale-110 duration:300 motion-reduce:transform-none `}
          >
           
            <span className="inline-block transition-transform group-hover:scale-110 duration:300 motion-reduce:transform-none ">
              Mint{" "}
            </span>
          </h2>
          <p
            className={`mt-2 m-0 text-white text-sm opacity-50 font-wonderbar group-hover:opacity-90 group-focus:opacity-90 transition-all duration-300`}
          >
            Get some sweet Meoow!
          </p>
        </button>

        <button
          className="group rounded-3xl border border-transparent px-5 py-4 transition-all duration-300 hover:shadow-lg hover:bg-gray-800/40 focus:bg-gray-900/50"
          onClick={() => (walletKey ? setChosenButton(1) : setChosenButton(3))}
        >
          <h2
            className={`flex items-center justify-center font-wonderbar text-white text-3xl ml-auto transition-transform group-hover:scale-110 duration:300 motion-reduce:transform-none `}
          >
            
    
            <span className="inline-block transition-transform group-hover:scale-110 duration:300 motion-reduce:transform-none">
              Stake{" "}
            </span>
          </h2>
          <p
            className={`mt-2 m-0 text-white text-sm opacity-50 font-wonderbar group-hover:opacity-90 group-focus:opacity-90 transition-all duration-300`}
          >
            Earn more Meoow!
          </p>
        </button>

        <button
          className="group rounded-3xl border border-transparent px-5 py-4 transition-all duration-300 hover:shadow-lg hover:bg-gray-800/40 focus:bg-gray-900/50 "
          onClick={() => (walletKey ? setChosenButton(2) : setChosenButton(3))}
        >
          <h2
            className={`flex items-center justify-center font-wonderbar text-white text-3xl ml-auto transition-transform group-hover:scale-110 duration:300 motion-reduce:transform-none `}
          >
            
            <span className="inline-block transition-transform group-hover:scale-110 duration:300 motion-reduce:transform-none">
              Withdraw{" "}
            </span>
          </h2>
          <p
            className={`mt-2 m-0 text-white text-sm opacity-50 font-wonderbar group-hover:opacity-90 group-focus:opacity-90 transition-all duration-300`}
          >
            Get your sweet Meooow!
          </p>
        </button>
      </div>

      <div className="flex items-right justify-center lg:mb-90 mb-30" style={{ width: "700px", height: "250px" }}>
        {showCard()}
      </div>
    </main>
  );
}
