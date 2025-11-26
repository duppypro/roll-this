export const TABLE_SIZE = [30, 1, 20] as const; // Width, Height, Depth
export const WALL_HEIGHT = 2;
export const DIE_SIZE = 1.2; // Approximate unit size for dice
export const LIFT_HEIGHT = 5; // Height above table when dragging (approx 4 dice heights)
export const TRAY_DEPTH = 4;
export const TRAY_Z_OFFSET = -8; // Position of the tray relative to center

export const DICE_COLORS = [
  '#e11d48', // Red
  '#2563eb', // Blue
  '#16a34a', // Green
  '#9333ea', // Purple
  '#d97706', // Amber
  '#0891b2', // Cyan
];

export const DICE_TYPES: ('d4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20')[] = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20'];