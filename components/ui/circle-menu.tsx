'use client';

import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { liquidGlass } from '@/lib/liquid-glass';

const CONSTANTS = {
  itemSize: 44,
  openStagger: 0.025,
  closeStagger: 0.05,
};

const pointOnCircle = (
  i: number,
  n: number,
  r: number,
  placement: 'full' | 'bottom-center' | 'bottom-left' = 'full',
  cx = 0,
  cy = 0
) => {
  let theta: number;

  if (placement === 'bottom-center') {
    // Upward rainbow/dome arc from -165° (left) to -15° (right)
    const startAngle = -Math.PI * 0.92;
    const endAngle = -Math.PI * 0.08;
    theta = n > 1 ? startAngle + ((endAngle - startAngle) * i) / (n - 1) : -Math.PI / 2;
  } else if (placement === 'bottom-left') {
    // Fan from 80° (downward) to 215° (leftward)
    const startAngle = Math.PI * 0.44;
    const endAngle = Math.PI * 1.18;
    theta = n > 1 ? startAngle + ((endAngle - startAngle) * i) / (n - 1) : startAngle;
  } else {
    // Standard full 360° circle starting at top (-90°)
    theta = (2 * Math.PI * i) / n - Math.PI / 2;
  }

  const x = cx + r * Math.cos(theta);
  const y = cy + r * Math.sin(theta);
  return { x, y };
};

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  index: number;
  totalItems: number;
  isOpen: boolean;
  placement?: 'full' | 'bottom-center' | 'bottom-left';
  onItemClick?: () => void;
}

const MenuItem = ({
  icon,
  label,
  href,
  index,
  totalItems,
  isOpen,
  placement = 'full',
  onItemClick,
}: MenuItemProps) => {
  const radius = placement === 'bottom-center' ? 102 : placement === 'bottom-left' ? 104 : 110;
  const { x, y } = pointOnCircle(index, totalItems, radius, placement);
  const [hovering, setHovering] = useState(false);
  const itemGlassRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!itemGlassRef.current) return;
    const glass = liquidGlass(itemGlassRef.current, {
      scale: -70,
      chroma: 3.5,
      border: 0.08,
      mapBlur: 8,
      blur: 3,
      saturate: 1.3,
    });
    return () => {
      glass?.destroy();
    };
  }, []);

  return (
    <Link
      ref={itemGlassRef}
      href={href}
      className={cn(
        'absolute z-40 rounded-full flex items-center justify-center transition-all duration-200 overflow-hidden',
        // Liquid glass dressing
        'bg-white/85 dark:bg-[#18181c]/85 text-black dark:text-white',
        'border border-white/60 dark:border-white/15',
        'shadow-[0_8px_24px_rgba(0,0,0,0.14)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.65)]',
        'backdrop-blur-[12px] saturate-[140%]',
        'hover:scale-115 hover:border-[#FF0000] dark:hover:border-[#D2F75A]',
        !isOpen && 'pointer-events-none'
      )}
      onClick={onItemClick}
      style={{
        height: CONSTANTS.itemSize,
        width: CONSTANTS.itemSize,
        boxShadow:
          '0 8px 24px rgba(0, 0, 0, 0.12), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.9), inset 0 -1px 1px rgba(0, 0, 0, 0.1)',
      }}
    >
      <motion.div
        animate={{
          x: isOpen ? x : 0,
          y: isOpen ? y : 0,
          opacity: isOpen ? 1 : 0,
          scale: isOpen ? 1 : 0.25,
        }}
        whileHover={{
          scale: 1.15,
          transition: { duration: 0.15 },
        }}
        transition={{
          delay: isOpen ? index * CONSTANTS.openStagger : (totalItems - index) * CONSTANTS.closeStagger * 0.4,
          type: 'spring',
          stiffness: 360,
          damping: 24,
        }}
        className="w-full h-full rounded-full flex items-center justify-center relative"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {icon}
        {hovering && (
          <motion.p
            initial={{ opacity: 0, y: placement === 'bottom-center' ? 4 : -4 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              'text-[10px] font-sans font-semibold tracking-tight absolute left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full whitespace-nowrap shadow-md pointer-events-none z-50',
              'bg-black/85 dark:bg-white/95 text-white dark:text-black',
              placement === 'bottom-center' ? 'bottom-full mb-1.5' : 'top-full mt-1.5'
            )}
          >
            {label}
          </motion.p>
        )}
      </motion.div>
    </Link>
  );
};

interface MenuTriggerProps {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  itemsLength: number;
  closeAnimationCallback: () => void;
  openIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;
  triggerSize?: number;
}

const MenuTrigger = ({
  setIsOpen,
  isOpen,
  itemsLength,
  closeAnimationCallback,
  openIcon,
  closeIcon,
  triggerSize = 48,
}: MenuTriggerProps) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const animate = useAnimationControls();
  const shakeAnimation = useAnimationControls();

  // Apply Apple Liquid Glass to trigger button
  useEffect(() => {
    if (!triggerRef.current) return;
    const glass = liquidGlass(triggerRef.current, {
      scale: -85,
      chroma: 4.5,
      border: 0.08,
      mapBlur: 10,
      blur: 4,
      saturate: 1.35,
    });
    return () => {
      glass?.destroy();
    };
  }, []);

  const scaleTransition = Array.from({ length: itemsLength - 1 })
    .map((_, index) => index + 1)
    .reduce((acc, _, index) => {
      const increasedValue = index * 0.12;
      acc.push(1 + increasedValue);
      return acc;
    }, [] as number[]);

  const closeAnimation = async () => {
    shakeAnimation.start({
      translateX: [0, 2, -2, 0, 2, -2, 0],
      transition: {
        duration: CONSTANTS.closeStagger,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop',
      },
    });

    for (let i = 0; i < scaleTransition.length; i++) {
      await animate.start({
        height: Math.min(
          triggerSize * scaleTransition[i],
          triggerSize + triggerSize / 2
        ),
        width: Math.min(
          triggerSize * scaleTransition[i],
          triggerSize + triggerSize / 2
        ),
        transition: {
          duration: CONSTANTS.closeStagger / 2,
          ease: 'linear',
        },
      });
      if (i !== scaleTransition.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, CONSTANTS.closeStagger * 1000));
      }
    }

    shakeAnimation.stop();
    shakeAnimation.start({
      translateX: 0,
      transition: { duration: 0 },
    });

    animate.start({
      height: triggerSize,
      width: triggerSize,
      transition: {
        duration: 0.15,
        ease: 'backInOut',
      },
    });
  };

  return (
    <motion.div animate={shakeAnimation} className="z-50 relative">
      <motion.button
        ref={triggerRef}
        animate={animate}
        style={{
          height: triggerSize,
          width: triggerSize,
          boxShadow: isOpen
            ? '0 12px 36px rgba(0, 0, 0, 0.25), inset 0 1.5px 2px rgba(255, 255, 255, 0.95), inset 0 -1.5px 2px rgba(0, 0, 0, 0.15)'
            : '0 8px 28px rgba(0, 0, 0, 0.18), inset 0 1.5px 2px rgba(255, 255, 255, 0.9), inset 0 -1.5px 2px rgba(0, 0, 0, 0.12)',
        }}
        className={cn(
          'rounded-full flex items-center justify-center cursor-pointer outline-none transition-all duration-200 z-50 overflow-hidden',
          // Apple Liquid Glass Material Dressing
          'bg-white/80 dark:bg-[#18181c]/80 text-black dark:text-white',
          'border border-white/60 dark:border-white/20',
          'backdrop-blur-[14px] saturate-[140%]',
          'hover:scale-108 active:scale-94 hover:border-[#FF0000] dark:hover:border-[#D2F75A]'
        )}
        onClick={() => {
          if (isOpen) {
            setIsOpen(false);
            closeAnimationCallback();
            closeAnimation();
          } else {
            setIsOpen(true);
          }
        }}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        <AnimatePresence mode="popLayout">
          {isOpen ? (
            <motion.span
              key="menu-close"
              initial={{ opacity: 0, filter: 'blur(5px)', rotate: -45 }}
              animate={{ opacity: 1, filter: 'blur(0px)', rotate: 0 }}
              exit={{ opacity: 0, filter: 'blur(5px)', rotate: 45 }}
              transition={{ duration: 0.18 }}
            >
              {closeIcon}
            </motion.span>
          ) : (
            <motion.span
              key="menu-open"
              initial={{ opacity: 0, filter: 'blur(5px)', rotate: 45 }}
              animate={{ opacity: 1, filter: 'blur(0px)', rotate: 0 }}
              exit={{ opacity: 0, filter: 'blur(5px)', rotate: -45 }}
              transition={{ duration: 0.18 }}
            >
              {openIcon}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
};

export interface CircleMenuItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

interface CircleMenuProps {
  items: CircleMenuItem[];
  openIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;
  className?: string;
  placement?: 'full' | 'bottom-center' | 'bottom-left';
  triggerSize?: number;
  onItemClick?: () => void;
}

const CircleMenu = ({
  items,
  openIcon = <Menu size={20} />,
  closeIcon = <X size={20} />,
  className,
  placement = 'full',
  triggerSize = 48,
  onItemClick,
}: CircleMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const animate = useAnimationControls();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node) && isOpen) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  const closeAnimationCallback = async () => {
    await animate.start({
      rotate: -360,
      filter: 'blur(1px)',
      transition: {
        duration: CONSTANTS.closeStagger * (items.length + 2),
        ease: 'linear',
      },
    });
    await animate.start({
      rotate: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0,
      },
    });
  };

  const handleItemClick = () => {
    setIsOpen(false);
    if (onItemClick) onItemClick();
  };

  return (
    <div
      ref={menuRef}
      className={cn('relative inline-flex items-center justify-center', className)}
    >
      <MenuTrigger
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        itemsLength={items.length}
        closeAnimationCallback={closeAnimationCallback}
        openIcon={openIcon}
        closeIcon={closeIcon}
        triggerSize={triggerSize}
      />

      {/* Radial Items Container */}
      <motion.div
        animate={animate}
        className={cn(
          'absolute inset-0 z-40 flex items-center justify-center pointer-events-none',
          isOpen && 'pointer-events-auto'
        )}
      >
        {items.map((item, index) => {
          return (
            <MenuItem
              key={`menu-item-${index}`}
              icon={item.icon}
              label={item.label}
              href={item.href}
              index={index}
              totalItems={items.length}
              isOpen={isOpen}
              placement={placement}
              onItemClick={handleItemClick}
            />
          );
        })}
      </motion.div>
    </div>
  );
};

export { CircleMenu };
export default CircleMenu;
