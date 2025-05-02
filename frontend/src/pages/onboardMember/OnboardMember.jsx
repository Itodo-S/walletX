import React, { useState } from "react";
import { IconCheck, IconUserPlus, IconLoader } from "@tabler/icons-react";
import useOnboardMember from "../../hooks/useOnboardMember";

const OnboardMember = () => {
  const handleOnboardMember = useOnboardMember();
  const [member, setMember] = useState({
    memberAddress: "",
    memberName: "",
    fundAmount: 0,
    memberIdentifier: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (name, e) => {
    setMember((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const { memberAddress, memberName, fundAmount, memberIdentifier } = member;

  const handleOnboardClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await handleOnboardMember(
        memberAddress,
        memberName,
        fundAmount,
        memberIdentifier
      );
      setIsLoading(false);
    } catch (error) {
      console.error("Error onboarding member:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-[hsl(var(--card))] p-8 rounded-xl border border-[hsl(var(--border))] shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-[hsl(var(--foreground))] flex items-center gap-2">
        <IconUserPlus size={24} />
        Onboard Member
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-[hsl(var(--muted-text))] mb-1">
            Member Address
          </label>
          <input
            type="text"
            value={memberAddress}
            onChange={(e) => handleInputChange("memberAddress", e)}
            placeholder="Enter member address"
            className="w-full px-4 py-2 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--input))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-text))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)/0.4)]"
          />
        </div>

        <div>
          <label className="block text-sm text-[hsl(var(--muted-text))] mb-1">
            Member Name
          </label>
          <input
            type="text"
            value={memberName}
            onChange={(e) => handleInputChange("memberName", e)}
            placeholder="Enter member name"
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

        <div>
          <label className="block text-sm text-[hsl(var(--muted-text))] mb-1">
            Member Identifier
          </label>
          <input
            type="text"
            value={memberIdentifier}
            onChange={(e) => handleInputChange("memberIdentifier", e)}
            placeholder="Enter member identifier"
            className="w-full px-4 py-2 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--input))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-text))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)/0.4)]"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            className="border border-[hsl(var(--primary))] text-[hsl(var(--primary))] px-4 py-2 rounded-md hover:bg-[hsl(var(--primary)/0.05)] transition disabled:opacity-50 flex items-center gap-2"
            onClick={handleOnboardClick}
            disabled={isLoading}
          >
            {isLoading && <IconLoader size={18} className="animate-spin" />}
            {isLoading ? "Onboarding..." : "Onboard Member"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardMember;
