export type CourseType = "paid" | "free";

export type Lesson = {
  title: string;
  duration: string;
  summary: string;
};

export type Course = {
  slug: string;
  title: string;
  type: CourseType;
  level: string;
  duration: string;
  hours: string;
  likes: string;
  enrolled: string;
  mentor: string;
  rating: string;
  reviews: string;
  price: string;
  priceAmountPaise?: number;
  category?: string;
  ageGroup?: string;
  difficulty?: string;
  discountLabel?: string;
  previewVideoUrl?: string;
  featured?: boolean;
  image: string;
  description: string;
  lessons: Lesson[];
  notes: string[];
};

export const courses: Course[] = [
  {
    slug: "communication-public-speaking",
    title: "Communication Skills & Public Speaking Masterclass",
    type: "paid",
    level: "Ages 10-16",
    duration: "12 Weeks",
    hours: "45+ hours",
    likes: "1,850+",
    enrolled: "8,430",
    mentor: "Sarah Johnson",
    rating: "4.8",
    reviews: "320 Reviews",
    price: "Premium",
    image: "/images/girl3.png",
    description:
      "Build confident speech, clear expression and stage presence through guided practice, storytelling and structured feedback.",
    lessons: [
      {
        title: "Finding Your Voice",
        duration: "15:20",
        summary: "Understand tone, posture and clarity before speaking.",
      },
      {
        title: "Storytelling Principles",
        duration: "20:10",
        summary: "Shape ideas into engaging stories and short talks.",
      },
      {
        title: "Stage Confidence",
        duration: "18:30",
        summary: "Practice presence, audience connection and calm delivery.",
      },
    ],
    notes: [
      "Speak with clear intent before focusing on perfect words.",
      "Use posture, pauses and eye contact to guide attention.",
      "Confidence grows through repeated, kind and specific feedback.",
    ],
  },
  {
    slug: "creative-critical-thinking",
    title: "Creative & Critical Thinking",
    type: "paid",
    level: "Ages 9-15",
    duration: "10 Weeks",
    hours: "36+ hours",
    likes: "1,920+",
    enrolled: "9,150",
    mentor: "Chandogya Mentor",
    rating: "4.9",
    reviews: "410 Reviews",
    price: "Premium",
    image: "/images/crirical.jpg",
    description:
      "Help learners question deeply, compare ideas and solve problems with structured reasoning and imagination.",
    lessons: [
      {
        title: "How To Ask Better Questions",
        duration: "14:40",
        summary: "Learn the difference between surface and deep questions.",
      },
      {
        title: "Reasoning With Evidence",
        duration: "22:15",
        summary: "Use facts, examples and patterns to support a thought.",
      },
      {
        title: "Creative Problem Solving",
        duration: "19:20",
        summary: "Turn constraints into ideas with practical thinking tools.",
      },
    ],
    notes: [
      "Good thinking begins with observing carefully.",
      "Every opinion becomes stronger when supported by reasons.",
      "Creativity and logic work best when practiced together.",
    ],
  },
  {
    slug: "financial-literacy-for-kids",
    title: "Financial Literacy for Young Learners",
    type: "paid",
    level: "Ages 11-17",
    duration: "8 Weeks",
    hours: "28+ hours",
    likes: "1,450+",
    enrolled: "6,200",
    mentor: "Finance Mentor",
    rating: "4.7",
    reviews: "230 Reviews",
    price: "Premium",
    image: "/images/financial-Planning.jpg",
    description:
      "Introduce money habits, budgeting, saving and decision-making through simple examples and age-friendly practice.",
    lessons: [
      {
        title: "Understanding Money Choices",
        duration: "13:50",
        summary: "Learn wants, needs and everyday money decisions.",
      },
      {
        title: "Saving & Budgeting",
        duration: "21:00",
        summary: "Create a simple budget and track spending habits.",
      },
      {
        title: "Smart Decisions",
        duration: "17:45",
        summary: "Compare options before spending or investing time.",
      },
    ],
    notes: [
      "Money education is really decision education.",
      "Small habits create long-term confidence.",
      "Budgeting teaches clarity, patience and responsibility.",
    ],
  },
  {
    slug: "ai-foundations",
    title: "AI Foundations for Students",
    type: "free",
    level: "Ages 12-18",
    duration: "4 Weeks",
    hours: "12+ hours",
    likes: "980+",
    enrolled: "4,820",
    mentor: "Tech Mentor",
    rating: "4.6",
    reviews: "180 Reviews",
    price: "Free",
    image: "/images/ai.jpg",
    description:
      "A beginner-friendly introduction to AI, prompts, responsible use and how students can learn with modern tools.",
    lessons: [
      {
        title: "What AI Can And Cannot Do",
        duration: "12:30",
        summary: "Understand AI as a tool, not a shortcut for thinking.",
      },
      {
        title: "Prompting Basics",
        duration: "16:20",
        summary: "Write clearer prompts for learning, planning and practice.",
      },
      {
        title: "Responsible AI Habits",
        duration: "15:10",
        summary: "Use AI with honesty, privacy and independent judgment.",
      },
    ],
    notes: [
      "AI works best when the learner knows the goal.",
      "Prompts improve when they include context and constraints.",
      "Responsible use protects originality and confidence.",
    ],
  },
  {
    slug: "offline-gurukul-lab",
    title: "Offline Gurukul Lab Orientation",
    type: "free",
    level: "Parents & Students",
    duration: "2 Weeks",
    hours: "6+ hours",
    likes: "720+",
    enrolled: "2,940",
    mentor: "Chandogya Team",
    rating: "4.8",
    reviews: "145 Reviews",
    price: "Free",
    image: "/images/offline.jpg",
    description:
      "Explore how our offline labs combine mentoring, practice circles and reflection-based learning for deeper growth.",
    lessons: [
      {
        title: "How Gurukul Labs Work",
        duration: "10:50",
        summary: "See the flow of practice, discussion and reflection.",
      },
      {
        title: "Parent & Mentor Roles",
        duration: "14:25",
        summary: "Understand how support continues beyond the session.",
      },
      {
        title: "Choosing The Right Path",
        duration: "12:40",
        summary: "Match a learner's need with the right programme.",
      },
    ],
    notes: [
      "The lab model is based on practice, feedback and reflection.",
      "Parents and mentors create a support system around the learner.",
      "The right course depends on readiness, goals and interests.",
    ],
  },
  {
    slug: "vedic-math-basics",
    title: "Vedic Math Basics",
    type: "free",
    level: "Ages 8-14",
    duration: "5 Weeks",
    hours: "15+ hours",
    likes: "1,110+",
    enrolled: "5,360",
    mentor: "Math Mentor",
    rating: "4.7",
    reviews: "260 Reviews",
    price: "Free",
    image: "/images/kit.jpg",
    description:
      "Learn simple calculation techniques that improve number confidence, speed and pattern recognition.",
    lessons: [
      {
        title: "Number Patterns",
        duration: "11:35",
        summary: "Observe patterns before solving mechanically.",
      },
      {
        title: "Faster Multiplication",
        duration: "18:15",
        summary: "Practice simple Vedic methods for multiplication.",
      },
      {
        title: "Mental Math Practice",
        duration: "16:45",
        summary: "Build accuracy through short daily exercises.",
      },
    ],
    notes: [
      "Math confidence grows when learners see patterns.",
      "Speed should come after accuracy and understanding.",
      "Short practice is better than long, irregular practice.",
    ],
  },
];

export function getCourseBySlug(slug: string) {
  return courses.find((course) => course.slug === slug);
}
