"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation';
// import { navigationItems } from '@/lib/navigation';
import { getDocsTree } from "@/lib/docs";

const Sidebar = () => {

  const pathname = usePathname();

  const tree = getDocsTree();

  // Recursive component to render tree
  const TreeItem = ({ item, pathname, level = 0 }) => {
    if (item.type === 'folder') {
      
      return (
        <div key={item.name} className={`ml-${level * 4}`}>
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2 mt-6">
            {item.name}
          </div>
          <div className="ml-4">
            {item.children.map((child) => (
              <TreeItem 
                key={child.name || child.path} 
                item={child} 
                pathname={pathname} 
                level={level + 1}
              />
            ))}
          </div>
        </div>
      );
    }
  }

  return (
    
    <aside className="w-56 bg-muted border-r border-border overflow-y-auto py-6 px-4">
      <nav>
        {tree.map((item) => (
          <div key={item.name}>
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2 mt-6">
              {item.name}
            </div>
            {item.children.map((child) => {
              // const isActive = pathname === item.href;
              return (
                <Link
                  key={child.name}
                  href={`/docs/${item.name}/${child.name}`}
                  className={`block px-3 py-2 rounded transition-colors ${
                    isActive
                      ? 'border-l-primary text-foreground font-semibold'
                      : 'border-l-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {child.label}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar