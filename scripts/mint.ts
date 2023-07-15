import { deployments, getNamedAccounts, ethers } from "hardhat";
import { TokenERC20 } from "../../typechain";
import { Address, Deployment } from "hardhat-deploy/types";
import { BigNumber } from "ethers";
import { parseUnits } from "ethers/lib/utils";

interface ResourcesConfig {
  tier: number;
  resources: Address[];
  quantity: BigNumber;
}

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const main = async () => {
  const { deployer } = await getNamedAccounts();

  const tokenERC20: Deployment = await deployments.get("TokenERC20");
  const tokenERC20Deployed: TokenERC20 = await ethers.getContractAt(
    "TokenERC20",
    tokenERC20.address
  );

  const recipientAddress: string =
    "0xe29d36207Ce66e2b2D01038B04de8ee406602df7";
  
  const amount: BigNumber = parseUnits("1", "18");

  await delay(5000);

  // Mintear los tokens para el destinatario
  try {
    const tx = await tokenERC20Deployed.mint(recipientAddress, amount);
    await tx.wait();
    console.log(`Tokens minteados exitosamente para la dirección ${recipientAddress}.`);
  } catch (error) {
    console.error("Error al mintear los tokens:", error);
  }

  await delay(5000);
};

main();