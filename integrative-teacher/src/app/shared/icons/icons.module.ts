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
  Printer,
  Grid,
  Menu,
  Database,
  Layout,
  Edit,
  Delete,
  ExternalLink,
  Trash2,
  ChevronRight
} from 'angular-feather/icons';

// Check all icons available: https://github.com/michaelbazos/angular-feather

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
  ChevronRight
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
