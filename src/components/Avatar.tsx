import { Avatar as MUIAvatar, SxProps } from '@mui/material';
import React from 'react';

interface AvatarProps {
  hasBorder?: boolean;
  src: string;
  alt: string;
  sx?: SxProps; 
  children?: React.ReactNode; 
}

// Componente Avatar
export function Avatar({ hasBorder = true, src, alt, sx, children }: AvatarProps) {
  const avatarStyle: SxProps = {
    width: hasBorder ? 'calc(3rem + 12px)' : '3rem',
    height: hasBorder ? 'calc(3rem + 12px)' : '3rem',
    borderRadius: 8, 
    border: hasBorder ? '4px solid grey' : undefined,
    outline: hasBorder ? '2px solid green' : undefined,
    ...sx, 
  };

  return <MUIAvatar src={src} alt={alt} sx={avatarStyle}>{children}</MUIAvatar>;
}
