export const animationCreate = () => {
  if (typeof window !== "undefined") {
    import("wowjs").then((module) => {
      const WOW = module.default;
      new WOW.WOW({ live: false }).init();
    });
  }
};

export const numberWithCommas = (x: string) => {
  if (x == "0") {
    return 0;
  }
  var parts = x?.toString()?.split(".");
  if (parts?.length > 0) {
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }
  return x;
  //return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
