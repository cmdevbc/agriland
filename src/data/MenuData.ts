interface MenuItem {
  id: number;
  title: string;
  link: string;
  has_dropdown: boolean;
  sub_menus?: {
    link: string;
    title: string;
  }[];
}
[];

const menu_data: MenuItem[] = [
  {
    id: 1,
    has_dropdown: false,
    title: "Home",
    link: "/",
  },
  {
    id: 2,
    has_dropdown: false,
    title: "BUY $ALT",
    link: "/#feature",
  },
  {
    id: 3,
    has_dropdown: false,
    title: "How to Buy",
    link: "/#chart",
  },
  {
    id: 4,
    has_dropdown: false,
    title: "Info",
    link: "/#roadMap",
  },
  {
    id: 6,
    has_dropdown: false,
    title: "Contact",
    link: "/contact",
  },
];
export default menu_data;
