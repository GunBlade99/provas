
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const allCards = [
  { name: "Infernape V", rarity: "rare", img: "/mnt/data/OIP.jpg" },
  { name: "Glaceon VMAX", rarity: "ultra", img: "/mnt/data/pokemonevolvingskies041__83278.jpg" },
  { name: "Vaporeon VMAX", rarity: "ultra", img: "/mnt/data/Vaporeon_VMAX_(Cielos_Evolutivos_TCG).png" },
];

const getRandomPack = () => {
  const shuffled = allCards.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
};

export default function PokemonPackOpener() {
  const [packOpened, setPackOpened] = useState(false);
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [ripped, setRipped] = useState(false);
  const [startX, setStartX] = useState(null);
  const [collection, setCollection] = useState([]);
  const audioRef = useRef(null);

  const handleOpenPack = () => {
    setRipped(true);
    if (audioRef.current) {
      audioRef.current.play();
    }
    setTimeout(() => {
      const newPack = getRandomPack();
      setCards(newPack);
      setPackOpened(true);
      setCurrentCard(0);
      setCollection((prev) => [...prev, ...newPack]);
    }, 1000);
  };

  const handleNextCard = () => {
    if (currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1);
    }
  };

  const handleStart = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
  };

  const handleEnd = (e) => {
    const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const diffX = clientX - startX;

    if (!packOpened && !ripped && Math.abs(diffX) > 50) {
      handleOpenPack();
    } else if (packOpened && diffX < -50) {
      handleNextCard();
    }

    setStartX(null);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-200 flex flex-col items-center justify-center p-6"
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
    >
      <audio ref={audioRef} src="/sounds/rip.mp3" preload="auto" />

      {!packOpened && !ripped && (
        <motion.img
          src="/mnt/data/A_digital_illustration_displays_a_Pokémon_Trading_.png"
          alt="Pack"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-64 h-96 object-contain cursor-pointer"
        />
      )}

      {ripped && !packOpened && (
        <motion.div
          initial={{ scale: 1, rotate: 0 }}
          animate={{ scale: 0, rotate: 720 }}
          transition={{ duration: 1 }}
          className="w-64 h-96 bg-red-600 rounded-xl shadow-xl flex items-center justify-center text-white text-2xl font-bold"
        >
          Strappo...
        </motion.div>
      )}

      {packOpened && (
        <div className="relative w-72 h-96">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentCard}
              onClick={handleNextCard}
              className={\`absolute top-0 left-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl cursor-pointer \${cards[currentCard].rarity === "ultra" ? "ring-4 ring-purple-500 animate-pulse" : cards[currentCard].rarity === "rare" ? "ring-2 ring-yellow-400" : ""}\`}
              initial={{ x: 0, opacity: 1 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 500, opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ zIndex: 10 }}
            >
              <img
                src={cards[currentCard].img}
                alt={cards[currentCard].name}
                className="w-full h-full object-cover rounded-2xl"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {packOpened && (
        <div className="mt-4">
          <p className="text-xl font-bold">{cards[currentCard]?.name}</p>
          {currentCard >= cards.length - 1 && (
            <Button
              className="mt-2"
              onClick={() => {
                setPackOpened(false);
                setRipped(false);
              }}
            >
              Apri un altro Pacchetto
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
