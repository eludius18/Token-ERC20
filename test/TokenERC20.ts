import { deployments, ethers, waffle } from "hardhat";
import { Signer } from "ethers";
import { TokenERC20 } from "../../typechain-types/contracts";
import { Deployment } from "hardhat-deploy/dist/types";
import { expect } from "chai";

describe("TokenERC20 Test", async function () {
  let accounts: Signer[];
  let tokenDeployment: Deployment;
  let tokenContract: TokenERC20;
  let owner: Signer;
  let alice: Signer;
  let bob: Signer;

  before(async function () {
    accounts = await ethers.getSigners();
    owner = accounts[0];
    alice = accounts[1];
    bob = accounts[2];

    tokenDeployment = await deployments.get("TokenERC20");
    tokenContract = await ethers.getContractAt(
      "TokenERC20",
      tokenDeployment.address
    );
  });

  describe("Variables Checks", () => {
    it("should initialize with the correct name and symbol", async () => {
    });

    it("should allow only the owner to pause and unpause the contract", async () => {
    });

    it("should allow only the owner to mint tokens", async () => {
    });

    it("should allow token transfer between accounts", async () => {
    });

    it("should allow token approval and transferFrom", async () => {
    });

    it("should allow token burning", async () => {
    });    
  });
});
