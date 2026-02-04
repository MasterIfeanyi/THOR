"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Mail,
  Github,
  LogOut,
  User as UserIcon,
  Settings,
  Shield,
  ArrowLeft,
  Crown,
} from "lucide-react";
import { useEffect, useState } from "react";

// Utility function to mask user ID for privacy
function maskUserId(userId) {
  if (!userId) return "";
  if (userId.length <= 8) return userId; // Don't mask short IDs

  const firstPart = userId.slice(0, 4);
  const lastPart = userId.slice(-4);
  const middleLength = userId.length - 8;
  const asterisks = "*".repeat(Math.min(middleLength, 12)); // Limit asterisks to 12

  return `${firstPart}${asterisks}${lastPart}`;
}

// Project owner email
const PROJECT_OWNER_EMAIL = "chimaifeanyi29@gmail.com";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarVisible, setSidebarVisible] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/home");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <div className="flex flex-col gap-3 items-center">
          <div className="w-12 h-12 rounded-full border-4 animate-spin border-primary border-t-transparent"></div>
          <p className="text-lg font-medium text-muted-foreground">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const user = session.user;
  const isProjectOwner = user.email === PROJECT_OWNER_EMAIL;

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/home" });
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Back Navigation */}
      <div className="px-4 pt-8 mx-auto max-w-6xl sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <button
            onClick={() => router.push("/getting-started")}
            className="flex gap-2 items-center px-3 py-2 rounded-lg transition-all text-muted-foreground hover:text-foreground hover:bg-muted/50 group"
          >
            <ArrowLeft
              size={20}
              className="transition-transform group-hover:-translate-x-1"
            />
            <span className="font-medium">Back to Docs</span>
          </button>

          {/* Sidebar Toggle Button */}
          <button
            onClick={toggleSidebar}
            className="hidden gap-2 items-center px-4 py-2 text-sm font-medium rounded-lg border transition-all lg:flex border-border hover:bg-accent hover:text-accent-foreground shadow-sm hover:shadow"
            aria-label={sidebarVisible ? "Hide sidebar" : "Show sidebar"}
          >
            <Settings size={18} />
            <span>{sidebarVisible ? "Hide" : "Show"} Sidebar</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-8 pb-16 mx-auto max-w-6xl sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 gap-6 transition-all duration-300 ${
            sidebarVisible ? "lg:grid-cols-3" : "lg:grid-cols-1"
          }`}
        >
          {/* Left Column - Profile Card */}
          <div className="space-y-6 lg:col-span-2">
            {/* Profile Header Card */}
            <div className="overflow-hidden rounded-2xl border shadow-lg transition-all duration-300 bg-card border-border hover:shadow-xl bg-transparent">
              {/* Gradient Header */}
              <div className="overflow-hidden relative h-40 bg-gradient-to-br from-primary via-primary/90 to-primary/70">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHkuei4xIi8+PC9nPjwvc3ZnPg==')] opacity-30"></div>
              </div>

              {/* Profile Content */}
              <div className="relative px-6 pb-8 sm:px-8">
                {/* Avatar */}
                <div className="flex flex-col gap-6 items-center -mt-20 sm:flex-row sm:items-start">
                  <div className="relative group">
                    <div className="overflow-hidden w-32 h-32 rounded-2xl shadow-xl transition-all duration-300 transform border-background bg-card group-hover:scale-105 group-hover:shadow-2xl">
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt={user.name || "User"}
                          width={128}
                          height={128}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="flex justify-center items-center w-full h-full bg-gradient-to-br from-primary/20 to-primary/10">
                          <UserIcon size={56} className="text-primary" />
                        </div>
                      )}
                    </div>
                    <div className="flex absolute -right-2 -bottom-2 justify-center items-center w-10 h-10 rounded-full shadow-lg bg-primary border-background">
                      <Github size={20} className="text-primary-foreground" />
                    </div>
                  </div>

                  <div className="flex-1 mt-4 text-center sm:text-left sm:mt-8">
                    <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                      {user.name || "Guest User"}
                    </h1>
                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                      {isProjectOwner ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500/20 via-amber-500/15 to-orange-500/20 text-amber-700 dark:text-amber-300 rounded-lg text-sm font-semibold border border-amber-500/40 shadow-md backdrop-blur-sm">
                          <Crown size={14} className="fill-current" />
                          Project Owner & Support
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/15 text-primary rounded-lg text-sm font-semibold border border-primary/30 shadow-sm backdrop-blur-sm">
                          <Shield size={14} />
                          {user.role || "Member"}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/70 text-accent-foreground rounded-lg text-sm font-medium border border-accent/50 shadow-sm">
                        <Github size={14} />
                        GitHub Account
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-col gap-3 mt-8 sm:flex-row">
                  <button
                    onClick={() => router.push("/getting-started")}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Settings size={20} />
                    Browse Documentation
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 px-6 py-3.5 bg-destructive/15 text-destructive border-2 border-destructive/30 rounded-xl font-semibold hover:bg-destructive hover:text-destructive-foreground transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <LogOut size={20} />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>

            {/* Account Information Card */}
            <div className="p-6 rounded-2xl border shadow-lg transition-all duration-300  border-border sm:p-8 hover:shadow-xl bg-transparent">
              <div className="flex gap-3 items-center mb-6">
                <div className="flex justify-center items-center w-10 h-10 rounded-xl bg-primary/15 shadow-sm">
                  <UserIcon size={20} className="text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  Account Information
                </h2>
              </div>

              <div className="space-y-4">
                {/* Email */}
                <div className="flex gap-4 items-start p-4 rounded-xl transition-all bg-muted/40 hover:bg-muted/60 border border-transparent hover:border-border/50">
                  <div className="flex flex-shrink-0 justify-center items-center w-10 h-10 rounded-lg bg-background shadow-sm">
                    <Mail size={18} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="mb-1 text-sm font-medium text-muted-foreground">
                      Email Address
                    </p>
                    <p className="text-base font-semibold break-all text-foreground">
                      {user.email || "Not provided"}
                    </p>
                  </div>
                </div>

                {/* User ID */}
                {user.id && (
                  <div className="flex gap-4 items-start p-4 rounded-xl transition-all bg-muted/40 hover:bg-muted/60 border border-transparent hover:border-border/50">
                    <div className="flex flex-shrink-0 justify-center items-center w-10 h-10 rounded-lg bg-background shadow-sm">
                      <Shield size={18} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="mb-1 text-sm font-medium text-muted-foreground">
                        User ID
                      </p>
                      <p className="inline-block px-3 py-2 font-mono text-sm font-semibold break-all rounded-lg text-foreground bg-background border border-border shadow-sm">
                        {maskUserId(user.id)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          {sidebarVisible && (
            <div className="space-y-6 lg:animate-slideInRight">
              {/* Account Status */}
              <div className="p-6 rounded-2xl border shadow-lg transition-all duration-300 bg-transparent border-border hover:shadow-xl">
                <h3 className="flex gap-2 items-center mb-4 text-lg font-bold text-foreground">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-sm shadow-green-500/50"></div>
                  Account Status
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-muted-foreground">
                      Status
                    </span>
                    <span className="text-sm font-semibold text-green-600 dark:text-green-400 bg-green-500/10 px-2.5 py-1 rounded-md">
                      Active
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-t border-border/50">
                    <span className="text-sm text-muted-foreground">Plan</span>
                    <span className="text-sm font-semibold text-foreground bg-muted/50 px-2.5 py-1 rounded-md">
                      Free
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-t border-border/50">
                    <span className="text-sm text-muted-foreground">
                      Member Since
                    </span>
                    <span className="text-sm font-semibold text-foreground bg-muted/50 px-2.5 py-1 rounded-md">
                      {new Date().toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="p-6 rounded-2xl border shadow-lg transition-all duration-300 bg-transparent border-border hover:shadow-xl">
                <h3 className="mb-4 text-lg font-bold text-foreground">
                  Quick Links
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => router.push("/community")}
                    className="flex justify-between items-center px-4 py-3 w-full text-sm font-medium text-left rounded-xl transition-all hover:bg-muted/60 text-foreground group border border-transparent hover:border-border/50"
                  >
                    <span>Community</span>
                    <ArrowLeft
                      size={16}
                      className="opacity-0 transition-all rotate-180 group-hover:opacity-100 group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </div>

              {/* Help Card */}
              <div className="p-6 bg-gradient-to-br rounded-2xl border shadow-lg from-primary/15 via-primary/10 to-primary/5 border-primary/30">
                <div className="flex justify-center items-center mb-4 w-12 h-12 rounded-xl bg-primary/25 shadow-sm">
                  <Settings size={24} className="text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-foreground">
                  Need Help?
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  Check out our documentation or reach out to the community for
                  support.
                </p>
                <button
                  onClick={() => router.push("/getting-started")}
                  className="w-full px-4 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all duration-200 text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  View Documentation
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
