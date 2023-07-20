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
      const name = await tokenContract.name();
      const symbol = await tokenContract.symbol();

      expect(name).to.equal("Eludius18 Token");
      expect(symbol).to.equal("ETR");
    });

    it("should allow only the owner to pause and unpause the contract", async () => {
      await tokenContract.connect(owner).pause();
      expect(await tokenContract.paused()).to.equal(true);

      await tokenContract.connect(owner).unpause();
      expect(await tokenContract.paused()).to.equal(false);
    });

    it("should allow only the owner to mint tokens", async () => {
      const initialSupply = await tokenContract.totalSupply();
      await tokenContract.connect(owner).mint(await alice.getAddress(), 100);
      const aliceBalance = await tokenContract.balanceOf(await alice.getAddress());

      expect(await tokenContract.totalSupply()).to.equal(initialSupply.add(100));
    });

    it("should allow token transfer between accounts", async () => {
      const initialAliceBalance = await tokenContract.balanceOf(await alice.getAddress());
      const initialBobBalance = await tokenContract.balanceOf(await bob.getAddress());

      await tokenContract.connect(alice).transfer(await bob.getAddress(), 50);

      const finalAliceBalance = await tokenContract.balanceOf(await alice.getAddress());
      const finalBobBalance = await tokenContract.balanceOf(await bob.getAddress());

      expect(finalAliceBalance).to.equal(initialAliceBalance.sub(50));
      expect(finalBobBalance).to.equal(initialBobBalance.add(50));
    });

    it("should allow token approval and transferFrom", async () => {
      const initialAliceBalance = await tokenContract.balanceOf(await alice.getAddress());
      const initialBobBalance = await tokenContract.balanceOf(await bob.getAddress());

      // Alice approves Bob to spend 30 tokens on her behalf
      await tokenContract.connect(alice).approve(await bob.getAddress(), 30);

      // Bob transfers 30 tokens from Alice's account to his own account using transferFrom
      await tokenContract.connect(bob).transferFrom(await alice.getAddress(), await bob.getAddress(), 30);

      const finalAliceBalance = await tokenContract.balanceOf(await alice.getAddress());
      const finalBobBalance = await tokenContract.balanceOf(await bob.getAddress());

      expect(finalAliceBalance).to.equal(initialAliceBalance.sub(30));
      expect(finalBobBalance).to.equal(initialBobBalance.add(30));
    });

    it("should allow token burning", async () => {
      const initialAliceBalance = await tokenContract.balanceOf(await alice.getAddress());
    
      // Burn 30 tokens from Alice's account
      await tokenContract.connect(alice).burn(await alice.getAddress(), 30);
    
      const finalAliceBalance = await tokenContract.balanceOf(await alice.getAddress());
    
      expect(finalAliceBalance).to.equal(initialAliceBalance.sub(30));
    });    
  });
});
