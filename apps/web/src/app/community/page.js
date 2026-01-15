import ContributorsWheel from '@/app/_components/ContributorsWheel';
import NavbarLayout from '../_components/NavbarLayout';

export const metadata = {
  title: 'Community - THOR',
  description: 'Meet our amazing contributors',
};

// Fetch real contributors from GitHub API
async function getContributors() {
  try {
    const response = await fetch(
      'https://api.github.com/repos/MasterIfeanyi/THOR/contributors',
      {
        headers: { 'Accept': 'application/vnd.github.v3+json' },
        next: { revalidate: 3600 }
      }
    );
    
    if (!response.ok) return [];
    const data = await response.json();
    
    return data.map(contributor => ({
      name: contributor.login,
      github: contributor.login,
      avatar: contributor.avatar_url,
      contributions: contributor.contributions,
      profileUrl: contributor.html_url
    }));
  } catch (error) {
    return [];
  }
}

export default async function CommunityPage() {

  const contributors = await getContributors();

  return (
    <NavbarLayout>
      <ContributorsWheel contributors={contributors} />
    </NavbarLayout>
  );
}

