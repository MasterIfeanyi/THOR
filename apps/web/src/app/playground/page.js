import MarkdownPlayground from '@/app/_components/MarkdownPlayground';
import NavbarLayout from '../_components/NavbarLayout';


export const metadata = {
  title: "Markdown Playground | THOR",
  description: "Interactive markdown editor and preview",
};

export default function PlaygroundPage() {
  return (
    <NavbarLayout>
        <MarkdownPlayground />
    </NavbarLayout>
  );
}