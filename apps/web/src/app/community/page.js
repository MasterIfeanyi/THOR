import contributors from '@/data/contributors.json';
import ContributorsWheel from '@/app/_components/ContributorsWheel';

export const metadata = {
  title: 'Community - THOR',
  description: 'Meet our amazing contributors',
};

// import ContributorsClient from '@/app/_components/ContributorsClient';

// Fetch real contributors from GitHub API
async function getContributors() {
  try {
    const response = await fetch(
      'https://api.github.com/repos/yourusername/yourrepo/contributors',
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
  
//   return <ContributorsClient contributors={contributors} specialThanks={specialThanks} />;
  return <ContributorsWheel contributors={contributors} />;
}

// export default function CommunityPage() {
//   return <ContributorsWheel contributors={contributors} />;
// }