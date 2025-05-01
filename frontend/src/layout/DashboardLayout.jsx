import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  IconHome,
  IconPlus,
  IconUsers,
  IconUsersGroup,
  IconWallet,
  IconLogout,
  IconSun,
  IconMoon,
} from "@tabler/icons-react";

const navItems = [
  { name: "Dashboard", icon: <IconHome size={20} />, href: "/dashboard" },
  {
    name: "Register Wallet",
    icon: <IconWallet size={20} />,
    href: "/dashboard/register-wallet",
  },
  {
    name: "Onboard Member",
    icon: <IconUsers size={20} />,
    href: "/dashboard/onboard-member",
  },
  {
    name: "Reimburse Org",
    icon: <IconPlus size={20} />,
    href: "/dashboard/reimburse-org",
  },
  {
    name: "Reimburse Member",
    icon: <IconUsersGroup size={20} />,
    href: "/dashboard/reimburse-member",
  },
];

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // Example address - replace this with real wallet connection logic
  useEffect(() => {
    const fetchWallet = async () => {
      const fakeAddress = "0x1234...ABCD";
      setWalletAddress(fakeAddress);
    };
    fetchWallet();
  }, []);

  return (
    <div className="flex h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-[hsl(var(--card))] border-r border-[hsl(var(--border))] p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-8">XWallet</h1>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <div
                  key={item.name}
                  onClick={() => navigate(item.href)}
                  className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors ${
                    isActive
                      ? "bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]"
                      : "hover:bg-[hsl(var(--primary)/0.05)] text-[hsl(var(--muted-text))] hover:text-[hsl(var(--foreground))]"
                  }`}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
              );
            })}
          </nav>
        </div>
        <button className="flex items-center gap-2 text-[hsl(var(--error))] hover:text-[hsl(var(--error)/0.8)] transition">
          <IconLogout size={20} />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </aside>

      {/* Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="sticky top-10 w-[80%] h-[70px] m-auto mt-10 flex justify-between items-center px-8 py-4 border-b border-[hsl(var(--border))] bg-[hsl(var(--card))] rounded-[50px] z-10">
          <div className="text-sm text-[hsl(var(--muted-text))]">
            Connected:{" "}
            <span className="text-[hsl(var(--foreground))] font-medium">
              {walletAddress}
            </span>
          </div>
          <button
            onClick={() => setIsDarkMode((prev) => !prev)}
            className="text-[hsl(var(--muted-text))] hover:text-[hsl(var(--foreground))] transition"
            title="Toggle Theme"
          >
            {isDarkMode ? <IconSun size={20} /> : <IconMoon size={20} />}
          </button>
        </header>

        {/* Scrollable Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
