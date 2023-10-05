import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';

//todo add type for children
const DashboardLayout = ({ children }) => {
  const nav = [
    { href: '/', label: 'Home' },
    { href: '/journal', label: 'Journal' },
    { href: '/history', label: 'History' },
  ];

  return (
    //* full page
    <div className="h-screen w-screen relative">
      {/* //* left nav bar */}
      <aside className="absolute top-0 left-0 h-full w-[200px] border-r border-black/10">
        <div className="px-4 my-4">
          <span className="text-3xl">Mood</span>
        </div>
        <ul className="flex flex-col px-4">
          {nav.map((link) => (
            <li key={link.href} className="text-xl px-2 py-2 cursor-pointer">
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* //* right app */}
      <div className="ml-[200px] h-full">
        {/* //* top nav */}
        <header className="h-[60px] border-b border-black/10 ">
          <div className="h-full w-full px-6 flex justify-end items-center">
            <UserButton />
          </div>
        </header>
        {/* //* journal area */}
        <div className="h-[calc(100vh-60px)]">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
