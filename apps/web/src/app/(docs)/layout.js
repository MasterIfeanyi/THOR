import DocsLayout from "@/app/_components/DocsLayout";
import { getDocsTree } from "@/lib/docs";

export default async function DocsServerLayout({ children }) {
  const tree = await getDocsTree();

  return <DocsLayout tree={tree}>{children}</DocsLayout>;
}
