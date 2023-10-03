import { auth } from '@clerk/nextjs';
import Link from 'next/link';

export default async function Home() {
  const { userId } = await auth();

  // if not user, then send to new-user to create clerk user AND add to db
  const href = userId ? '/journal' : '/new-user';

  return (
    <div className="w-screen h-screen bg-slate-800 text-white flex justify-center items-center">
      <div className="w-full max-w-[600px] mx-auto ">
        <h1 className="text-6xl mb-4">The best journal app. period.</h1>
        <p className="text-white/60 mb-4">
          This app will automatically track your moods via your journal entries.
        </p>
        <div>
          <Link href={href}>
            <button className="bg-blue-600 px-4 py-2 rounded-lg text-xl">
              get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
