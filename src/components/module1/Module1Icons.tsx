import React from 'react';

export const IconBase: React.FC<{ children: React.ReactNode; size?: number; className?: string; color?: string }> = ({
    children,
    size = 24,
    className = "",
    color = "currentColor"
}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        {children}
    </svg>
);

export const Globe = (props: any) => <IconBase {...props}><circle cx="12" cy="12" r="10" /><line x1="2" x2="22" y1="12" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></IconBase>;
export const Share2 = (props: any) => <IconBase {...props}><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" x2="15.42" y1="13.51" y2="17.49" /><line x1="15.41" x2="8.59" y1="6.51" y2="10.49" /></IconBase>;
export const NetworkIcon = (props: any) => <IconBase {...props}><rect x="16" y="16" width="6" height="6" rx="1" /><rect x="2" y="16" width="6" height="6" rx="1" /><rect x="9" y="2" width="6" height="6" rx="1" /><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" /><line x1="12" x2="12" y1="12" y2="8" /></IconBase>;
export const Server = (props: any) => <IconBase {...props}><rect width="20" height="8" x="2" y="2" rx="2" ry="2" /><rect width="20" height="8" x="2" y="14" rx="2" ry="2" /><line x1="6" x2="6.01" y1="6" y2="6" /><line x1="6" x2="6.01" y1="18" y2="18" /></IconBase>;
export const Laptop = (props: any) => <IconBase {...props}><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9" /><path d="M2 20h20" /><path d="M12 12v4" /><rect x="8" y="2" width="8" height="4" rx="1" /></IconBase>;
export const Activity = (props: any) => <IconBase {...props}><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></IconBase>;
export const Layers = (props: any) => <IconBase {...props}><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" /><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" /><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" /></IconBase>;
export const ArrowDown = (props: any) => <IconBase {...props}><line x1="12" x2="12" y1="5" y2="19" /><polyline points="19 12 12 19 5 12" /></IconBase>;
export const Users = (props: any) => <IconBase {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></IconBase>;
export const Zap = (props: any) => <IconBase {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></IconBase>;
export const ShieldCheck = (props: any) => <IconBase {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="m9 12 2 2 4-4" /></IconBase>;
