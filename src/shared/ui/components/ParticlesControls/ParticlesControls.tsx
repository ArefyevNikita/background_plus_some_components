import React, { useState, useEffect, useRef } from 'react';
import { classNames } from '~/shared/lib/utils';
import './ParticlesControls.css';

interface ParticlesControlsProps {
  particleCount: number;
  particleSpeed: number;
  connectionDistance: number;
  onParticleCountChange: (value: number) => void;
  onParticleSpeedChange: (value: number) => void;
  onConnectionDistanceChange: (value: number) => void;
  className?: string;
}

export const ParticlesControls: React.FC<ParticlesControlsProps> = ({
  particleCount,
  particleSpeed,
  connectionDistance,
  onParticleCountChange,
  onParticleSpeedChange,
  onConnectionDistanceChange,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={classNames(
          'w-12 h-12 backdrop-blur-md bg-white/10 rounded-full border border-white/20 shadow-2xl',
          'flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110',
          'text-white hover:text-blue-200',
          isOpen && 'bg-white/20 text-blue-200'
        )}
        title="Настройки частиц"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={classNames(
            'transition-transform duration-300 hover:animate-spin',
            isOpen && 'rotate-90'
          )}
        >
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </button>

      {isOpen && (
        <div className={classNames(
          'absolute top-16 right-0 backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 shadow-2xl',
          'w-80 transition-all duration-300 particles-controls-enter',
          className
        )}>
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-1">Настройки частиц</h3>
          <p className="text-xs text-gray-300">Регулируйте параметры в реальном времени</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-white">Количество частиц</label>
            <span className="text-xs text-gray-300 bg-white/10 px-2 py-1 rounded">
              {particleCount}
            </span>
          </div>
          <input
            type="range"
            min="50"
            max="1000"
            step="10"
            value={particleCount}
            onChange={(e) => onParticleCountChange(Number(e.target.value))}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>50</span>
            <span>1000</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-white">Скорость частиц</label>
            <span className="text-xs text-gray-300 bg-white/10 px-2 py-1 rounded">
              {particleSpeed.toFixed(1)}
            </span>
          </div>
          <input
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={particleSpeed}
            onChange={(e) => onParticleSpeedChange(Number(e.target.value))}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>0.1</span>
            <span>3.0</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-white">Расстояние связи</label>
            <span className="text-xs text-gray-300 bg-white/10 px-2 py-1 rounded">
              {connectionDistance}
            </span>
          </div>
          <input
            type="range"
            min="50"
            max="200"
            step="10"
            value={connectionDistance}
            onChange={(e) => onConnectionDistanceChange(Number(e.target.value))}
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>50</span>
            <span>200</span>
          </div>
        </div>

        <button
          onClick={() => {
            onParticleCountChange(500);
            onParticleSpeedChange(1);
            onConnectionDistanceChange(100);
          }}
          className="w-full py-2 px-4 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors duration-200 border border-white/20 hover:border-white/30"
        >
          Сбросить настройки
        </button>
      </div>
        </div>
      )}
    </div>
  );
};
