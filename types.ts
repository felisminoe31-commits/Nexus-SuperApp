import { LucideIcon } from 'lucide-react';

export type Language = 'en' | 'pt';

export type Category = 'Productivity' | 'Creativity' | 'Utilities' | 'Viral' | 'All';

export type ToolType = 
  | 'resume' 
  | 'roast' 
  | 'mystic' 
  | 'email' 
  | 'homework' 
  | 'image_gen' 
  | 'general_text';

export type InputType = 'text' | 'image' | 'both';
export type OutputType = 'text' | 'image';

export interface Tool {
  id: number;
  type: ToolType; 
  name: string;
  namePt: string;
  icon: LucideIcon;
  category: Category;
  description: string;
  descriptionPt: string;
  inputType: InputType;
  outputType: OutputType;
}

export interface HistoryItem {
  id: string;
  toolName: string;
  input: string;
  output: string; // Can be text or base64 image url
  outputType: OutputType;
  timestamp: number;
}

export type AppView = 'landing' | 'dashboard' | 'tool';

export interface Translations {
  landing: {
    headline: string;
    subheadline: string;
    cta_lifetime: string;
    cta_daily: string;
    cta_free: string;
    benefits_title: string;
    benefits: string[];
  };
  dashboard: {
    search_placeholder: string;
    categories: Record<Category, string>;
    welcome: string;
    history_title: string;
    history_empty: string;
    logout: string;
    close: string;
    clear_history: string;
  };
  common: {
    back: string;
    unlock: string;
    processing: string;
    generate: string;
    input_label: string;
    result_label: string;
    placeholder: string;
    upload_image: string;
    remove_image: string;
    download_image: string;
  };
}