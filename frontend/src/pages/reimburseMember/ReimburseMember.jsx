import React, { useState, useCallback, useEffect } from "react";
import { IconUserDollar } from "@tabler/icons-react";
import useContract from "../../hooks/useContract";

const ReimburseMember = () => {
  const [selectedMember, setSelectedMember] = useState("");
  const [amount, setAmount] = useState("");

  const readOnlyOnboardContract = useContract(true);
  const [members, setMembers] = useState([]);

  console.log({ members });

  const fetchMembers = useCallback(async () => {
    if (!readOnlyOnboardContract) return;
    console.log("provider: ", readOnlyOnboardContract.runner);

    try {
      const data = await readOnlyOnboardContract.getMembers();
      const result = await data.toArray();

      // Parse the result to extract member details
      const parsedMembers = result.map((member) => ({
        id: member[0], // Assuming the first element is the member ID/address
        name: member[2], // Assuming the third element is the member name
      }));

      setMembers(parsedMembers);

      console.log("Parsed members:", parsedMembers);
    } catch (error) {
      console.log("error fetching employees: ", error);
    }
  }, [readOnlyOnboardContract]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  return (
    <div className="max-w-xl mx-auto mt-10 bg-[hsl(var(--card))] p-8 rounded-xl border border-[hsl(var(--border))] shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-[hsl(var(--foreground))] flex items-center gap-2">
        <IconUserDollar size={24} />
        Reimburse Member
      </h2>

      <div className="space-y-4">
        {/* Member Dropdown */}
        <div>
          <label className="block text-sm text-[hsl(var(--muted-text))] mb-1">
            Select Member
          </label>
          <select
            value={selectedMember}
            onChange={(e) => setSelectedMember(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--input))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-text))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)/0.4)] appearance-none"
          >
            <option
              value=""
              disabled
              className="bg-[hsl(var(--input))] text-[hsl(var(--muted-text))]"
            >
              -- Select Member --
            </option>
            {members.map((member) => (
              <option
                key={member.id}
                value={member.id}
                className="bg-[hsl(var(--input))] text-[hsl(var(--foreground))]"
              >
                {member.name} ({member.id})
              </option>
            ))}
          </select>
        </div>

        {/* Amount Input */}
        <div>
          <label className="block text-sm text-[hsl(var(--muted-text))] mb-1">
            Fund Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter reimbursement amount"
            className="w-full px-4 py-2 rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--input))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-text))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)/0.4)]"
          />
        </div>

        {/* Reimburse Button */}
        <div className="pt-4">
          {/* <button
            onClick={handleReimburse}
            className="bg-[hsl(var(--primary))] text-white px-4 py-2 rounded-md hover:bg-[hsl(var(--primary)/0.9)] transition"
            disabled={!selectedMember || !amount}
          >
            Reimburse
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ReimburseMember;
