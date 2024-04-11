import { swatch, fileIcon, logoShirt, stylishShirt } from "../assets";


export const EditorTabs = [
  {
    name: "colorpicker",
    icon: swatch, //picture
  },
  {
    name: "filepicker",
    icon: fileIcon,//picture
  },
];

export const FilterTabs = [
  {
    name: "logoShirt",
    icon: logoShirt,//picture
  },
  {
    name: "stylishShirt",
    icon: stylishShirt,//picture
  },
];

// state รูป
export const DecalTypes = {
  logo: {
    stateProperty: "logoDecal",
    filterTab: "logoShirt",//picture
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "stylishShirt",//picture
  },
};
