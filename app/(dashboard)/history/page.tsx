import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import HistoryChart from '@/components/HistoryChart';

const getData = async () => {
  const user = await getUserByClerkId();

  const analyses = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      updatedAt: 'asc',
    },
  });

  const total = analyses.reduce((acc, current) => {
    return acc + current.sentimentScore;
  }, 0);

  // const averageSentiment = Math.round(total / analyses.length);
  const averageSentiment = total / analyses.length;

  return { averageSentiment, analyses };
};

const History = async () => {
  const { averageSentiment, analyses } = await getData();

  return (
    <div className="h-full w-full">
      <div>Sentiment average: {averageSentiment.toFixed(1)}</div>
      <HistoryChart data={analyses} />
    </div>
  );
};
export default History;
