import { analyzeEntry } from '@/utils/ai';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const PATCH = async (request: Request, { params }) => {
  const { content } = await request.json();
  const user = await getUserByClerkId();

  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: content,
  });

  const analysis = await analyzeEntry(updatedEntry.content);

  const updatedAnalysis = await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry.id,
    },
    update: { ...analysis },
    create: {
      userId: user.id,
      entryId: updatedEntry.id,
      ...analysis,
    },
  });

  revalidatePath('/journal');

  return NextResponse.json({
    data: { ...updatedEntry, analysis: updatedAnalysis },
  });
};
