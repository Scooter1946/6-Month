"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { memories, Memory } from "@/data/memories";
import { bentoMemories } from "@/data/bentoMemories";
import { ChevronDown, Play, Pause, ZoomIn, X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // State for Snap Story
  const [activeSection, setActiveSection] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMusicVisible, setIsMusicVisible] = useState(false);

  // State for Bento Gallery Lightbox
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  // Intersection Observer to detect which section of the snap story we are in
  // -1 represents the intro splash screen
  // 0 to memories.length - 1 represents the memories
  // memories.length represents the bento grid section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveSection(index);

            // Hide the music player on the intro screen and the Bento grid.
            // Only show it during the actual Snap Story section
            if (index >= 0 && index < memories.length) {
              setIsMusicVisible(true);
            } else {
              setIsMusicVisible(false);
            }
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 0.6,
      }
    );

    const sections = document.querySelectorAll(".snap-section");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative h-[100dvh] w-full bg-black overflow-hidden font-sans">

      {/* Background Audio */}
      <audio ref={audioRef} loop src="https://assets.mixkit.co/music/preview/mixkit-beautiful-dream-493.mp3" />

      {/* Floating Music Toggle - Only visible during Snap Story */}
      <AnimatePresence>
        {isMusicVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={toggleAudio}
            className="fixed bottom-8 right-8 z-50 inline-flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all group shadow-xl"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white" />
            ) : (
              <Play className="w-5 h-5 text-white ml-1" />
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Vertical Progress Bar - Only visible during Snap Story */}
      <AnimatePresence>
        {isMusicVisible && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-2"
          >
            {memories.map((_, index) => (
              <div
                key={index}
                className={`w-1 transition-all duration-300 rounded-full ${activeSection === index ? "h-8 bg-white" : "h-2 bg-white/30"
                  }`}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 
        MAIN SCROLL CONTAINER
        Uses CSS scroll snap to lock sections into place
      */}
      <div
        ref={containerRef}
        className="h-[100dvh] w-full overflow-y-auto snap-y snap-mandatory hide-scrollbar"
      >

        {/* =========================================
            SECTION 1: INTRO SPLASH
            ========================================= */}
        <motion.section
          data-index={-1}
          initial={{ backgroundColor: "#000000", opacity: 0 }}
          animate={{ backgroundColor: "#fff1f2", opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="snap-section snap-start h-[100dvh] w-full relative flex flex-col items-center justify-center overflow-hidden text-stone-900"
        >
          {/* Decorative background blobs */}
          <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-rose-200/30 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[120%] h-[120%] bg-orange-100/30 rounded-full blur-[150px] pointer-events-none" />

          <div className="z-10 max-w-3xl w-full text-center space-y-8 px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="inline-flex items-center justify-center p-4 bg-white/80 backdrop-blur-sm rounded-full shadow-sm mb-4 animate-[bounce_3s_infinite]"
            >
              <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="text-5xl sm:text-6xl md:text-8xl font-serif tracking-tight text-stone-800 drop-shadow-sm whitespace-nowrap"
            >
              Our First 6 Months
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 1 }}
              className="text-xl md:text-2xl text-stone-500 max-w-xl mx-auto font-light leading-relaxed"
            >
              Happy Anniversary Honey!!
            </motion.p>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-stone-400 animate-bounce"
          >
            {/* Sleeping Kitten resting on the text bubble */}
            <motion.img
              src="/kitten_transparent.png"
              alt="Sleeping Kitten"
              className="w-24 h-24 -mb-8 z-10 pointer-events-none drop-shadow-sm"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 1, 0, -1, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <span className="relative z-0 text-xs tracking-[0.2em] font-medium uppercase mb-3 px-4 py-1.5 bg-white/50 backdrop-blur-md rounded-full border border-stone-200/50 shadow-sm">
              Scroll Down!
            </span>
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.section>


        {/* =========================================
            SECTION 2: MULTIPLE SNAP STORY SECTIONS
            ========================================= */}
        {memories.map((memory, index) => {
          const catSources = [
            '/kitten_playing.png',
            '/kitten_rolling.png',
            '/kitten_standing.png',
            '/kitten_transparent.png',
          ];
          const catSrc = catSources[index % 4];

          return (
            <section
              key={memory.id}
              data-index={index}
              className="snap-section snap-start h-[100dvh] w-full relative flex items-center justify-center overflow-hidden bg-stone-900 text-stone-100"
            >
              {/* Background Map Media */}
              <div className="absolute inset-0 z-0 bg-black">
                {memory.mediaType === 'image' ? (
                  <img
                    src={memory.mediaUrl}
                    alt={memory.title}
                    className={`w-full h-full object-cover scale-105 opacity-80 ${memory.className || ''}`}
                  />
                ) : (
                  <video
                    src={memory.mediaUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover scale-105 opacity-80"
                  />
                )}
                <div className="absolute inset-0 bg-black/50 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
              </div>

              {/* Glassmorphism Story Card Container */}
              <div className={`absolute inset-0 z-10 w-full flex p-4 md:p-12 ${memory.textPositionClass || "justify-center items-end pb-24 md:items-center md:pb-12"}`}>
                <AnimatePresence mode="wait">
                  {activeSection === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 40, backdropFilter: "blur(0px)" }}
                      animate={{ opacity: 1, y: 0, backdropFilter: "blur(16px)" }}
                      exit={{ opacity: 0, y: -40, backdropFilter: "blur(0px)" }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="p-8 md:p-12 rounded-3xl bg-black/40 border border-white/10 shadow-2xl relative overflow-hidden max-w-xl w-full"
                    >
                      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />

                      {/* Kitten sitting on the date */}
                      <motion.img
                        src={catSrc}
                        alt="Playful Kitten"
                        className="w-20 h-20 -mb-3 z-10 relative pointer-events-none drop-shadow-md"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
                      />

                      <span className="inline-block px-3 py-1 mb-6 relative z-0 text-xs font-semibold tracking-widest text-white uppercase bg-white/10 rounded-full border border-white/20">
                        {memory.date}
                      </span>
                      <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 drop-shadow-md">
                        {memory.title}
                      </h2>
                      <div className="overflow-y-auto max-h-48 pr-4 hide-scrollbar">
                        <p className="text-stone-200 text-lg font-light leading-relaxed">
                          {memory.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>
          )
        })}


        {/* =========================================
            SECTION 3: QUOTE INTERMISSION
            ========================================= */}
        <section
          data-index={memories.length}
          className="snap-section snap-start h-[100dvh] w-full relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-stone-900 to-[#fff1f2] text-stone-100 px-4"
        >
          {/* Decorative background blobs fading up from the gallery below */}
          <div className="absolute bottom-[-50%] left-[-10%] w-[120%] h-[100%] bg-rose-200/30 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute bottom-[-30%] right-[-10%] w-[100%] h-[100%] bg-orange-100/30 rounded-full blur-[150px] pointer-events-none" />

          {/* Playful Floating Kitten */}
          <motion.img
            src="/kitten_playing.png"
            alt="Playing Kitten"
            className="absolute top-12 left-8 md:top-24 md:left-24 z-30 w-24 h-24 md:w-36 md:h-36 pointer-events-none drop-shadow-md opacity-90"
            initial={{ opacity: 0, y: -20, rotate: -10 }}
            whileInView={{ opacity: 0.9, y: 0, rotate: 5 }}
            transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
            viewport={{ once: true }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
            className="max-w-3xl text-center"
          >
            <Heart className="w-12 h-12 text-rose-400 fill-rose-400 mx-auto mb-8 animate-[pulse_3s_infinite]" />
            <h2 className="font-serif text-3xl md:text-5xl text-stone-800 leading-snug tracking-wide mb-6">
              "To get the full value of joy, you must have someone to divide it with."
            </h2>
            <div className="w-16 h-[1px] bg-rose-400 mx-auto mb-4" />
            <span className="text-sm md:text-base text-rose-500 uppercase tracking-[0.3em] font-medium">
              Mark Twain
            </span>
          </motion.div>
        </section>

        {/* =========================================
            SECTION 4: BENTO GALLERY
            ========================================= */}
        <section
          data-index={memories.length + 1}
          className="snap-section snap-start min-h-[100dvh] w-full bg-[#fff1f2] py-24 relative overflow-hidden"
        >
          {/* Decorative background blobs - Matching the Splash Screen */}
          <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-rose-200/30 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[120%] h-[120%] bg-orange-100/30 rounded-full blur-[150px] pointer-events-none" />

          {/* Kitten Lying on Back Playing Decor */}
          <motion.img
            src="/kitten_yarn_back.png"
            alt="Playing Kitten"
            className="absolute top-4 left-4 md:top-8 md:left-24 z-30 w-24 h-24 md:w-32 md:h-32 pointer-events-none drop-shadow-sm opacity-90"
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            whileInView={{ opacity: 0.9, scale: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
            viewport={{ once: true }}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-serif text-stone-800 mb-6 tracking-tight">
                Other Memories
              </h2>
              <p className="text-stone-500 font-light text-lg max-w-2xl mx-auto">
                Memories we've made along the way, documenting our first 6 months!
              </p>
            </div>

            {/* Grid Container */}
            <div className="relative z-20 grid grid-flow-row-dense grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-4 md:gap-6">
              {bentoMemories.map((memory) => {
                const spanClass =
                  memory.width === 2 && memory.height === 2 ? 'md:col-span-2 md:row-span-2' :
                    memory.width === 2 && memory.height === 1 ? 'md:col-span-2 md:row-span-1' :
                      memory.width === 1 && memory.height === 2 ? 'md:col-span-1 md:row-span-2' :
                        'md:col-span-1 md:row-span-1';

                return (
                  <div
                    key={memory.id}
                    className={`${spanClass} group relative rounded-3xl overflow-hidden cursor-pointer bg-white shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1`}
                    onClick={() => setSelectedMemory(memory)}
                  >
                    <div className="absolute inset-0 z-0">
                      {memory.mediaType === 'image' ? (
                        <Image
                          src={memory.mediaUrl}
                          alt={memory.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className={`object-cover transition-transform duration-700 group-hover:scale-110 ${memory.className || ''}`}
                        />
                      ) : (
                        <video
                          src={memory.mediaUrl}
                          muted loop playsInline autoPlay
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      )}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100 z-10" />

                    <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="flex justify-between items-end">
                        <div>
                          <span className="text-rose-300 text-xs font-semibold tracking-wider uppercase mb-1 block">
                            {memory.date}
                          </span>
                          <h3 className="text-white font-serif text-xl sm:text-2xl leading-tight">
                            {memory.title}
                          </h3>
                        </div>
                        <div className="bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30 text-white">
                          <ZoomIn className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

            </div>

            {/* Ending Message */}
            <div className="mt-24 pb-12 text-center">
              <h3 className="font-serif text-3xl md:text-5xl text-rose-400/80 mb-4 italic">
                ...and many more to come!
              </h3>
              <div className="flex justify-center gap-2 text-rose-300">
                <Heart className="w-4 h-4 fill-current" />
                <Heart className="w-5 h-5 fill-current" />
                <Heart className="w-4 h-4 fill-current" />
              </div>
            </div>

          </div>
        </section>

      </div>

      {/* =========================================
          GLOBAL LIGHTBOX MODAL
          ========================================= */}
      <Dialog.Root open={!!selectedMemory} onOpenChange={(open) => !open && setSelectedMemory(null)}>
        <AnimatePresence>
          {selectedMemory && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
                />
              </Dialog.Overlay>
              <Dialog.Content asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl z-50 px-4 md:px-0 outline-none"
                >
                  <div className="bg-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row relative">

                    <Dialog.Close className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-md transition-colors">
                      <X className="w-5 h-5" />
                      <span className="sr-only">Close</span>
                    </Dialog.Close>

                    <div className="w-full md:w-2/3 h-[50vh] md:h-[70vh] bg-black relative">
                      {selectedMemory.mediaType === 'image' ? (
                        <img
                          src={selectedMemory.mediaUrl}
                          alt={selectedMemory.title}
                          className={`w-full h-full object-contain ${selectedMemory.className || ''}`}
                        />
                      ) : (
                        <video
                          src={selectedMemory.mediaUrl}
                          controls autoPlay
                          className="w-full h-full object-contain"
                        />
                      )}
                    </div>

                    <div className="w-full md:w-1/3 p-8 md:p-10 flex flex-col justify-center bg-stone-900 border-t md:border-t-0 md:border-l border-white/10">
                      <span className="text-rose-400 font-semibold text-sm tracking-widest uppercase mb-4 block">
                        {selectedMemory.date}
                      </span>
                      <Dialog.Title className="text-3xl md:text-4xl font-serif text-white mb-6">
                        {selectedMemory.title}
                      </Dialog.Title>
                      <Dialog.Description className="text-stone-300 font-light leading-relaxed text-lg">
                        {selectedMemory.description}
                      </Dialog.Description>
                    </div>

                  </div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>

    </div>
  );
}
