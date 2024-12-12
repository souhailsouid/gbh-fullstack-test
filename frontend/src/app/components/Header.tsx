import Link from 'next/link';

export default function Header() {
  return (
    <header className="p-4 bg-gray-800 text-white">
      <nav className="container mx-auto flex justify-between">
        <Link href="/">
         Vehicle Showcase
        </Link>
      </nav>
    </header>
  );
}
