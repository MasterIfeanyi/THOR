"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import Breadcrumb from "./Breadcrumb";
import NavbarLayout from "./NavbarLayout.jsx";
import Comment from "./Comment";
import Button from "@/components/Button";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

const DocsLayout = ({ children, tree }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

const DocsLayout = ({ children, tree }) => {
  return (
    <>
      <NavbarLayout />
      <div className="flex h-screen bg-background">
        {/* Sidebar with conditional rendering */}
        {sidebarVisible && <Sidebar tree={tree} className="col-resize" />}

        <main className="overflow-y-auto relative flex-1 px-12 py-8">
          {/* Sidebar Toggle Button */}
          <Button
            onClick={toggleSidebar}
            variant="other"
            size="small"
            className="fixed top-0 left-4 z-50 rounded-xl border-2 border-gray-300 shadow-md cursor-pointer hover:text-black"
            icon={
              sidebarVisible ? (
                <PanelLeftClose size={18} />
              ) : (
                <PanelLeftOpen size={18} />
              )
            }
          >
            {sidebarVisible ? "Hide" : "Show"}
          </Button>

          <Breadcrumb tree={tree} />
          {children}
          <Comment />
        </main>
      </div>
    </>
  );
};

export default DocsLayout;
