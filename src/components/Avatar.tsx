import { Avatar as MUIAvatar } from '@mui/material';

export function Avatar({ hasBorder = true, src, alt }) {
  const avatarStyle = {
    width: hasBorder ? 'calc(3rem + 12px)' : '3rem',
    height: hasBorder ? 'calc(3rem + 12px)' : '3rem',
    borderRadius: 8, 
    border: hasBorder ? '4px solid grey' : undefined,
    outline: hasBorder ? '2px solid green' : undefined,
  };

  return <MUIAvatar src={src} alt={alt} sx={avatarStyle} />;
}
