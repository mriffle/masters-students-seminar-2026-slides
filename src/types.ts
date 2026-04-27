export interface SlideProps {
  isActive: boolean;
  direction: 'forward' | 'backward' | null;
}

export type SlideComponent = React.FC<SlideProps>;
