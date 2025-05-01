import React, { useState } from "react";
import { IconBuildingBank } from "@tabler/icons-react";

const ReimburseOrganization = () => {
  const [reimburseAmount, setReimburseAmount] = useState("");

  const handleApprove = () => {
    // Logic to approve tokens before reimbursement
    console.log("Approving tokens for reimbursement...");
  };

  const handleReimburse = () => {
    // Logic to call reimburseOrganization()
    console.log("Reimbursing organization with:", reimburseAmount);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-[hsl(var(--card))] p-8 rounded-xl border border-[hsl(var(--border))] shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-[hsl(var(--foreground))] flex items-center gap-2">
        <IconBuildingBank size={24} />
        Reimburse Organization
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-[hsl(var(--muted-text))] mb-1">
            Fund Amount
          </label>
          <input
            type="number"
            value={reimburseAmount}
            onChange={(e) => setReimburseAmount(e.target.value)}
            placeholder="Enter amount to reimburse"
            className="w-full px-4 py-2 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--input))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-text))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)/0.4)]"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            onClick={handleApprove}
            className="bg-[hsl(var(--primary))] text-white px-4 py-2 rounded-md hover:bg-[hsl(var(--primary)/0.9)] transition"
          >
            Approve Tokens
          </button>

          <button
            onClick={handleReimburse}
            className="border border-[hsl(var(--primary))] text-[hsl(var(--primary))] px-4 py-2 rounded-md hover:bg-[hsl(var(--primary)/0.05)] transition"
          >
            Reimburse
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReimburseOrganization;
