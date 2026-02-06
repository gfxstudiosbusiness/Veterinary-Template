"use client";

import {
  PawPrint,
  Stethoscope,
  Syringe,
  Activity, // Heartbeat -> Activity
  Microscope,
  ShoppingBag,
  ShieldCheck,
  Heart,
  Loader2, // CircleNotch -> Loader2
  ArrowRight,
  ChevronRight, // CaretRight -> ChevronRight
  ChevronLeft, // CaretLeft -> ChevronLeft
  Menu, // List -> Menu
  X,
  Facebook, // FacebookLogo -> Facebook
  MapPin,
  Phone,
  Clock,
  Mail, // Envelope -> Mail
  Key,
  Users,
  Calendar,
  Medal,
  Plus,
  Upload,
  Trash,
  CheckCircle,
  XCircle,
  RotateCw, // ArrowsClockwise -> RotateCw
  Settings, // Gear -> Settings
  CalendarX,
  CalendarCheck,
  Check,
  Dog,
  User,
  CalendarDays, // CalendarBlank -> CalendarDays
  AlertCircle, // WarningCircle -> AlertCircle
  LayoutDashboard, // SquaresFour -> LayoutDashboard
  LogOut, // SignOut -> LogOut
  Image as LucideImage, // Image -> Image (renamed to avoid conflict with next/image if needed, but here just exporting)
} from "lucide-react";

// Export with original names to maintain compatibility where possible, 
// or export new names and I'll update the usages. 
// Strategy: Export AS the original name where possible to minimize usage changes,
// OR export const aliases.

export const CaretRight = ChevronRight;
export const CaretLeft = ChevronLeft;
export const List = Menu;
export const FacebookLogo = Facebook;
export const Envelope = Mail;
export const CircleNotch = Loader2;
export const ArrowsClockwise = RotateCw;
export const Gear = Settings;
export const CalendarBlank = CalendarDays;
export const WarningCircle = AlertCircle;
export const SquaresFour = LayoutDashboard;
export const SignOut = LogOut;
export const Heartbeat = Activity;
export const Image = LucideImage;

// Direct exports for ones that match
export {
  PawPrint,
  Stethoscope,
  Syringe,
  Microscope,
  ShoppingBag,
  ShieldCheck,
  Heart,
  ArrowRight,
  X,
  MapPin,
  Phone,
  Clock,
  Key,
  Users,
  Calendar,
  Medal,
  Plus,
  Upload,
  Trash,
  CheckCircle,
  XCircle,
  CalendarX,
  CalendarCheck,
  Check,
  Dog,
  User,
};
