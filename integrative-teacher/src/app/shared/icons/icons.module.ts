import { NgModule } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import {
  Activity,
  AlertCircle,
  Archive,
  ChevronLeft,
  FilePlus,
  FileText,
  Home,
  List,
  MessageCircle,
  PieChart,
  Upload,
  Download,
  Users,
  User,
  Printer,
  Grid,
  Menu,
  Database,
  Layout,
  Edit,
  Delete,
  ExternalLink,
  Trash2,
  Trello,
  Award,
  Bookmark
} from 'angular-feather/icons';

// Check all icons available: https://feathericons.com/

// Select some icons (use an object, not an array)
const icons = {
  ChevronLeft,
  Home,
  PieChart,
  Activity,
  List,
  MessageCircle,
  AlertCircle,
  Upload,
  Download,
  FilePlus,
  FileText,
  Users,
  User,
  Archive,
  Printer,
  Grid,
  Menu,
  Database,
  Layout,
  Edit,
  Delete,
  ExternalLink,
  Trash2,
  Trello,
  Award,
  Bookmark
};

@NgModule({
  imports: [
    FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ]
})
export class IconsModule { }
