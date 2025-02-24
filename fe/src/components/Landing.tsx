
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Users, Lock, Zap, Globe, Sparkles } from 'lucide-react';

function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'Real-time Messaging',
      description: 'Instant message delivery with live typing indicators'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Group Chats',
      description: 'Create and manage group conversations easily'
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'End-to-End Encryption',
      description: 'Your conversations are always private and secure'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Lightning Fast',
      description: 'Optimized performance for smooth chatting experience'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Cross-Platform',
      description: 'Chat from any device, anywhere in the world'
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Rich Features',
      description: 'Share files, emojis, and more with ease'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-32">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
            Welcome to Modern Chat
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience the next generation of communication with real-time messaging, 
            enhanced security, and seamless collaboration.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate("/chat")}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-lg font-semibold text-white hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Start Chatting
            </button>
            <button
              className="px-8 py-4 bg-transparent border-2 border-purple-400 rounded-full text-lg font-semibold text-purple-400 hover:bg-purple-400/10 transform hover:scale-105 transition-all duration-200"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-900/50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
            Powerful Features for Modern Communication
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-gradient-to-br from-gray-800/50 to-purple-900/50 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
              >
                <div className="text-purple-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900/80 text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Modern Chat. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;