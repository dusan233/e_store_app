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
      { name: "PS5 Igre", linkTo: "/" },
      { name: "PS5 Konzole", linkTo: "/" },
      { name: "PS5 Oprema", linkTo: "/" },
    ],
  },
  {
    title: "Playstation 4 PS4",
    img: playstation4Banner,
    links: [
      { name: "PS4 Igre", linkTo: "/" },
      { name: "PS4 Konzole", linkTo: "/" },
      { name: "PS4 Oprema", linkTo: "/" },
    ],
  },
];

export const xbox = [
  {
    title: "XBOX Series X/S",
    img: xboxSeriesXBanner,
    links: [
      { name: "XBOX Series X Igre", linkTo: "/" },
      { name: "XBOX Series X/S Konzola", linkTo: "/" },
      { name: "XBOX Series X/S Oprema", linkTo: "/" },
    ],
  },
  {
    title: "XBOX ONE",
    img: xboxOneBanner,
    links: [
      { name: "XBOX ONE Igre", linkTo: "/" },
      { name: "XBOX ONE Konzola", linkTo: "/" },
      { name: "XBOX ONE Oprema", linkTo: "/" },
    ],
  },
];

export const nintendo = [
  {
    title: "Switch",
    img: switchBanner,
    links: [
      { name: "Switch Igre", linkTo: "/" },
      { name: "Switch Konzole", linkTo: "/" },
      { name: "Switch Oprema", linkTo: "/" },
    ],
  },
];

export const pc = [
  {
    title: "PC Gaming",
    img: pcBanner,
    links: [
      { name: "PC Igre", linkTo: "/" },
      { name: "PC Oprema", linkTo: "/" },
      { name: "Laptopovi", linkTo: "/" },
    ],
  },
];
