import { useState } from "react";
import { getBoardShare } from "@/apis/board";

interface ShareData {
  title: string;
  text: string;
  url: string;
}

type ShareResult =
  | { success: true; method: "native" }
  | { success: true; method: "clipboard"; url: string }
  | { success: false; error: unknown };

export const useShare = () => {
  const [isSharing, setIsSharing] = useState(false);

  const shareBoard = async (): Promise<ShareResult> => {
    setIsSharing(true);
    try {
      const response = await getBoardShare();
      const shareUrl = `${window.location.origin}/board/${response.data.shareUri}`;
      console.log("Generated share URL:", shareUrl);

      const shareData: ShareData = {
        title: "내 보드를 확인해보세요!",
        text: "친구들과 함께 만든 특별한 보드를 공유합니다.",
        url: shareUrl,
      };

      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isSafari =
        /Safari/.test(navigator.userAgent) &&
        !/Chrome/.test(navigator.userAgent);
      const isChrome = /Chrome/.test(navigator.userAgent);

      console.log("Device info:", { isIOS, isSafari, isChrome });

      if (navigator.share && isIOS && isSafari) {
        try {
          console.log("Attempting native share on iOS Safari...");
          await navigator.share(shareData);
          console.log("Native share successful");
          return { success: true, method: "native" };
        } catch (shareError) {
          console.log(
            "Native share failed, falling back to clipboard:",
            shareError
          );
        }
      }

      console.log("Using clipboard fallback");

      const copyMethods = [
        async () => {
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(shareUrl);
            console.log("URL copied via Clipboard API");
            return true;
          }
          return false;
        },

        async () => {
          return new Promise<boolean>((resolve) => {
            const textArea = document.createElement("textarea");
            textArea.value = shareUrl;
            textArea.style.position = "fixed";
            textArea.style.left = "-9999px";
            textArea.style.top = "-9999px";
            textArea.setAttribute("readonly", "");

            document.body.appendChild(textArea);

            if (isIOS) {
              const range = document.createRange();
              range.selectNodeContents(textArea);
              const selection = window.getSelection();
              selection?.removeAllRanges();
              selection?.addRange(range);
              textArea.setSelectionRange(0, 999999);
            } else {
              textArea.select();
            }

            try {
              const successful = document.execCommand("copy");
              document.body.removeChild(textArea);
              console.log("URL copied via execCommand:", successful);
              resolve(successful);
            } catch (error) {
              document.body.removeChild(textArea);
              console.log("execCommand failed:", error);
              resolve(false);
            }
          });
        },
      ];

      for (const method of copyMethods) {
        try {
          const success = await method();
          if (success) {
            return { success: true, method: "clipboard", url: shareUrl };
          }
        } catch (error) {
          console.log("Copy method failed:", error);
        }
      }

      console.log(
        "All copy methods failed, but returning success for user feedback"
      );
      return { success: true, method: "clipboard", url: shareUrl };
    } catch (error) {
      console.error("Share failed:", error);
      return { success: false, error };
    } finally {
      setIsSharing(false);
    }
  };

  return {
    shareBoard,
    isSharing,
  };
};
