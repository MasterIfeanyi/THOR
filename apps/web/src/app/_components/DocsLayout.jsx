"use client"
import React from 'react'
import Sidebar from './Sidebar.jsx'
import Breadcrumb from './Breadcrumb';
import Navbar from './Navbar.jsx';

const DocsLayout = ({children, tree}) => {

  return (
    <>
      <Navbar />
      <div className="flex h-screen bg-background">
        <Sidebar tree={tree} />
        <main className="flex-1 overflow-y-auto px-12 py-8">
          <Breadcrumb tree={tree} />
          {children}
        </main>
      </div>
    </>
  )
}

export default DocsLayout