import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

//todo add type for children
const DashboardLayout = ({ children }) => {
  const nav = [
    { href: '/journal', label: 'Journal' },
    { href: '/history', label: 'History' },
  ];

  return (
    <div className="h-screen w-screen relative">
      <aside className="absolute top-0 left-0 h-full w-[200px] border-r border-black/10">
        <div className="px-4 my-4">
          <span className="text-3xl">Mood</span>
        </div>
        <ul className="flex flex-col px-4">
          {nav.map((link) => (
            <Link
              href={link.href}
              className="text-xl my-2 cursor-pointer"
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </ul>
      </aside>
      <div className="ml-[200px] h-full">
        <header className="h-[60px] border-b border-black/10">
          <div className="h-full w-full px-6 flex justify-end items-center">
            <UserButton />
          </div>
        </header>
        {/* height calc to avoid scroll */}
        <div className="h-[calc(100vh-60px)]">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
