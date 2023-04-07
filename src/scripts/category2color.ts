const categoriesColors: { [key: string]: string } = {
  "diatomic nonmetal": "#3e641899",
  "noble gas": "#3a215199",
  "alkali metal": "#6c3b0199",
  "alkaline earth metal": "#84601199",
  metalloid: "#01514699",
  "polyatomic nonmetal": "#3e641899",
  "post-transition metal": "#00366699",
  "transition metal": "#71101999",
  lanthanide: "#402c1799",
  actinide: "#732e4c99",

  "unknown, probably transition metal": "#71101944",
  "unknown, probably post-transition metal": "#00366644",
  "unknown, probably metalloid": "#01514644",
  "unknown, predicted to be noble gas": "#3a215144",
  "unknown, but predicted to be an alkali metal": "#6c3b0144",
};

export default function getCategoryColor(category: string) {
  return categoriesColors?.[category] ?? "#55555588";
}
