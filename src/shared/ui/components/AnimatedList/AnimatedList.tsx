import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimate } from 'framer-motion';
import { classNames } from '~/shared/lib/utils';
import type { ListItem, BaseComponent, AnimationConfig } from '~/shared/types';

interface AnimatedListProps extends BaseComponent {
  items: ListItem[];
  variant?: 'fade' | 'slide' | 'scale' | 'flip';
  staggerDelay?: number;
  animationConfig?: AnimationConfig;
  showOnScroll?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

/**
 * Animated List component with multiple animation variants
 * Implements SOLID principles and provides flexible animation options
 */
export const AnimatedList: React.FC<AnimatedListProps> = ({
  items,
  variant = 'fade',
  staggerDelay = 0.1,
  animationConfig = { duration: 0.6, ease: 'easeOut' },
  showOnScroll = false,
  autoPlay = false,
  autoPlayInterval = 3000,
  className,
}) => {
  const [scope] = useAnimate();
  const [visibleItems, setVisibleItems] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    if (!autoPlay || items.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, items.length]);


  useEffect(() => {
    if (!showOnScroll) {
    
      const timer = setTimeout(() => {
        setVisibleItems(items.map(item => item.id));
      }, 100);
      return () => clearTimeout(timer);
    }

  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems(items.map(item => item.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    if (scope.current) {
      observer.observe(scope.current);
    }

    return () => observer.disconnect();
  }, [showOnScroll, items, scope]);


  const getItemVariants = () => {
    const baseVariants = {
      duration: animationConfig.duration,
      ease: animationConfig.ease,
    };

    switch (variant) {
      case 'slide':
        return {
          hidden: { opacity: 0, x: -50, ...baseVariants },
          visible: { opacity: 1, x: 0, ...baseVariants },
          exit: { opacity: 0, x: 50, ...baseVariants },
        };
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.8, ...baseVariants },
          visible: { opacity: 1, scale: 1, ...baseVariants },
          exit: { opacity: 0, scale: 0.8, ...baseVariants },
        };
      case 'flip':
        return {
          hidden: { opacity: 0, rotateX: -90, ...baseVariants },
          visible: { opacity: 1, rotateX: 0, ...baseVariants },
          exit: { opacity: 0, rotateX: 90, ...baseVariants },
        };
              default:
        return {
          hidden: { opacity: 0, ...baseVariants },
          visible: { opacity: 1, ...baseVariants },
          exit: { opacity: 0, ...baseVariants },
        };
    }
  };

  const itemVariants = getItemVariants();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      ref={scope}
      className={classNames(
        'w-full max-w-2xl mx-auto',
        className
      )}
      variants={containerVariants}
      initial="hidden"
      animate={visibleItems.length > 0 ? 'visible' : 'hidden'}
    >
      <AnimatePresence mode="wait">
        {autoPlay ? (
          <motion.div
            key={items[currentIndex]?.id}
            className="min-h-[200px] flex items-center justify-center"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ListItemComponent item={items[currentIndex]} variant={variant} />
          </motion.div>
        ) : (
        
          <div className="space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                                  className={classNames(
                    'transform-gpu',
                    variant === 'flip' ? 'perspective-1000' : ''
                  )}
                custom={index}
              >
                <ListItemComponent item={item} variant={variant} />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      
      {autoPlay && (
        <div className="flex justify-center mt-6 gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              className={classNames(
                'w-2 h-2 rounded-full transition-all duration-300',
                index === currentIndex ? 'bg-white' : 'bg-white/30 hover:bg-white/50'
              )}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to item ${index + 1}`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

/**
 * Individual list item component
 * Separated for better maintainability (Single Responsibility)
 */
const ListItemComponent: React.FC<{
  item: ListItem;
  variant: string;
}> = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative p-6 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 overflow-hidden cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        scale: 1.02,
        y: -2,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5" />
      
      
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      
      <div className="relative z-10 flex items-start gap-4">
        
        {item.icon && (
          <motion.div
            className="flex-shrink-0 w-12 h-12 rounded-full bg-white/20 flex items-center justify-center"
            animate={{
              rotate: isHovered ? 360 : 0,
            }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            {item.icon}
          </motion.div>
        )}

        
        <div className="flex-1 min-w-0">
          <motion.h3
            className="text-xl font-semibold text-white mb-2 group-hover:text-white/90"
            animate={{
              x: isHovered ? 4 : 0,
            }}
            transition={{ duration: 0.2 }}
          >
            {item.title}
          </motion.h3>
          
          {item.description && (
            <motion.p
              className="text-white/70 text-sm leading-relaxed group-hover:text-white/80"
              animate={{
                x: isHovered ? 4 : 0,
              }}
              transition={{ duration: 0.2, delay: 0.05 }}
            >
              {item.description}
            </motion.p>
          )}
        </div>


        <motion.div
          className="flex-shrink-0 w-6 h-6 text-white/40 group-hover:text-white/70"
          animate={{
            x: isHovered ? 4 : 0,
            opacity: isHovered ? 1 : 0.4,
          }}
          transition={{ duration: 0.2 }}
        >
          →
        </motion.div>
      </div>

      
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
        initial={{ x: '-100%' }}
        animate={{ x: isHovered ? '200%' : '-100%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
    </motion.div>
  );
};
