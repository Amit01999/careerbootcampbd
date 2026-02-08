import { Sparkles, Brain, BookOpen, Award } from 'lucide-react';

interface CardData {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const cardData: CardData[] = [
  {
    icon: Sparkles,
    title: 'Everything You Need to Succeed',
    description:
      'Comprehensive tools designed by exam toppers and bank officers',
  },
  {
    icon: Brain,
    title: 'AI-Powered Smart MCQ Engine',
    description:
      'Adaptive AI learning that identifies weak areas and generates personalized practice sessions',
  },
  {
    icon: BookOpen,
    title: 'Expert Curated Practice System',
    description:
      '10,000+ MCQs • 500+ Topics • Written mastery with essays, letters, and comprehension strategies',
  },
  {
    icon: Award,
    title: 'Real Exam & Interview Simulation',
    description:
      '200+ Mock Tests • Full-length exam simulations • Viva & interview confidence modules • 1000+ Q&A',
  },
];

export default function CircularCards() {
  return (
    <div className="relative w-full min-h-[700px] lg:min-h-[650px] py-12 px-4">
      {/* Asymmetric background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[15%] left-[10%] w-[300px] h-[300px] rounded-full opacity-40"
          style={{
            background:
              'radial-gradient(circle, hsl(38 92% 50% / 0.06) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-[20%] right-[15%] w-[200px] h-[200px] rounded-full opacity-30"
          style={{
            background:
              'radial-gradient(circle, hsl(220 70% 55% / 0.05) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Bento-style asymmetric grid */}
      <div className="max-w-6xl mx-auto relative">
        {/* Desktop: Diagonal cascade layout */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-6 lg:auto-rows-[180px]">
          {/* Card 1 - Top left, spans 2 rows */}
          <div className="col-span-5 row-span-2 flex items-center">
            <FeatureCard {...cardData[0]} variant="primary" />
          </div>

          {/* Card 2 - Top right, offset down */}
          <div className="col-span-7 row-span-2 flex items-end">
            <FeatureCard {...cardData[1]} variant="secondary" />
          </div>

          {/* Card 3 - Bottom left, offset up */}
          <div className="col-span-6 row-span-2 flex items-start">
            <FeatureCard {...cardData[2]} variant="accent" />
          </div>

          {/* Card 4 - Bottom right */}
          <div className="col-span-6 row-span-2 flex items-center">
            <FeatureCard {...cardData[3]} variant="primary" />
          </div>
        </div>

        {/* Mobile: Staggered vertical layout */}
        <div className="lg:hidden space-y-6">
          <div className="ml-0">
            <FeatureCard {...cardData[0]} variant="primary" />
          </div>
          <div className="ml-8">
            <FeatureCard {...cardData[1]} variant="secondary" />
          </div>
          <div className="ml-4">
            <FeatureCard {...cardData[2]} variant="accent" />
          </div>
          <div className="ml-12">
            <FeatureCard {...cardData[3]} variant="primary" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  variant,
}: CardData & { variant: 'primary' | 'secondary' | 'accent' }) {
  const variantStyles = {
    primary: {
      background:
        'linear-gradient(135deg, hsl(0 0% 100%) 0%, hsl(38 40% 98%) 100%)',
      iconBg:
        'linear-gradient(135deg, hsl(38 92% 55%) 0%, hsl(30 90% 48%) 100%)',
      iconShadow: '0 8px 20px hsl(38 92% 50% / 0.25)',
      borderColor: 'hsl(38 60% 92%)',
    },
    secondary: {
      background:
        'linear-gradient(135deg, hsl(220 60% 98%) 0%, hsl(220 40% 96%) 100%)',
      iconBg:
        'linear-gradient(135deg, hsl(220 70% 55%) 0%, hsl(220 80% 48%) 100%)',
      iconShadow: '0 8px 20px hsl(220 70% 55% / 0.25)',
      borderColor: 'hsl(220 50% 92%)',
    },
    accent: {
      background:
        'linear-gradient(135deg, hsl(280 50% 98%) 0%, hsl(280 40% 96%) 100%)',
      iconBg:
        'linear-gradient(135deg, hsl(280 65% 55%) 0%, hsl(280 70% 48%) 100%)',
      iconShadow: '0 8px 20px hsl(280 65% 55% / 0.25)',
      borderColor: 'hsl(280 45% 92%)',
    },
  };

  const style = variantStyles[variant];

  return (
    <div className="w-full group">
      <div
        className="relative rounded-3xl p-6 lg:p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl border"
        style={{
          background: style.background,
          borderColor: style.borderColor,
          boxShadow: `
            0 1px 3px hsl(220 25% 10% / 0.05),
            0 10px 40px hsl(220 25% 10% / 0.04),
            0 0 0 1px ${style.borderColor}
          `,
        }}
      >
        {/* Decorative corner accent */}
        <div
          className="absolute top-0 right-0 w-24 h-24 opacity-20 rounded-bl-full"
          style={{
            background: style.iconBg,
          }}
        />

        {/* Icon container */}
        <div className="relative mb-5">
          <div
            className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110"
            style={{
              background: style.iconBg,
              boxShadow: style.iconShadow,
            }}
          >
            <Icon className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="relative">
          <h3
            className="text-base lg:text-lg font-bold mb-3 leading-tight tracking-tight"
            style={{
              color: 'hsl(220 40% 12%)',
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            {title}
          </h3>

          <p
            className="text-sm lg:text-[15px] leading-relaxed font-medium"
            style={{
              color: 'hsl(220 15% 40%)',
              lineHeight: '1.7',
            }}
          >
            {description}
          </p>
        </div>

        {/* Subtle hover indicator */}
        <div
          className="absolute bottom-6 right-6 w-2 h-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
          style={{ background: style.iconBg }}
        />
      </div>
    </div>
  );
}
