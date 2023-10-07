import Editor from '@/components/Editor';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';

const getEntry = async (entryId: string) => {
  const user = await getUserByClerkId(); // ensure entry belongs to user

  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        id: entryId,
        userId: user.id,
      },
    },
    include: {
      analysis: true,
    },
  });

  return entry;
};

const EntryPage = async ({ params }) => {
  const entry = await getEntry(params.id);

  return (
    <div className="h-full w-full ">
      <Editor entry={entry} />
    </div>
  );
};

export default EntryPage;
