import './courses.css';

/**
 * Course data with links to official NCERT textbooks.
 * All NCERT materials are © NCERT and provided here via official URLs.
 * No content is hosted or modified.
 */

const courses = [
  {
    id: 1,
    title: 'Mathematics',
    description: 'Learn the fundamentals of mathematics including arithmetic, geometry, and basic algebra.',
    ncertLink: 'https://ncert.nic.in/textbook.php?keps1=0'
  },
  {
    id: 2,
    title: 'Science',
    description: 'Introduction to basic scientific concepts including physics, chemistry, biology, and environmental studies.',
    ncertLink: 'https://ncert.nic.in/textbook.php?keps2=0'
  },
  {
    id: 3,
    title: 'Social Science',
    description: 'Explore the history, geography, and civics of India and the world.',
    ncertLink: 'https://ncert.nic.in/textbook.php?keps3=0'
  },
  {
    id: 4,
    title: 'Hindi',
    description: 'Learn the basics of the Hindi language including grammar, vocabulary, and simple writing.',
    ncertLink: 'https://ncert.nic.in/textbook.php?keps4=0'
  },
  {
    id: 5,
    title: 'English',
    description: 'Improve English language skills with a focus on reading, writing, and vocabulary building.',
    ncertLink: 'https://ncert.nic.in/textbook.php?keps5=0'
  },
  {
    id: 6,
    title: 'Environmental Studies',
    description: 'Learn about the environment, natural resources, and how to protect our planet.',
    ncertLink: 'https://ncert.nic.in/textbook.php?keps6=0'
  },
  {
    id: 7,
    title: 'Art and Craft',
    description: 'Develop creativity through drawing, painting, and craft activities.',
    ncertLink: 'https://ncert.nic.in/textbook.php?keps7=0'
  },
  {
    id: 8,
    title: 'Physical Education',
    description: 'Engage in physical activities that promote health, fitness, and teamwork.',
    ncertLink: 'https://ncert.nic.in/textbook.php?keps8=0'
  },
  {
    id: 9,
    title: 'Computer Science',
    description: 'Introduction to computers, basic coding, and understanding technology.',
    ncertLink: 'https://ncert.nic.in/textbook.php?keps9=0'
  },
  {
    id: 10,
    title: 'Moral Science',
    description: 'Learn values, ethics, and moral teachings to promote good character and social responsibility.',
    ncertLink: 'https://ncert.nic.in/textbook.php?keps10=0'
  }
];

export const getCourses = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(courses), 1000);
  });
};
