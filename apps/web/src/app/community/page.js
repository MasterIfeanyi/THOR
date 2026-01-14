import contributors from '@/data/contributors.json';
import ContributorsWheel from '@/app/_components/ContributorsWheel';

export const metadata = {
  title: 'Community - THOR',
  description: 'Meet our amazing contributors',
};

export default function CommunityPage() {
  return <ContributorsWheel contributors={contributors} />;
}