


// Helper function to get breadcrumb for a path
export function getBreadcrumbForPath(pathname, tree) {
  

  function walk(nodes, parents) {
    for (const node of nodes) {
      // Folder
      if (node.type === "folder") {
        const folderCrumb = {
          label: humanize(node.name),
          href: buildHref(parents, node.name),
        };

        const result = walk(
          node.children,
          parents.concat(folderCrumb)
        );

        if (result) return result;
      }

      // File
      if (node.type === "file" && node.route === pathname) {
        return parents.concat({
          label: humanize(node.name),
          href: node.route,
        });
      }
    }

    return null;
  }

  return walk(tree, []) || [];
}


function humanize(text) {
  return text
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function buildHref(parents, name) {
  if (parents.length === 0) {
    return `/${name}`;
  }
  return `${parents[parents.length - 1].href}/${name}`;
}
