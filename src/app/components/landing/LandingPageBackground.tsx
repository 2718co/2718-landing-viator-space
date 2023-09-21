import BackgroundPattern from './BackgroundPattern';
import BracketsBackground from './BracketsBackground';

const LandingPageBackground = () => (
    <div className="absolute inset-0">
        <div className="absolute inset-0">
            <BackgroundPattern />
        </div>
        <BracketsBackground />
    </div>
);

export default LandingPageBackground;
