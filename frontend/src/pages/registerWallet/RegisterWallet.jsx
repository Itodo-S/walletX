import React, { useState, useEffect } from "react";
import { IconCheck, IconWallet } from "@tabler/icons-react";
import useRegisterWallet from "../../hooks/useRegisterWallet";

const RegisterWallet = () => {
  // const [walletName, setWalletName] = useState("");
  // const [fundAmount, setFundAmount] = useState("");
  const handleRegisterWallet = useRegisterWallet();
  const [ wallet, setWallet ] = useState({
    walletName: "",
    fundAmount: 0
  })

  const handleInputChange = (name, e) => {
    console.log(e.target.name)
    setWallet((preState) => ({ ...preState, [name]:  e.target.value}));
  }

  const { walletName, fundAmount } = wallet;

  useEffect(()=>{
    console.log(wallet)
   }
      
   ,[wallet])



  // const handleApprove = () => {
  //   // call approve() logic here
  //   console.log("Approving tokens for escrow...");
  // };

  // const handleRegister = () => {
  //   // call registerWallet() logic here
  //   console.log("Registering wallet with:", walletName, fundAmount);
  // };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-[hsl(var(--card))] p-8 rounded-xl border border-[hsl(var(--border))] shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-[hsl(var(--foreground))] flex items-center gap-2">
        <IconWallet size={24} />
        Register Wallet
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-[hsl(var(--muted-text))] mb-1">
            Wallet Name
          </label>
          <input
            type="text"
            value={walletName}
            onChange={(e) => handleInputChange("walletName", e)}
            placeholder="Enter wallet name"
            className="w-full px-4 py-2 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--input))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-text))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)/0.4)]"
          />
        </div>

        <div>
          <label className="block text-sm text-[hsl(var(--muted-text))] mb-1">
            Fund Amount
          </label>
          <input
            type="number"
            value={fundAmount}
            onChange={(e) => handleInputChange("fundAmount", e)}
            placeholder="Enter amount to fund"
            className="w-full px-4 py-2 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--input))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-text))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)/0.4)]"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            className="bg-[hsl(var(--primary))] text-white px-4 py-2 rounded-md hover:bg-[hsl(var(--primary)/0.9)] transition"
          >
            Approve Tokens
          </button>

          <button
    
            className="border border-[hsl(var(--primary))] text-[hsl(var(--primary))] px-4 py-2 rounded-md hover:bg-[hsl(var(--primary)/0.05)] transition"
            onClick={(e) => {
              e.preventDefault()
              console.log(walletName, fundAmount)
              handleRegisterWallet(
                walletName,
                fundAmount
              )
            }}
          >
            Register Wallet
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterWallet;
