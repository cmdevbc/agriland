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
  // {
  //   id: 2,
  //   has_dropdown: false,
  //   title: "BUY $ALT",
  //   link: "/#buy",
  // },
  {
    id: 3,
    has_dropdown: false,
    title: "How to Buy",
    link: "/#how",
  },
  {
    id: 4,
    has_dropdown: false,
    title: "Info",
    link: "/#info",
  },
  {
    id: 5,
    has_dropdown: false,
    title: "Contact",
    link: "/#contact",
  },
];
export default menu_data;
