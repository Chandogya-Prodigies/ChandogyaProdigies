export type Guide = {
  slug: string;
  name: string;
  role: string;
  category: "team" | "educators" | "partnerships";
  image: string;
  focus: string;
  bio: string;
  strengths: string[];
  quote: string;
};

export const guides: Guide[] = [
  {
    slug: "yamini-sharma",
    name: "Yamini Sharma",
    role: "Learning Lead",
    category: "team",
    image: "/images/img.png",
    focus: "Curriculum guidance, parent communication and learner growth.",
    bio: "Yamini helps shape Chandogya's guided learning experience with a focus on clarity, consistency and meaningful practice. She works closely with learners and families so every child feels supported through the journey.",
    strengths: ["Learner mentorship", "Course planning", "Parent guidance"],
    quote:
      "A child grows best when learning feels structured, personal and full of purpose.",
  },
  {
    slug: "aarav-mehta",
    name: "Aarav Mehta",
    role: "Mentor",
    category: "team",
    image: "/images/guruji.png",
    focus: "Gurukul values, reflective practice and discipline building.",
    bio: "Aarav brings a mentor-first approach to learning, helping students build patience, self-belief and thoughtful habits. His sessions focus on practice, reflection and confidence.",
    strengths: ["Value-based guidance", "Practice circles", "Confidence building"],
    quote:
      "Mentorship is not only teaching; it is helping the learner discover steadiness.",
  },
  {
    slug: "anaya-rao",
    name: "Anaya Rao",
    role: "Program Guide",
    category: "team",
    image: "/images/girl1.png",
    focus: "Skill practice, learner engagement and program support.",
    bio: "Anaya supports learners through interactive activities and structured follow-up. She helps children stay curious while developing communication, teamwork and creative thinking.",
    strengths: ["Student engagement", "Activity design", "Progress support"],
    quote:
      "The right activity can turn hesitation into curiosity and curiosity into confidence.",
  },
  {
    slug: "devika-iyer",
    name: "Devika Iyer",
    role: "Communication Educator",
    category: "educators",
    image: "/images/girl.png",
    focus: "Public speaking, expression practice and learner confidence.",
    bio: "Devika works with students on voice, clarity, storytelling and stage confidence. Her approach is gentle, structured and practice-led so children learn to express ideas with ease.",
    strengths: ["Public speaking", "Storytelling", "Feedback practice"],
    quote:
      "Expression becomes powerful when a child feels heard before being corrected.",
  },
  {
    slug: "rishi-kapoor",
    name: "Rishi Kapoor",
    role: "Critical Thinking Educator",
    category: "educators",
    image: "/images/blog-hero-2.avif",
    focus: "Reasoning, questioning habits and creative problem solving.",
    bio: "Rishi guides learners to ask better questions, compare ideas and solve problems with structure. His sessions help children think beyond memorization.",
    strengths: ["Reasoning", "Problem solving", "Inquiry-led learning"],
    quote:
      "A good question can open more learning than a memorized answer.",
  },
  {
    slug: "gurukul-lab-partners",
    name: "Gurukul Lab Partners",
    role: "Offline Learning Partner",
    category: "partnerships",
    image: "/images/offline.jpg",
    focus: "Workshop spaces, offline practice and activity-based learning.",
    bio: "Our offline partners help create safe, focused spaces where learners can practice skills through workshops, mentor circles and hands-on activities.",
    strengths: ["Offline labs", "Workshop support", "Activity spaces"],
    quote:
      "The right environment helps children turn learning into lived practice.",
  },
  {
    slug: "school-collaboration-team",
    name: "School Collaboration Team",
    role: "Institution Partnership",
    category: "partnerships",
    image: "/images/ai.jpg",
    focus: "School programs, skill modules and institution support.",
    bio: "The collaboration team works with schools and institutions to bring Chandogya's value-rooted skill programs into structured learning environments.",
    strengths: ["School programs", "Skill modules", "Teacher coordination"],
    quote:
      "Partnerships work best when skill learning supports the school's larger vision.",
  },
];

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
