export type DieType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20';

export interface DieConfig {
  id: string;
  type: DieType;
  position: [number, number, number];
  color: string;
}

export interface DragState {
  isDragging: boolean;
  dieId: string | null;
}
