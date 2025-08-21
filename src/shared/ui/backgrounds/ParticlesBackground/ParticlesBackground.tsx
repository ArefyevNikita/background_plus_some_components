import { useEffect, useRef, useMemo } from 'react';
import { classNames } from '~/shared/lib/utils';
import type { BackgroundProps } from '~/shared/types';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

interface ParticlesBackgroundProps extends BackgroundProps {
  particleCount?: number;
  particleColor?: string;
  particleSpeed?: number;
  connectionDistance?: number;
}

export const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({
  className,
  particleCount = 250,
  particleColor = 'rgba(255, 255, 255, 0.5)',
  particleSpeed = 1,
  connectionDistance = 100,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);

  const particleConfig = useMemo(
    () => ({
      count: particleCount,
      color: particleColor,
      speed: particleSpeed,
      connectionDistance,
    }),
    [particleCount, particleColor, particleSpeed, connectionDistance]
  );


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { width, height } = canvas;
    const currentCount = particlesRef.current.length;
    
    if (currentCount !== particleCount) {
      particlesRef.current = initializeParticles(width, height);
    }
  }, [particleCount]);


  const initializeParticles = (width: number, height: number): Particle[] => {
    return Array.from({ length: particleConfig.count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * particleConfig.speed,
      vy: (Math.random() - 0.5) * particleConfig.speed,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.5,
    }));
  };


  const updateParticles = (particles: Particle[], width: number, height: number) => {
    particles.forEach(particle => {

      const speedMultiplier = particleConfig.speed;
      particle.x += particle.vx * speedMultiplier;
      particle.y += particle.vy * speedMultiplier;


      if (particle.x <= 0 || particle.x >= width) {
        particle.vx = -particle.vx;
      }
      if (particle.y <= 0 || particle.y >= height) {
        particle.vy = -particle.vy;
      }


      particle.x = Math.max(0, Math.min(width, particle.x));
      particle.y = Math.max(0, Math.min(height, particle.y));
    });
  };


  const drawParticles = (
    ctx: CanvasRenderingContext2D,
    particles: Particle[],
    width: number,
    height: number
  ) => {

    ctx.clearRect(0, 0, width, height);


    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < particleConfig.connectionDistance) {
          const opacity = (1 - distance / particleConfig.connectionDistance) * 0.3;
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }


    particles.forEach(particle => {
      ctx.fillStyle = particleConfig.color;
      ctx.globalAlpha = particle.opacity;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.globalAlpha = 1;
  };


  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;

    updateParticles(particlesRef.current, width, height);
    drawParticles(ctx, particlesRef.current, width, height);

    animationRef.current = requestAnimationFrame(animate);
  };


  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { innerWidth, innerHeight } = window;
    canvas.width = innerWidth;
    canvas.height = innerHeight;


    particlesRef.current = initializeParticles(innerWidth, innerHeight);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;


    handleResize();
    animate();


    window.addEventListener('resize', handleResize);


    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particleConfig]);

  return (
    <canvas
      ref={canvasRef}
      className={classNames(
        'fixed inset-0 w-full h-full pointer-events-none',
        className
      )}
      style={{
        background: 'linear-gradient(235deg, #000000 0%, #000000 50%, #16213e 100%)',
      }}
    />
  );
};
