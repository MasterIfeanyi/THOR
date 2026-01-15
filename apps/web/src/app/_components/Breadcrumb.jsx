'use client';

import { usePathname } from 'next/navigation';
import { getBreadcrumbForPath } from '@/lib/navigation';
import { MdChevronRight } from 'react-icons/md';
import Link from 'next/link';

export default function Breadcrumb({tree}) {
  const pathname = usePathname();
  const breadcrumb = getBreadcrumbForPath(pathname, tree);

  if (!breadcrumb || breadcrumb.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 text-xs sm:text-sm mb-6">
        {breadcrumb.map((crumb, index) => {
           const isLast = index === breadcrumb.length - 1;
           
            return (
                <div key={index} className="flex items-center gap-2">
                    {isLast ? (
                        <span className="font-semibold text-foreground">
                            {crumb.label}
                        </span>
                        ) : (
                        <Link 
                            href={crumb.href}
                            className="font-semibold text-primary hover:text-accent-foreground transition-colors"
                        >
                            {crumb.label}
                        </Link>
                    )}

                    {!isLast && (
                        <MdChevronRight className="text-muted-foreground" size={18} />
                    )}
                </div>
            )
        })}
    </div>
  )
    
}