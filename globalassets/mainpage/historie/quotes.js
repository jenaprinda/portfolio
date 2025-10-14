const quotes = [
  { main: "Život je to, co se děje, zatímco máš jiné plány.", sub: "John Lennon" },
  { main: "Jediný způsob, jak dělat skvělou práci, je milovat to, co děláš.", sub: "Steve Jobs" },
  { main: "Budoucnost patří těm, kteří věří v krásu svých snů.", sub: "Eleanor Rooseveltová" },
  { main: "Není důležité, jak pomalu jdeš, pokud se nezastavíš.", sub: "Konfucius" },
  { main: "Moudrý člověk nemluví o tom, co dělá, ale dělá to, o čem nemluví.", sub: "Neznámý autor" },
  { main: "Všechno, co si dokážeš představit, je skutečné.", sub: "Pablo Picasso" },
  { main: "Štěstí není něco, co máš odložené. Přichází z tvých vlastních činů.", sub: "Dalajláma" },
  { main: "Vždycky se zdá, že je to nemožné, dokud to není hotové.", sub: "Nelson Mandela" },
  { main: "Kdo se nehýbe, ten nic nemění. Kdo nic nemění, ten nic nezlepšuje.", sub: "Winston Churchill" },
  { main: "Chyba je jen další způsob, jak něco udělat.", sub: "Henry Ford" },
  { main: "Příležitosti se neobjevují, ty je vytváříš.", sub: "Chris Grosser" },
  { main: "Úspěch není klíčem ke štěstí. Štěstí je klíčem k úspěchu.", sub: "Albert Schweitzer" },
  { main: "Cesta tisíce mil začíná jediným krokem.", sub: "Lao-c’" },
  { main: "Lepší být nenáviděn pro to, kým jsi, než milován pro to, kým nejsi.", sub: "André Gide" },
  { main: "Zkus být duhou v něčím mraku.", sub: "Maya Angelou" },
  { main: "Inovace rozlišuje lídra od následovníka.", sub: "Steve Jobs" },
  { main: "Jediná opravdová moudrost je vědět, že nevíš nic.", sub: "Sokrates" },
  { main: "Hranice neexistují, jsou jen v mysli.", sub: "Neznámý autor" },
  { main: "Úspěch je přechod od neúspěchu k neúspěchu bez ztráty nadšení.", sub: "Winston Churchill" },
  { main: "Člověk, který nikdy neudělal chybu, nikdy nezkusil nic nového.", sub: "Albert Einstein" },
  { main: "Nejde o to, kolikrát spadneš, ale kolikrát vstaneš.", sub: "Vince Lombardi" },
  { main: "Dělej to, co miluješ, a nebudeš muset pracovat ani den v životě.", sub: "Konfucius" },
  { main: "Nic není silnější než myšlenka, jejíž čas nadešel.", sub: "Victor Hugo" },
  { main: "Každý den udělej jednu věc, která tě děsí.", sub: "Eleanor Rooseveltová" },
  { main: "Fantazie je důležitější než vědění, neboť vědění je omezené.", sub: "Albert Einstein" },
  { main: "Nemůžeš změnit směr větru, ale můžeš nastavit plachty.", sub: "James Dean" },
  { main: "Svět je kniha a ti, kteří necestují, čtou jen jednu stránku.", sub: "Svatý Augustin" },
  { main: "Nečekej. Ten správný čas nikdy nenastane.", sub: "Napoleon Hill" },
  { main: "Charakter člověka se nepozná podle jeho řečí, ale podle jeho činů.", sub: "Neznámý autor" },
  { main: "Náš život je výsledkem našich myšlenek.", sub: "Marcus Aurelius" },
  { main: "Účelem našeho života je být šťastný.", sub: "Dalajláma" },
  { main: "Včerejšek je historie, zítřek je záhada, dnešek je dar.", sub: "Eleanor Rooseveltová" },
  { main: "Nejtěžší je rozhodnutí jednat, zbytek je jen houževnatost.", sub: "Amelia Earhart" },
  { main: "Vzdělání je nejsilnější zbraň, kterou můžeš použít ke změně světa.", sub: "Nelson Mandela" },
  { main: "Kritizovat se je nejlepší způsob, jak se zlepšit.", sub: "Neznámý autor" },
  { main: "Pochybovat o všem nebo věřit všemu jsou dvě stejně pohodlná řešení.", sub: "Henri Poincaré" },
  { main: "Být bohatý není to, co máš v bance, ale to, co máš v srdci.", sub: "Neznámý autor" }

];

const mainQuote = document.getElementById("mainQuote");
const subQuote = document.getElementById("subQuote");
let lastIndex = -1;

function getRandomIndex() {
  let index;
  do {
    index = Math.floor(Math.random() * quotes.length);
  } while (index === lastIndex);
  lastIndex = index;
  return index;
}

function updateQuote() {
  // fade out
  mainQuote.style.opacity = 0;
  subQuote.style.opacity = 0;

  setTimeout(() => {
    const { main, sub } = quotes[getRandomIndex()];
    mainQuote.textContent = main;
    subQuote.textContent = sub;

    // fade in
    mainQuote.style.opacity = 1;
    subQuote.style.opacity = 1;
  }, 800); // slightly shorter than CSS transition to avoid jump
}

// initial call
updateQuote();

// change every 10 seconds
setInterval(updateQuote, 5000);
