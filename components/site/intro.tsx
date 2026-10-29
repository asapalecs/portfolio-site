"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EncryptedText } from "@/components/ui/encrypted-text";

const NAME = "Alexandru Cristinescu";
const KEY = "intro-seen";

// intro afisat o data pe sesiune (vezi scriptul din layout.tsx)
export function Intro() {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(true);
  const blockers = useRef<(() => void) | null>(null);

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem(KEY) === "1"; } catch {}
    if (seen) { setShow(false); return; }

    setMounted(true);
    document.documentElement.style.overflow = "hidden";
    window.scrollTo(0, 0);
    // fara scroll cat timp ruleaza intro-ul
    const block = (e: Event) => e.preventDefault();
    const keys = (e: KeyboardEvent) => { if (["ArrowDown","ArrowUp","PageDown","PageUp","Home","End"," "].includes(e.key)) e.preventDefault(); };
    window.addEventListener("wheel", block, { passive: false });
    window.addEventListener("touchmove", block, { passive: false });
    window.addEventListener("keydown", keys);
    blockers.current = () => {
      window.removeEventListener("wheel", block);
      window.removeEventListener("touchmove", block);
      window.removeEventListener("keydown", keys);
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setShow(false), reduce ? 600 : NAME.length * 65 + 1100);
    return () => { clearTimeout(t); blockers.current?.(); };
  }, []);

  useEffect(() => {
    if (show) return;
    blockers.current?.();
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = "";
    (window as unknown as { __lenis?: { start: () => void } }).__lenis?.start();
    try { sessionStorage.setItem(KEY, "1"); } catch {}
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          id="intro"
          key="intro"
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-white px-6"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          onClick={() => setShow(false)}
        >
          {mounted && (
            <>
              <h1 className="text-center text-4xl font-medium tracking-[-0.03em] text-ink sm:text-6xl md:text-7xl">
                <EncryptedText
                  text={NAME}
                  revealDelayMs={65}
                  flipDelayMs={40}
                  encryptedClassName="text-neutral-300"
                  revealedClassName="text-ink"
                />
              </h1>
              <motion.div
                className="mt-8 h-px w-40 origin-left bg-orange"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: (NAME.length * 65 + 900) / 1000, ease: "linear" }}
              />
              <motion.p
                className="mt-4 text-sm text-muted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: (NAME.length * 65) / 1000, duration: 0.4 }}
              >
                BI Developer
              </motion.p>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
