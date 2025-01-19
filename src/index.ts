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

  const provider = new ethers.BrowserProvider(getEth());

  const contract = new ethers.Contract(
    "0x5fbdb2315678afecb367f032d93f642f64180aa3",
    [
      "function hello() public pure returns (string memory)"
    ],
    provider
  );

  document.body.innerHTML = await contract.hello();
}

run();
