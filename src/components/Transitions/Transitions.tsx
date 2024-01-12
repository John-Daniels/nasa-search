/* eslint-disable react/jsx-props-no-spreading */
import useAppTheme from "@/hooks/theme.hook";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import React, { ReactNode, useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const animationVariants = {};

export function FadeInFromRight({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
  [key: string]: any;
}) {
  const variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className={`${className}`}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

export function ShakeWhenError({
  children,
  error,
  className,
  ...others
}: {
  children: React.ReactNode;
  error: boolean;
  className: string;
  [key: string]: any;
}) {
  const variants = {
    shake: {
      x: [-10, 10, -10, 10, 0],
      transition: {
        duration: 1,
      },
    },
    normal: {
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      className={`relative ${className}`}
      animate={error ? "shake" : "normal"}
      variants={variants}
      {...others}
    >
      {children}
    </motion.div>
  );
}

// TODO: Implement changes to this ->
export function FadeOutAndHide({
  isVisible,
  children,
  ...others
}: {
  isVisible: boolean;
  children: React.ReactNode;
  [key: string]: any;
}) {
  const variants = {
    visible: {
      opacity: 1,
      display: "flex",
    },
    hidden: {
      opacity: 0,
      // transitionEnd: { display: "none" },
      duration: 0.1,
      display: "none",
    },
  };

  return (
    <motion.div
      initial="visible"
      animate={isVisible ? "visible" : "hidden"}
      variants={variants}
      style={{ transition: "all 0.1s ease-out" }}
      {...others}
    >
      {children}
    </motion.div>
  );
}

export function ShowHideView({
  children,
  show,
  fallback,
  className = "",
}: {
  children: any;
  show: boolean;
  fallback?: any;
  className?: string;
}) {
  return show ? (
    <div className={`${className || "w-full"}`}>
      <FadeOutAndHide isVisible={true}>{children}</FadeOutAndHide>
    </div>
  ) : (
    fallback || null
  );
}

export function SlideDown({
  children,
  target,
  className,
}: {
  children: ReactNode;
  target: boolean;
  className: string;
}) {
  const variants = {
    slideDown: {
      y: [-500, 0],
      opacity: [0.5, 1],
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div variants={variants} animate={target ? "slideDown" : ""} className={className}>
      {children}
    </motion.div>
  );
}

// without target
export function NoTargetSlideDown({ children, fullWidth = true }: { children: ReactNode; fullWidth?: boolean }) {
  const variants = {
    slideDown: {
      y: [-500, 0],
      opacity: [0.5, 1],
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      animate="slideDown"
      transition={{ duration: 0.3 }}
      className={`${fullWidth ? "w-full" : ""}`}
    >
      {children}
    </motion.div>
  );
}

export function ZoomInOut({
  children,
  target,
  className,
}: {
  children: ReactNode;
  target: boolean;
  className: string;
}) {
  const { isMobile } = useAppTheme();
  const variants = {
    zoomIn: {
      scale: isMobile ? [0, 1.1, 1] : [0, 1.2, 1],
      opacity: [0, 1],
      transition: {
        duration: 0.2,
        velocity: 2,
      },
    },
  };

  return (
    <motion.div
      variants={variants}
      transition={{ ease: "easeOut" }}
      animate={target ? "zoomIn" : ""}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeIn({ children, fullWidth = true }: { children?: ReactNode; fullWidth?: boolean }) {
  const variants = {
    fade: {
      opacity: [0, 1],
    },
    exit: {
      opacity: 0,
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        className={`${fullWidth ? "w-full" : "w-fit"}`}
        initial={{
          opacity: 0,
        }}
        variants={variants}
        animate="fade"
        exit="exit"
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function SlideFadeUp({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{
        y: 10,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          duration: 1,
          // delay: 0.2,
        },
      }}
      className="w-fit"
    >
      {children}
    </motion.div>
  );
}

// export function AnimateFadeUp({ children, className }: { children: React.ReactNode; className?: string }) {
//   return (
//     <motion.div
//       whileInView={{ y: [100, 0], opacity: [0, 1] }}
//       transition={{ duration: 1 }}
//       className={`w-full h-fit ${className || ''}`}
//     >
//       {children}
//     </motion.div>
//   );
// }

export function AnimateFadeUp({ children, className }: { children: React.ReactNode; className?: string }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true, // Only trigger the animation once
    threshold: 0.3, // Trigger when 30% of the element is in view
  });

  useEffect(() => {
    if (inView) {
      controls.start({ y: 0, opacity: 1 });
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ y: 100, opacity: 0 }}
      animate={controls}
      transition={{ duration: 1 }}
      className={`h-fit w-full ${className || ""}`}
    >
      {children}
    </motion.div>
  );
}
