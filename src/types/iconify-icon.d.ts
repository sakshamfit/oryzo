import 'react';

/* Type support for the <iconify-icon> web component (Iconify). */
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'iconify-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        icon?: string;
        width?: string | number;
        height?: string | number;
        inline?: boolean;
        flip?: string;
        rotate?: string;
        onLoad?: never;
      };
    }
  }
}
