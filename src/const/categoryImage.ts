import { link } from "fs";
import banner1 from "./../../public/images/home/category/banner1.jpg";
import banner2 from "./../../public/images/home/category/banner2.jpg";
import desktopBanner1 from "./../../public/images/home/category//desktopBanner1.png";
import desktopBanner2 from "./../../public/images/home/category//desktopBanner2.png";
import desktopBanner3 from "./../../public/images/home/category//desktopBanner3.png";
import desktopBanner4 from "./../../public/images/home/category//desktopBanner4.png";

export const mobileBanners = [
  { image: banner1, link: "/" },
  { image: banner2, link: "/" },
];

export const desktopBanners = [
  { image: desktopBanner3, link: "/", class: "absoluteImage" },
  { image: desktopBanner2, link: "/", class: "smallImage" },
  { image: desktopBanner1, link: "/", class: "smallImage" },
  { image: desktopBanner4, link: "/", class: "wideImage" },
];
