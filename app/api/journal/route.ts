import { analyzeEntry } from '@/utils/ai';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const POST = async () => {
  const user = await getUserByClerkId();
  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: 'Write about your day!',
    },
  });

  //todo - move to PATCH?

  const analysis = await analyzeEntry(entry.content);
  console.log('🚀 ~ file: route.ts:19 ~ POST ~ analysis:', analysis);

  await prisma.analysis.create({
    data: {
      entryID: entry.id,
      ...analysis,
    },
  });

  await revalidatePath('/journal');

  return NextResponse.json({ data: entry });
};
