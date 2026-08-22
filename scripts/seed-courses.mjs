import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const databaseUrl = process.env.DATABASE_URL ?? "file:./prisma/dev.db";
const adapter = new PrismaBetterSqlite3({ url: databaseUrl });
const prisma = new PrismaClient({ adapter });

const courses = [
  {
    slug: "communication-public-speaking",
    title: "Communication Skills & Public Speaking Masterclass",
    type: "paid",
    level: "Ages 10-16",
    duration: "12 Weeks",
    hours: "45+ hours",
    mentor: "Sarah Johnson",
    price: "Premium",
    image: "/images/girl3.png",
    description:
      "Build confident speech, clear expression and stage presence through guided practice, storytelling and structured feedback.",
    lessons: [
      ["Finding Your Voice", "15:20", "Understand tone, posture and clarity before speaking."],
      ["Storytelling Principles", "20:10", "Shape ideas into engaging stories and short talks."],
      ["Stage Confidence", "18:30", "Practice presence, audience connection and calm delivery."],
    ],
  },
  {
    slug: "creative-critical-thinking",
    title: "Creative & Critical Thinking",
    type: "paid",
    level: "Ages 9-15",
    duration: "10 Weeks",
    hours: "36+ hours",
    mentor: "Chandogya Mentor",
    price: "Premium",
    image: "/images/crirical.jpg",
    description:
      "Help learners question deeply, compare ideas and solve problems with structured reasoning and imagination.",
    lessons: [
      ["How To Ask Better Questions", "14:40", "Learn the difference between surface and deep questions."],
      ["Reasoning With Evidence", "22:15", "Use facts, examples and patterns to support a thought."],
      ["Creative Problem Solving", "19:20", "Turn constraints into ideas with practical thinking tools."],
    ],
  },
  {
    slug: "financial-literacy-for-kids",
    title: "Financial Literacy for Young Learners",
    type: "paid",
    level: "Ages 11-17",
    duration: "8 Weeks",
    hours: "28+ hours",
    mentor: "Finance Mentor",
    price: "Premium",
    image: "/images/financial-Planning.jpg",
    description:
      "Introduce money habits, budgeting, saving and decision-making through simple examples and age-friendly practice.",
    lessons: [
      ["Understanding Money Choices", "13:50", "Learn wants, needs and everyday money decisions."],
      ["Saving & Budgeting", "21:00", "Create a simple budget and track spending habits."],
      ["Smart Decisions", "17:45", "Compare options before spending or investing time."],
    ],
  },
  {
    slug: "ai-foundations",
    title: "AI Foundations for Students",
    type: "free",
    level: "Ages 12-18",
    duration: "4 Weeks",
    hours: "12+ hours",
    mentor: "Tech Mentor",
    price: "Free",
    image: "/images/ai.jpg",
    description:
      "A beginner-friendly introduction to AI, prompts, responsible use and how students can learn with modern tools.",
    lessons: [
      ["What AI Can And Cannot Do", "12:30", "Understand AI as a tool, not a shortcut for thinking."],
      ["Prompting Basics", "16:20", "Write clearer prompts for learning, planning and practice."],
      ["Responsible AI Habits", "15:10", "Use AI with honesty, privacy and independent judgment."],
    ],
  },
  {
    slug: "offline-gurukul-lab",
    title: "Offline Gurukul Lab Orientation",
    type: "free",
    level: "Parents & Students",
    duration: "2 Weeks",
    hours: "6+ hours",
    mentor: "Chandogya Team",
    price: "Free",
    image: "/images/offline.jpg",
    description:
      "Explore how our offline labs combine mentoring, practice circles and reflection-based learning for deeper growth.",
    lessons: [
      ["How Gurukul Labs Work", "10:50", "See the flow of practice, discussion and reflection."],
      ["Parent & Mentor Roles", "14:25", "Understand how support continues beyond the session."],
      ["Choosing The Right Path", "12:40", "Match a learner's need with the right programme."],
    ],
  },
  {
    slug: "vedic-math-basics",
    title: "Vedic Math Basics",
    type: "free",
    level: "Ages 8-14",
    duration: "5 Weeks",
    hours: "15+ hours",
    mentor: "Math Mentor",
    price: "Free",
    image: "/images/kit.jpg",
    description:
      "Learn simple calculation techniques that improve number confidence, speed and pattern recognition.",
    lessons: [
      ["Number Patterns", "11:35", "Observe patterns before solving mechanically."],
      ["Faster Multiplication", "18:15", "Practice simple Vedic methods for multiplication."],
      ["Mental Math Practice", "16:45", "Build accuracy through short daily exercises."],
    ],
  },
];

try {
  for (const course of courses) {
    const savedCourse = await prisma.course.upsert({
      where: { slug: course.slug },
      update: {
        title: course.title,
        type: course.type,
        level: course.level,
        duration: course.duration,
        hours: course.hours,
        mentor: course.mentor,
        price: course.price,
        image: course.image,
        description: course.description,
        published: true,
      },
      create: {
        slug: course.slug,
        title: course.title,
        type: course.type,
        level: course.level,
        duration: course.duration,
        hours: course.hours,
        mentor: course.mentor,
        price: course.price,
        image: course.image,
        description: course.description,
        published: true,
      },
    });

    await prisma.courseLesson.deleteMany({
      where: { courseId: savedCourse.id },
    });

    await prisma.courseLesson.createMany({
      data: course.lessons.map(([title, duration, summary], index) => ({
        courseId: savedCourse.id,
        title,
        duration,
        summary,
        sortOrder: index,
      })),
    });
  }

  console.log(`Seeded ${courses.length} courses.`);
} finally {
  await prisma.$disconnect();
}
