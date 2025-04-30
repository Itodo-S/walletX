// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const tokenAddress = '0x56287dEFf620D68C28DF74401580013cB6Cd8F1A';

const LockModule = buildModule("LockModule", (m) => {

  const lock = m.contract("WalletX", [tokenAddress]);

  return { lock };
});

export default LockModule;
