import { useEffect, useState } from "react";
import { BrowserProvider } from "ethers";
import { getContract } from "../config";
import Image from "next/image";

function Withdraw() {
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const [elapsedStakeTime, setElapsedStakeTime] = useState<number>(0);
  const [submitted, setSubmitted] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");

  const withdrawAmountString = withdrawAmount?.toString();

  const withdrawCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.withdraw();
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };

  const getWithdrawAmount = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const withdrawAmount = await contract.getWithdraw(signer);

      setWithdrawAmount(withdrawAmount);
    } catch (e: any) {
      console.log("Error data:", e.data);
      if (e.data) {
        const decodedError = contract.interface.parseError(e.data);
        console.log(`Fetching stake failed: ${decodedError?.args}`);
      } else {
        console.log("An unknown error occurred.");
      }
    }
  };

  const getElapsedStakeTime = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const elapsedStakeTime = await contract.getElapsedStakeTime(signer);

      setElapsedStakeTime(elapsedStakeTime);
    } catch (e: any) {
      console.log("Error data:", e.data);
      if (e.data) {
        const decodedError = contract.interface.parseError(e.data);
        console.log(`Fetching stake failed: ${decodedError?.args}`);
      } else {
        console.log("An unknown error occurred.");
      }
    }
  };

  return (
    <div
    className="mt-40 lg:mt-40 flex justify-center items-center text-white text-center rounded-3xl bg-gradient-to-b from-pink-500 to-pink-700 transition-all border-white border-8"
  style={{
    width: "1000%", 
    height: "60vh", 
      }}
    >
      <div>
        <span className="mt-5 flex justify-center items-center font-wonderbar text-white text-2xl">
        Meowcha Withdrawable: &nbsp;{" "}
        </span>

        <div className="flex justify-center items-center">
          <span className=" text-white font-wonderbar text-2xl">{withdrawAmountString}</span>
          <Image
            src="/images/Meowcha.png"
            alt="Left Image"
            width={50}
            height={50}
            className="ml-1"
          />
          <button
            onClick={() => {
              getWithdrawAmount();
            }}
          >
            <Image
              src="/images/refresh.svg"
              alt="Left Image"
              width={20}
              height={20}
              className="ml-4 mb-1"
              style={{ filter: "invert(1)", transition: "transform 0.3s" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
          </button>
        </div>

        <div>
          <p className="font-wonderbar text-white text-xl ">
            Withdraw Status: &nbsp;
            <span style={{ color: elapsedStakeTime > 60 ? "lime" : "maroon" }}>
              {elapsedStakeTime > 60
                ? " IT'S CANDY TIME! "
                : " Sorry, You can't get the sweets yet"}
            </span>
            <button
              onClick={() => {
                getElapsedStakeTime();
              }}
            >
              <Image
                src="/images/refresh.svg"
                alt="Left Image"
                width={20}
                height={20}
                className="ml-4"
                style={{ filter: "invert(1)", transition: "transform 0.3s" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
            </button>
          </p>
        </div>

        <div>
          <button
            className="mt-8 font-wonderbar text-pink-500 text-2xl rounded-3xl p-5 bg-white transition duration-200 ease-in-out hover:bg-gray-200 hover:shadow-lg"
            onClick={() => {
              withdrawCoin();
            }}
          >
            WITHDRAW
          </button>
        </div>
        <div className="text-2xl">
          {submitted && (
            <div className="mt-4 flex items-center justify-center">
              
              <p className="font-wonderbar text-white"> Transaction Successful!</p>
             
            </div>
          )}
        </div>
        <div className="">
          {submitted && (
            <div className="justify-center flex items-center">
              <a
                href={`https://sepolia.arbiscan.io/tx/${transactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-wonderbar text-cyan-300 cursor-pointer hover:scale-105 transition"
              >
                Click to View Transaction
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Withdraw;
