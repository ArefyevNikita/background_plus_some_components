import { ParticlesBackground, AnimatedList, PillNav } from '~/shared/ui';
import { ABOUT_LIST_ITEMS } from '~/shared/constants/mockData';
import { NAVIGATION_ITEMS } from '~/shared/constants/navigation';
import { DEFAULT_PILL_NAV_CONFIG } from '~/shared/constants/pillNavConfig';
import { useLocation } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  const location = useLocation();

  return (
    <div className="page-container">
      <div className="background-overlay">
        <ParticlesBackground />
      </div>

      <div className="flex items-center justify-center">
        <PillNav 
          {...DEFAULT_PILL_NAV_CONFIG}
          items={NAVIGATION_ITEMS}
          activeHref={location.pathname}
        />
      </div>

      <div className="content-wrapper">

        <div className="text-center mb-16 pt-20">
          <h1 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            О нас
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed text-justify">
          Мы – команда людей, влюблённых в своё дело. Создаём продукты, которые не просто работают, 
          а запоминаются. В основе каждого проекта – креатив, технологии и внимание к деталям.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <AnimatedList 
            items={ABOUT_LIST_ITEMS}
            variant="slide"
            staggerDelay={0.15}
            animationConfig={{ duration: 0.8, ease: 'easeOut' }}
            showOnScroll={true}
          />
        </div>

        <div className="text-center mt-20">
          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-8 border border-white/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Готовы поработать вместе?
            </h3>
            <p className="text-gray-300 mb-6">
              Давайте создадим что-то удивительное вместе. Свяжитесь с нами, чтобы обсудить ваш следующий проект.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-full text-white font-medium transition-all duration-300 backdrop-blur-md border border-white/20">
                Связаться с нами
              </button>
              <button className="px-6 py-3 bg-white hover:bg-gray-100 rounded-full text-gray-900 font-medium transition-all duration-300">
                Посмотреть проекты
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
