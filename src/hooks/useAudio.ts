import { useCallback, useEffect, useState } from "react";

export interface UseAudioReturn {
  isPlaying: boolean;
  playAudio: (songUrl: string) => Promise<void>;
  stopAudio: () => void;
  toggleAudio: () => void;
}

export function useAudio(): UseAudioReturn {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = useCallback(
    async (songUrl: string) => {
      if (audio) {
        audio.pause();
        audio.src = "";
        setAudio(null);
        setIsPlaying(false);
      }

      try {
        const newAudio = new Audio(songUrl);
        newAudio.loop = true;
        newAudio.volume = 0.5;

        await new Promise<void>((resolve, reject) => {
          newAudio.oncanplaythrough = () => resolve();
          newAudio.onerror = () => reject(new Error("Audio failed to load"));
          newAudio.onabort = () => reject(new Error("Audio loading aborted"));
        });

        setAudio(newAudio);
        await newAudio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Failed to play audio:", error);
        setIsPlaying(false);
      }
    },
    [audio]
  );

  const stopAudio = useCallback(() => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.src = "";
      setAudio(null);
      setIsPlaying(false);
    }
  }, [audio]);

  const toggleAudio = useCallback(() => {
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch((error) => {
        console.error("Failed to play audio:", error);
      });
      setIsPlaying(true);
    }
  }, [audio, isPlaying]);

  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        audio.src = "";
        audio.load();
      }
    };
  }, [audio]);

  return {
    isPlaying,
    playAudio,
    stopAudio,
    toggleAudio,
  };
}
