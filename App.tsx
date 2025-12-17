import React, { useState } from 'react';
import { Onboarding } from './components/Onboarding';
import { SwipeDeck } from './components/SwipeDeck';
import { Results } from './components/Results';
import { Project, UserProfile } from './types';
import { getRankedMatches } from './services/geminiService';
import { Loader2 } from 'lucide-react';

enum AppState {
  ONBOARDING,
  LOADING,
  SWIPING,
  RESULTS
}

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.ONBOARDING);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [matches, setMatches] = useState<Project[]>([]);
  const [likedProjects, setLikedProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleStartMatching = async (profile: UserProfile) => {
    setUserProfile(profile);
    setAppState(AppState.LOADING);
    setError(null);

    try {
      // AI Logic: Send profile
      const rankedMatches = await getRankedMatches(profile);
      setMatches(rankedMatches);
      setAppState(AppState.SWIPING);
    } catch (err: any) {
      console.error(err);
      setError(`Foutmelding: ${err.message || "Er ging iets mis"}.`);
      setAppState(AppState.ONBOARDING);
    }
  };

  const handleFinishedSwiping = (liked: Project[]) => {
    setLikedProjects(liked);
    setAppState(AppState.RESULTS);
  };

  const handleRestart = () => {
    setLikedProjects([]);
    setMatches([]);
    setAppState(AppState.ONBOARDING);
    setError(null);
  };

  return (
    // Brand Background: #1c3047 (Blauw)
    <div className="min-h-screen w-full bg-[#1c3047] text-[#f1f3de] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* Header */}
        <header className="text-center mb-8">
          {/* Font Montserrat Black (weight 900) */}
          <h1 className="text-4xl font-black text-[#f1f3de] tracking-tight">
            Tussenheid
          </h1>
          {/* Font Baskerville Italic for subhead */}
          <p className="text-[#dadcd1] mt-2 text-lg font-serif-italic">
            Vind vrijwilligersprojecten die écht bij je passen.
          </p>
        </header>

        {/* Content Area */}
        <main className="relative">
          {appState === AppState.ONBOARDING && (
            <Onboarding onStart={handleStartMatching} error={error} />
          )}

          {appState === AppState.LOADING && (
            <div className="flex flex-col items-center justify-center min-h-[400px] bg-[#f1f3de] rounded-3xl shadow-xl p-8">
              <Loader2 className="w-12 h-12 text-[#7b963a] animate-spin mb-4" />
              <h2 className="text-xl font-bold text-[#1c3047] mb-2">Projecten zoeken...</h2>
              <p className="text-center text-[#566171] text-sm font-serif-italic">
                De AI analyseert je profiel en zoekt de beste 5 projecten voor {userProfile?.name}.
              </p>
            </div>
          )}

          {appState === AppState.SWIPING && (
            <SwipeDeck 
              projects={matches} 
              onFinished={handleFinishedSwiping} 
            />
          )}

          {appState === AppState.RESULTS && (
            <Results 
              likedProjects={likedProjects} 
              userName={userProfile?.name || 'Vrijwilliger'}
              onRestart={handleRestart}
            />
          )}
        </main>

        <footer className="mt-12 text-center text-[#566171] text-xs">
          &copy; {new Date().getFullYear()} Tussenheid Vrijwilligersplatform
        </footer>
      </div>
    </div>
  );
};

export default App;