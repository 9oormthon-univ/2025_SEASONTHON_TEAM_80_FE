import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AirplaneBackground from "@/assets/bg_airplane.webp";
import AirplaneObject from "@/assets/obj_airplane.webp";
import SwooshObject from "@/assets/obj_swoosh.webp";
import { NavigationButton } from "@/components/ui/navigation-button";
export default function LetterCompletePage() {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/");
  };

  return (
    <div className="dynamic-padding-top relative flex h-full w-full flex-col min-[451px]:md:pt-48 min-[451px]:sm:pt-44">
      <p className="mt-3 text-center font-primary text-[32px] text-red-200 leading-12">
        마음이 담긴 첫 곡이 <br />
        성공적으로 전송됐어요. <br />
        우리도 만들어볼까요?
      </p>

      <div className="relative flex-1 justify-center">
        <div className="relative m-auto mt-4 h-60 w-60 overflow-hidden">
          <img
            src={AirplaneBackground}
            alt="Airplane background"
            className="pointer-events-none h-full w-full select-none"
            draggable={false}
          />

          <motion.img
            src={SwooshObject}
            alt="Swoosh object"
            className="-translate-x-1/2 -translate-y-1/2 pointer-events-none absolute top-1/2 left-1/2 h-full w-full select-none will-change-transform"
            draggable={false}
            animate={{
              y: [-150, 150],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
              repeatDelay: 0.3,
            }}
          />

          <motion.img
            src={SwooshObject}
            alt="Swoosh object"
            className="-translate-x-1/2 -translate-y-1/2 pointer-events-none absolute top-1/2 left-1/2 h-full w-full select-none will-change-transform"
            draggable={false}
            animate={{
              y: [-150, 150],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
              repeatDelay: 0.3,
            }}
          />

          <motion.img
            src={AirplaneObject}
            alt="Airplane object"
            className="-translate-x-1/2 -translate-y-1/2 pointer-events-none absolute top-1/2 left-1/2 h-40 w-40 select-none will-change-transform"
            draggable={false}
            animate={{
              y: [300, -300],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          />
        </div>
      </div>

      <div className="z-10 mt-auto flex flex-row gap-3 pb-4">
        <NavigationButton active={true} className="flex flex-1 bg-brown-200">
          처음 화면
        </NavigationButton>
        <NavigationButton
          active={true}
          className="flex-2"
          onClick={handleNavigation}
        >
          나도 LP 보드 만들기
        </NavigationButton>
      </div>
    </div>
  );
}
