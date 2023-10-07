import { analyzeEntry } from '@/utils/ai';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const POST = async () => {
  const user = await getUserByClerkId();

  const entry = await prisma.journalEntry.create({
    data: {
      content: 'Write about your day!',
      user: {
        connect: {
          id: user.id,
        },
      },
      analysis: {
        create: {
          userId: user.id,
          mood: 'Neutral',
          subject: 'None',
          negative: false,
          summary: 'None',
          sentimentScore: 0,
          color: '#0101fe',
        },
      },
    },
  });

  await revalidatePath('/journal');

  return NextResponse.json({ data: entry });
};
