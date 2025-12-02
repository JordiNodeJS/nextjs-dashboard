// Type declarations for CSS imports
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

// Allow side-effect imports for CSS files
declare module "@/app/ui/global.css";
