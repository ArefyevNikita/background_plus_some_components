import { useState } from 'react';
import { ParticlesBackground, PillNav, ParticlesControls } from '~/shared/ui';
import { NAVIGATION_ITEMS } from '~/shared/constants/navigation';
import { DEFAULT_PILL_NAV_CONFIG } from '~/shared/constants/pillNavConfig';
import { useLocation } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const location = useLocation();
  
  const [particleCount, setParticleCount] = useState(500);
  const [particleSpeed, setParticleSpeed] = useState(1);
  const [connectionDistance, setConnectionDistance] = useState(100);

  return (
    <div className="page-container">
      <div className="background-overlay">
        <ParticlesBackground 
          particleCount={particleCount}
          particleSpeed={particleSpeed}
          connectionDistance={connectionDistance}
        />
      </div>
      
      <div className="flex items-center justify-center">
        <PillNav 
          {...DEFAULT_PILL_NAV_CONFIG}
          items={NAVIGATION_ITEMS}
          activeHref={location.pathname}
        />
      </div>
      
      <div className="content-wrapper">

        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold text-white bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              О чем этот проект
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Этот проект является демонстрацией моих навыков в React и TypeScript.
              Он использует Feature-Sliced Design архитектуру и Framer Motion для создания красивых анимаций и интерактивных компонентов.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
            <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-6 border border-white/20">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-white mb-2">Быстро</h3>
              <p className="text-gray-300 text-sm">
                Сделан с помощью Vite для быстрого разработки и оптимизированных сборки.
              </p>
            </div>

            <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-6 border border-white/20">
              <div className="text-3xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-white mb-2">Красиво</h3>
              <p className="text-gray-300 text-sm">
                Красивые визуальные эффекты и плавные анимации, созданные с помощью Framer Motion.
              </p>
            </div>

            <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-6 border border-white/20">
              <div className="text-3xl mb-4">🏗️</div>
              <h3 className="text-xl font-semibold text-white mb-2">Масштабируемо</h3>
              <p className="text-gray-300 text-sm">
                Feature-Sliced Design архитектуру для поддерживаемого и масштабируемого кода.
              </p>
            </div>
            
          </div>
        </div>
      </div>
      
      <ParticlesControls
        particleCount={particleCount}
        particleSpeed={particleSpeed}
        connectionDistance={connectionDistance}
        onParticleCountChange={setParticleCount}
        onParticleSpeedChange={setParticleSpeed}
        onConnectionDistanceChange={setConnectionDistance}
      />
    </div>
  );
};
