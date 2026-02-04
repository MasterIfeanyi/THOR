"use client";
import Link from "next/link";
import React, { useState, useRef } from "react";
import { usePathname } from "next/navigation";

const Sidebar = ({ tree }) => {
  const pathname = usePathname();

  // Recursive component to render tree
  const renderTree = (nodes) => {
    return nodes.map((node) => {
      if (node.type === "folder") {
        return (
          <div key={node.name} className="mb-2">
            <div className="px-3 mb-2 text-xs font-semibold tracking-widest uppercase text-muted-foreground">
              {node.name}
            </div>
            <div className="ml-2">{renderTree(node.children)}</div>
          </div>
        );
      }

      // File node
      const isActive = pathname === node.route;

      return (
        <Link
          key={node.route}
          href={node.route}
          className={`block px-3 py-2 rounded-md text-sm transition-all border-b-2 border-t-2 hover:border-t-cyan-600 ${
            isActive
              ? "font-semibold bg-primary/10 text-primary border-primary"
              : "border-transparent hover:border-primary/50 hover:bg-muted/80 text-foreground/80 hover:text-foreground"
          }`}
        >
          {node.name}
        </Link>
      );
    });
  };

  if (!tree || tree.length === 0) {
    return (
      <aside className="overflow-y-auto px-4 py-6 w-56 border-r bg-muted border-border">
        <div className="text-red-500">No tree data available</div>
        <div className="text-sm text-gray-500">
          Check your getDocsTree function
        </div>
      </aside>
    );
  }

  return (
    <aside className="overflow-y-auto px-4 py-6 border-r bg-muted border-border">
      <nav>{renderTree(tree)}</nav>
    </aside>
  );
};

export default Sidebar;
