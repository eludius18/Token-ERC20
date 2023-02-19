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
  const miniumPayment = 0;
  const selectWinnerOwner = deployer;

const _tokenName = "Eludius18 Token";
const _tokenSymbol = "ETR";

  const tokenerc20 = await deploy("TokenERC20", {
    from: deployer,
    args: [],
    log: true,
    proxy: {
      proxyContract: "OpenZeppelinTransparentProxy",
      execute: {
        init: {
          methodName: "initialize",
          args: [
            miniumPayment,
            selectWinnerOwner
          ],
        },
      },
    },
    waitConfirmations: 10,
  });

  console.log("TokenERC20 deployed at: ", tokenerc20.address);
  await delay(5000);
  const tokenerc20Impl = await deployments.get("TokenERC20_Implementation");
  
  
  await run("verify:verify", {
    address: tokenerc20Impl.address,
    contract: "contracts/TokenERC20.sol:TokenERC20",
  });
  
};

deploy.tags = ["TokenERC20"];
export default deploy;