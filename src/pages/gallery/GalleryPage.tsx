import { Galaxy, PillNav } from '~/shared/ui';
import ScrollStack, {
  ScrollStackItem,
} from '~/shared/ui/components/ScrollStack/ScrollStack';
import { GALLERY_STACK_ITEMS } from '~/shared/constants/mockData';
import { NAVIGATION_ITEMS } from '~/shared/constants/navigation';
import { DEFAULT_PILL_NAV_CONFIG } from '~/shared/constants/pillNavConfig';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const GalleryPage: React.FC = () => {
  const location = useLocation();
  const [showTitle, setShowTitle] = useState(true);

  useEffect(() => {
    const scroller = document.querySelector<HTMLDivElement>(
      '.scroll-stack-scroller'
    );
    if (!scroller) return;

    const onScroll = () => {
      setShowTitle(scroller.scrollTop < 40);
    };
    onScroll();
    scroller.addEventListener('scroll', onScroll, { passive: true });
    return () => scroller.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="relative min-h-screen">
      <Galaxy className="fixed inset-0 w-full h-full pointer-events-none -z-10" />

      <div className="fixed top-6 inset-x-0 z-[100] pointer-events-none">
        <div className="mx-auto max-w-5xl flex justify-center pointer-events-auto px-4">
          <PillNav
            {...DEFAULT_PILL_NAV_CONFIG}
            items={NAVIGATION_ITEMS}
            activeHref={location.pathname}
          />
        </div>
      </div>

      <div className="fixed inset-0 flex flex-col items-center justify-center text-center px-4 z-10 pointer-events-none">
        <div
          className={`transition-opacity duration-500 ${showTitle ? 'opacity-100' : 'opacity-0'}`}
        >
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            Gallery
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore our showcase through an interactive scroll experience
          </p>
        </div>
      </div>

      {/* <div className="relative z-20 h-[80vh] px-4">
        <ScrollStack
          className="rounded-2xl"
          itemDistance={120}
          itemScale={0.04}
          itemStackDistance={40}
          stackPosition="25%"
          scaleEndPosition="12%"
          baseScale={0.86}
          rotationAmount={0}
          blurAmount={0.8}
          onStackComplete={() => {}}
        >
          {GALLERY_STACK_ITEMS.map((it) => (
            <ScrollStackItem key={it.id} itemClassName="backdrop-blur-md bg-white/10 border border-white/20">
              <div className="text-white">
                <h3 className="text-2xl font-semibold mb-2">{it.title}</h3>
                <div className="opacity-80">{it.content}</div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>


      <div className="relative z-10 py-20 text-center">
        <div className="backdrop-blur-md bg-white/10 rounded-2xl p-8 border border-white/20 max-w-2xl mx-auto">
          <h3 className="text-2xl font-semibold text-white mb-4">Experience Complete</h3>
          <p className="text-gray-300">
            You've explored our gallery showcase. Each section demonstrates different
            aspects of modern web development and design principles.
          </p>
        </div>
      </div> */}
    </div>
  );
};
