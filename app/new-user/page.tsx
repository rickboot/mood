import { prisma } from '@/utils/db';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const createNewUser = async () => {
  // logged-in clerk user
  const user = await currentUser();

  // check if clerk user is in db
  const match = await prisma.user.findUnique({
    where: {
      clerkId: user?.id as string,
    },
  });

  // if not, add them
  if (!match) {
    const result = await prisma.user.create({
      data: {
        clerkId: user?.id as string,
        email: user?.emailAddresses[0].emailAddress as string,
      },
    });
  }
  redirect('/journal');
};

const NewUser = async () => {
  await createNewUser();
  return <div>...loading</div>; // alt create next-style loading page in folder
};

export default NewUser;
