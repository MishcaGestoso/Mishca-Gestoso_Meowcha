import { Contract, ContractRunner } from "ethers";
import abi from "./abi.json";

export function getContract(signer: ContractRunner) {
  return new Contract(
    "0xD2Ab28399a6D9E7ddb16542f5dF74f2F0F219585",
    abi as any,
    signer
  );
}
