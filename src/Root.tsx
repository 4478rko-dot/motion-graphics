import {Composition} from 'remotion';
import {Ayah} from './Ayah';

export const Root: React.FC = () => (
  <Composition
    id="Ayah"
    component={Ayah}
    durationInFrames={300}
    fps={30}
    width={1080}
    height={1920}
    defaultProps={{
      words: ['أَلَا', 'بِذِكْرِ', 'اللَّهِ', 'تَطْمَئِنُّ', 'الْقُلُوبُ'],
      reference: '﴿ الرعد: ٢٨ ﴾',
    }}
  />
);
