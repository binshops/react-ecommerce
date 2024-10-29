export type AccordionItemProps = {
  title: string;
  links: { title: string; link: string }[];
  titleLink: string;
  setIsLoading?: Function;
  mode?: "dark" | "light";
};
