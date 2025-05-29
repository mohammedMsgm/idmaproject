import { Heart } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = 'h-8 w-8' }) => {
  return (
    <div className={`${className} rounded-full bg-primary-500 flex items-center justify-center text-white`}>
      <Heart className="h-1/2 w-1/2" />
    </div>
  );
};

export default Logo;