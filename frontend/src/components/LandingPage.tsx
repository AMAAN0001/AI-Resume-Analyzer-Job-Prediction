import React, { useState, useEffect } from 'react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [stars, setStars] = useState<Array<{id: number; left: number; top: number; delay: number; size: number}>>([]);
  const [meteorites, setMeteorities] = useState<Array<{id: number; left: number; top: number; delay: number}>>([]);

  useEffect(() => {
    // Generate 100 stars for 4K quality
    const generatedStars = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() > 0.7 ? Math.random() * 2.5 + 1 : Math.random() * 1.5 + 0.5,
    }));
    setStars(generatedStars);

    // Generate meteorites for falling effect
    const generatedMeterites = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: -10,
      delay: Math.random() * 3,
    }));
    setMeteorities(generatedMeterites);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-30px) translateX(20px); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes float-particle {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
          50% { opacity: 0.8; }
        }
        @keyframes shoot {
          0% { transform: translateY(-20vh) translateX(0) rotate(45deg); opacity: 1; }
          100% { transform: translateY(100vh) translateX(200px) rotate(45deg); opacity: 0; }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.5); }
          50% { box-shadow: 0 0 80px rgba(168, 85, 247, 0.8), 0 0 120px rgba(59, 130, 246, 0.6); }
        }
      `}</style>

      {/* 4K SPACE BACKGROUND */}
      <div className="fixed inset-0 bg-gradient-to-b from-slate-900 via-purple-900 to-slate-950">
        {/* Dynamic gradient layers for depth */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 via-transparent to-purple-900/40"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-cyan-900/20 via-transparent to-pink-900/20 animate-pulse"></div>

        {/* Nebula clouds - radial glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-600 rounded-full filter blur-3xl opacity-25"></div>
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-cyan-600 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-600 rounded-full filter blur-3xl opacity-15"></div>

        {/* STARS - 100 twinkling stars for 4K */}
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animation: `twinkle ${2 + Math.random() * 3}s infinite`,
              animationDelay: `${star.delay}s`,
              boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.8)`,
            }}
          ></div>
        ))}

        {/* METEORITES - Shooting stars effect */}
        {meteorites.map((meteor) => (
          <div
            key={`meteor-${meteor.id}`}
            className="absolute w-1 h-1"
            style={{
              left: `${meteor.left}%`,
              top: `${meteor.top}%`,
              animation: `shoot ${4 + Math.random() * 2}s linear infinite`,
              animationDelay: `${meteor.delay}s`,
            }}
          >
            <div className="w-full h-full bg-gradient-to-r from-cyan-300 to-transparent rounded-full filter blur-sm" style={{
              boxShadow: '0 0 15px rgba(34, 211, 238, 0.8), 0 0 30px rgba(59, 130, 246, 0.5)',
            }}></div>
          </div>
        ))}

        {/* PLANET 1 - Large Purple Planet (Top Right) */}
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-80"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(186, 85, 211, 0.8), rgba(139, 0, 139, 0.6), rgba(75, 0, 130, 0.4))',
            animation: 'float 25s ease-in-out infinite',
            boxShadow: '0 0 80px rgba(186, 85, 211, 0.6), inset -40px -40px 80px rgba(0, 0, 0, 0.6)',
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle at 35% 35%, rgba(218, 112, 214, 0.3), transparent)',
              animation: 'spin 40s linear infinite',
            }}
          ></div>
        </div>

        {/* PLANET 2 - Blue/Cyan Planet (Bottom Left) */}
        <div
          className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full opacity-75"
          style={{
            background: 'radial-gradient(circle at 35% 35%, rgba(34, 211, 238, 0.7), rgba(6, 182, 212, 0.5), rgba(0, 128, 128, 0.3))',
            animation: 'float 30s ease-in-out infinite 3s',
            boxShadow: '0 0 60px rgba(34, 211, 238, 0.5), inset -30px -30px 60px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle at 40% 40%, rgba(72, 219, 251, 0.2), transparent)',
              animation: 'spin 50s linear infinite reverse',
            }}
          ></div>
        </div>

        {/* PLANET 3 - Pink Planet (Middle Right, far) */}
        <div
          className="absolute top-1/3 -right-48 w-64 h-64 rounded-full opacity-60"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(236, 72, 153, 0.6), rgba(190, 24, 93, 0.4), rgba(131, 24, 67, 0.2))',
            animation: 'float 35s ease-in-out infinite 5s',
            boxShadow: '0 0 50px rgba(236, 72, 153, 0.4), inset -25px -25px 50px rgba(0, 0, 0, 0.4)',
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle at 35% 35%, rgba(244, 114, 182, 0.2), transparent)',
              animation: 'spin 60s linear infinite',
            }}
          ></div>
        </div>

        {/* PLANET 4 - Orange Planet (Bottom Right, far) */}
        <div
          className="absolute bottom-1/4 -right-24 w-56 h-56 rounded-full opacity-70"
          style={{
            background: 'radial-gradient(circle at 32% 32%, rgba(249, 115, 22, 0.7), rgba(194, 65, 12, 0.5), rgba(120, 53, 15, 0.2))',
            animation: 'float 28s ease-in-out infinite 2s',
            boxShadow: '0 0 55px rgba(249, 115, 22, 0.5), inset -25px -25px 55px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle at 35% 35%, rgba(251, 146, 60, 0.2), transparent)',
              animation: 'spin 45s linear infinite reverse',
            }}
          ></div>
        </div>

        {/* Floating particles around planets */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: ['bg-blue-300', 'bg-cyan-300', 'bg-purple-300'][Math.floor(Math.random() * 3)],
              backgroundColor: ['rgba(147, 197, 253, 0.6)', 'rgba(34, 211, 238, 0.6)', 'rgba(196, 181, 253, 0.6)'][Math.floor(Math.random() * 3)],
              animation: `float-particle ${5 + Math.random() * 5}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* CONTENT - Landing Page */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-8 max-w-4xl">
          {/* ResAI Logo */}
          <div className="inline-block">
            <div className="relative w-24 h-24 group">
              {/* Glowing background circle */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-600 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse" style={{
                boxShadow: '0 0 30px rgba(168, 85, 247, 0.8)',
              }}></div>
              
              {/* Main logo box */}
              <div className="relative w-24 h-24 bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center" style={{
                boxShadow: '0 0 40px rgba(168, 85, 247, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.1)',
              }}>
                {/* AI Brain + Resume hybrid icon */}
                <svg className="w-14 h-14 text-white" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="none">
                  {/* Brain outline */}
                  <path d="M50 15 Q60 20 65 35 Q70 50 65 65 Q60 75 50 80 Q40 75 35 65 Q30 50 35 35 Q40 20 50 15" stroke="currentColor" strokeWidth="2" fill="none"/>
                  {/* Neural connections */}
                  <circle cx="50" cy="40" r="4" fill="currentColor"/>
                  <circle cx="42" cy="50" r="3" fill="currentColor"/>
                  <circle cx="58" cy="50" r="3" fill="currentColor"/>
                  <circle cx="50" cy="60" r="4" fill="currentColor"/>
                  {/* Connection lines */}
                  <line x1="50" y1="40" x2="42" y2="50" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
                  <line x1="50" y1="40" x2="58" y2="50" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
                  <line x1="42" y1="50" x2="50" y2="60" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
                  <line x1="58" y1="50" x2="50" y2="60" stroke="currentColor" strokeWidth="1.5" opacity="0.7"/>
                  {/* Resume lines */}
                  <line x1="32" y1="75" x2="68" y2="75" stroke="currentColor" strokeWidth="1.5" opacity="0.8"/>
                  <line x1="32" y1="82" x2="68" y2="82" stroke="currentColor" strokeWidth="1.5" opacity="0.8"/>
                  <line x1="32" y1="89" x2="55" y2="89" stroke="currentColor" strokeWidth="1.5" opacity="0.8"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-black text-white tracking-tighter" style={{
              textShadow: '0 0 30px rgba(168, 85, 247, 0.5), 0 0 60px rgba(59, 130, 246, 0.3)',
            }}>
              ResAI
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 mx-auto rounded-full" style={{
              boxShadow: '0 0 20px rgba(168, 85, 247, 0.6)',
            }}></div>
          </div>

          {/* Tagline */}
          <p className="text-3xl md:text-4xl font-bold text-blue-100" style={{
            textShadow: '0 0 20px rgba(34, 211, 238, 0.4)',
          }}>
            AI-Powered Resume Insights
          </p>

          {/* Description */}
          <p className="text-lg md:text-xl text-blue-200/90 max-w-2xl mx-auto leading-relaxed">
            Transform your resume with intelligent AI analysis. Get job-fit predictions, career recommendations, and interview prep powered by advanced machine learning.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="backdrop-blur-md bg-white/5 border border-white/20 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:border-blue-400/50" style={{
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.1)',
            }}>
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-white font-bold text-lg mb-2">Smart Analysis</h3>
              <p className="text-blue-200/70 text-sm">AI analyzes your resume in seconds</p>
            </div>
            <div className="backdrop-blur-md bg-white/5 border border-white/20 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:border-purple-400/50" style={{
              boxShadow: '0 0 20px rgba(168, 85, 247, 0.1)',
            }}>
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-white font-bold text-lg mb-2">Job Predictions</h3>
              <p className="text-blue-200/70 text-sm">Find perfect job matches for your profile</p>
            </div>
            <div className="backdrop-blur-md bg-white/5 border border-white/20 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:border-cyan-400/50" style={{
              boxShadow: '0 0 20px rgba(34, 211, 238, 0.1)',
            }}>
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="text-white font-bold text-lg mb-2">Career Growth</h3>
              <p className="text-blue-200/70 text-sm">Get actionable insights to advance your career</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-8">
            <button
              onClick={onGetStarted}
              className="group relative px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-lg rounded-xl transition-all duration-300 hover:shadow-2xl active:scale-95 overflow-hidden"
              style={{
                boxShadow: '0 0 40px rgba(168, 85, 247, 0.6), 0 0 80px rgba(59, 130, 246, 0.4)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 to-white/0 group-hover:from-white/20 group-hover:to-white/20 transition-all duration-300"></div>
              <span className="relative flex items-center justify-center gap-2">
                Get Started Now
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>

          {/* Footer text */}
          <p className="text-blue-300/60 text-sm pt-8">
            ✨ Start for free • No credit card required
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
