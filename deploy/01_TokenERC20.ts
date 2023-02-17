import { ethers, run } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { constants } from "ethers";

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;
  const _tokenName = "Eludius18 Token";
  const _tokenSymbol = "ETR";

  const tokenERC20 = await deploy("TokenERC20", {
    from: deployer,
    args: [],
    log: true,
    proxy: {
      proxyContract: "OpenZeppelinTransparentProxy",
      execute: {
        init: {
          methodName: "initialize",
          args: [
            _tokenName,
            _tokenSymbol
          ],
        },
      },
    },
    waitConfirmations: 10,
  });

  console.log("TokenERC20 deployed at: ", tokenERC20.address);

  const tokenERC20Deployed = await ethers.getContractAt(
    "TokenERC20",
    tokenERC20.address
  );
  
  
  await delay(5000);
  await run("verify:verify", {
    address: tokenERC20Deployed.address,
    constructorArguments: [
      _tokenName,
      _tokenSymbol
    ],
    contract: "contracts/TokenERC20.sol:TokenERC20",
  });
  
};

deploy.tags = ["TokenERC20"];
export default deploy;