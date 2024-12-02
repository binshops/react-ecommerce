export type AccordionItemProps = {
  title: string;
  links: { title: string; link: string }[];
  titleLink: string;
  mode?: "dark" | "light";
};
