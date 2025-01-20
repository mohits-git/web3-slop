import { ethers } from "ethers";
import { EthereumProvider } from "hardhat/types";

function getEth(): EthereumProvider {
  // @ts-ignore
  const eth = window.ethereum as EthereumProvider;
  if (!eth) {
    throw new Error("get metamask and a positive attitude");
  }
  return eth;
}

async function hasAccounts(): Promise<boolean> {
  const eth = getEth();
  const accounts = (await eth.request({ method: "eth_accounts" })) as string[];
  return accounts && accounts.length > 0;
}

async function requestAccounts(): Promise<boolean> {
  const eth = getEth();
  const accounts = (await eth.request({
    method: "eth_requestAccounts",
  })) as string[];
  return accounts && accounts.length > 0;
}

async function run() {
  if (!(await hasAccounts()) && !(await requestAccounts())) {
    throw new Error("Please let me take your money");
  }

  // const provider = new ethers.BrowserProvider(getEth());
  const signer = await new ethers.BrowserProvider(getEth()).getSigner();

  const contractAddress = process.env.CONTRACT_ADDRESS as string;
  console.log(contractAddress);
  const contract = new ethers.Contract(
    contractAddress,
    [
      "function count() public",
      "function getCounter() public view returns (uint32)",
    ],
    signer
    //  provider
  );

  const el = document.createElement("div");
  async function setCounter() {
    el.innerHTML = (await contract.getCounter()).toString();
  }
  setCounter();

  const button = document.createElement("button");
  button.innerHTML = "increment";
  button.onclick = async function () {
    const tx = await contract.count();
    const receipt = await tx.wait();
    if (receipt.status === 1) {
      await setCounter();
    }
  };

  document.body.appendChild(el);
  document.body.appendChild(button);
}

run();
