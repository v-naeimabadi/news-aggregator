import { FunctionComponent } from "react";
import { GlyphName } from "../typings/glyph-name";
import { GlyphProps } from "../glyph";
import { Add } from "./add";
import { Apps } from "./apps";
import { ArrowLeft } from "./arrow-left";
import { ArrowRight } from "./arrow-right";
import { BackAndroid } from "./back-android";
import { BackIos } from "./back-ios";
import { Calendar } from "./calendar";
import { Edit } from "./edit";
import { FilterClear } from "./filter-clear";
import { Filter } from "./filter";
import { Remove } from "./remove";
import { Reports } from "./reports";
import { Search } from "./search";
import { Settings } from "./settings";
import { Upload } from "./upload";
import { Warning } from "./warning";
import { Web } from "./web";

const glyphsMap: Record<
  GlyphName,
  FunctionComponent<Omit<GlyphProps, "name">>
> = {
  add: Add,
  apps: Apps,
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  "back-android": BackAndroid,
  "back-ios": BackIos,
  calendar: Calendar,
  edit: Edit,
  "filter-clear": FilterClear,
  filter: Filter,
  map: Map,
  remove: Remove,
  reports: Reports,
  search: Search,
  settings: Settings,
  upload: Upload,
  warning: Warning,
  web: Web,
};

export default glyphsMap;
