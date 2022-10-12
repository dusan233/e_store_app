import playstation5Banner from "../../images/Playstation-PS5.jpg";
import playstation4Banner from "../../images/Playstation-PS4.jpg";
import xboxSeriesXBanner from "../../images/Xbox-seriesX.jpg";
import xboxOneBanner from "../../images/XBOX-Xbox-One.jpg";
import switchBanner from "../../images/Nintendo-Switch.jpg";
import pcBanner from "../../images/PC-igre.jpg";

export const playstation = [
  {
    title: "Playstation 5 PS5",
    img: playstation5Banner,
    links: [
      { name: "PS5 Igre", linkTo: "Game,ps5" },
      { name: "PS5 Konzole", linkTo: "Console,ps5" },
      { name: "PS5 Oprema", linkTo: "Equipment,ps5" },
    ],
  },
  {
    title: "Playstation 4 PS4",
    img: playstation4Banner,
    links: [
      { name: "PS4 Igre", linkTo: "Game,ps4" },
      { name: "PS4 Konzole", linkTo: "Console,ps4" },
      { name: "PS4 Oprema", linkTo: "Equipment,ps4" },
    ],
  },
];

export const xbox = [
  {
    title: "XBOX Series X/S",
    img: xboxSeriesXBanner,
    links: [
      { name: "XBOX Series X Igre", linkTo: "Game,Xbox Series X/S" },
      { name: "XBOX Series X/S Konzola", linkTo: "Console,Xbox Series X/S" },
      { name: "XBOX Series X/S Oprema", linkTo: "Equipment,Xbox Series X/S" },
    ],
  },
  {
    title: "XBOX ONE",
    img: xboxOneBanner,
    links: [
      { name: "XBOX ONE Igre", linkTo: "Game,Xbox One" },
      { name: "XBOX ONE Konzola", linkTo: "Console,Xbox One" },
      { name: "XBOX ONE Oprema", linkTo: "Equipment,Xbox One" },
    ],
  },
];

export const nintendo = [
  {
    title: "Switch",
    img: switchBanner,
    links: [
      { name: "Switch Igre", linkTo: "Game,Nintendo Switch" },
      { name: "Switch Konzole", linkTo: "Console,Nintendo Switch" },
      { name: "Switch Oprema", linkTo: "Equipment,Nintendo Switch" },
    ],
  },
];

export const pc = [
  {
    title: "PC Gaming",
    img: pcBanner,
    links: [
      { name: "PC Igre", linkTo: "Game,PC" },
      { name: "PC Oprema", linkTo: "Console,PC" },
      { name: "Laptopovi", linkTo: "Equipment,PC" },
    ],
  },
];
