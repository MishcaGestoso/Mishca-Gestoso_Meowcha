import { useEffect, useState } from "react";
import { BrowserProvider } from "ethers";
import { getContract } from "../config";
import Image from "next/image";

function Staking() {
  const [stakingAmount, setStakingAmount] = useState<number>(0);
  const [stakedAmount, setStakedAmount] = useState<number>(0);
  const [submitted, setSubmitted] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");

  const stakedAmountString = stakedAmount?.toString();

  const getStake = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const stakedInEth = await contract.getStake(signer);
      setStakedAmount(stakedInEth);
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

  const stakeCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);
    try {
      const tx = await contract.stake(stakingAmount);
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      const decodedError = contract.interface.parseError(e.data);
      alert(`Staking failed: ${decodedError?.args}`);
    }
  };

  const amountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!isNaN(Number(inputValue))) {
      setStakingAmount(Number(inputValue));
      console.log(inputValue);
    } else {
      setStakingAmount(0);
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
          Meowcha Staked: &nbsp;{" "}
          <p
            className="font-sans text-white text-2xl"
            style={{ marginTop: "-4px" }}
          >
            {stakedAmountString}
          </p>
          <Image
            src="/images/Meowcha.png"
            alt="Left Image"
            width={50}
            height={50}
            className="ml-1"
          />
          <button
            onClick={() => {
              getStake();
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
        </span>
        <input
          type="number"
          className="rounded-full p-2 focus:outline-none focus:ring-4 focus:ring-white focus:border-transparent duration:100 transition-all bg-pink-400 caret-white"
          value={stakingAmount}
          onChange={(e) => amountChange(e)}
          placeholder="Enter amount to stake"
          style={{ color: "white" }}
        />
        <div>
          <button
            className="mt-8 font-wonderbar text-pink-500 text-2xl rounded-3xl p-5 bg-white transition duration-200 ease-in-out hover:bg-gray-200 hover:shadow-lg"
            onClick={() => {
              stakeCoin();
            }}
          >
            STAKE
          </button>
        </div>
        <div className="text-2xl">
          {submitted && (
            <div className="mt-4 flex items-center justify-center">
             
              <p className="font-wonderbar text-white">Transaction Confirmed!</p>
             
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

export default Staking;
