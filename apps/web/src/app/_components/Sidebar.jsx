"use client"
import Link from 'next/link'
import React, {useState, useRef} from 'react'
import { usePathname } from 'next/navigation';


const Sidebar = ({ tree }) => {

  const pathname = usePathname();
  
  // Recursive component to render tree
  const renderTree = (nodes) => {
    return nodes.map((node) => {
      if (node.type === 'folder') {
        return (
          <div key={node.name} className="mb-2">
            <div className="font-semibold text-muted-foreground uppercase text-xs px-3 tracking-widest mb-2">
              {node.name}
            </div>
            <div className="ml-2">
              {renderTree(node.children)}
            </div>
          </div>
        );
      }

      // File node
      const isActive = pathname === node.route;
      
      return (
        <Link
          key={node.route}
          href={node.route}
          className={`block px-3 py-2 rounded-md text-sm transition-colors  ${
            isActive
              ? 'bg-accent text-primary font-medium'
              : 'hover:bg-gray-100 text-muted-foreground hover:text-foreground'
          }`}
        >
          {node.name}
        </Link>
      );
    })
  }

  
  if (!tree || tree.length === 0) {
    return (
      <aside className="w-56 bg-muted border-r border-border overflow-y-auto py-6 px-4">
        <div className="text-red-500">No tree data available</div>
        <div className="text-sm text-gray-500">Check your getDocsTree function</div>
      </aside>
    );
  }

  return (
    <aside className="bg-muted border-r border-border overflow-y-auto py-6 px-4"
    >
      <nav>
        {renderTree(tree)}
      </nav>
    </aside>
  )
}

export default Sidebar