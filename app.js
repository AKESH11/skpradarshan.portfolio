const { useState } = React;
const { createRoot } = ReactDOM;

// Navigation Component
const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gray-800 p-4 sticky top-0 z-50 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold gradient-text">S. K. Pradarshan</div>
                <button 
                    onClick={() => setIsOpen(!isOpen)} 
                    className="md:hidden focus:outline-none"
                >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                        />
                    </svg>
                </button>
                <div className={`md:flex ${isOpen ? 'block' : 'hidden'} md:space-x-6 mt-4 md:mt-0`}>
                    {['Home', 'About', 'Education', 'Skills', 'Achievements', 'Projects', 'Contact'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="block py-2 px-4 text-gray-300 hover:text-blue-400 rounded transition duration-300"
                        >
                            {item}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
};

// Home Component
const Home = () => (
    <section id="home" className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-950 flex items-center justify-center">
        <div className="text-center px-6 fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Hi, I'm S. K. Pradarshan</h1>
            <p className="text-lg md:text-xl mb-6 text-gray-300 slide-up">Aspiring Software Engineer | Full-Stack Developer | Game Development Enthusiast</p>
            <div className="flex justify-center gap-4">
                <a href="#projects" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition scale-hover">Explore My Work</a>
                <a href="./Resume.pdf" download className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition scale-hover">Download Resume</a>
            </div>
        </div>
    </section>
);

// About Component
const About = () => (
    <section id="about" className="py-16 bg-gray-800">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center gradient-text fade-in">About Me</h2>
            <div className="max-w-2xl mx-auto text-center slide-up">
                <p className="text-base md:text-lg text-gray-300 mb-6">
                    I am a Computer Science and Engineering student at SRM Valliammai Engineering College, currently maintaining a CGPA of 8.54. I have hands-on experience with C++, Python, Java, and JavaScript, along with modern web development frameworks like React, Redux, Next.js, Node.js, and Express.js.
                </p>
                <p className="text-base md:text-lg text-gray-300">
                    My portfolio features projects such as a Django-based timetable generator web app and a Telegram safety bot. I have achieved top placements in coding contests, played active roles in organizing collegiate events, and participated in Model United Nations and sports, rounding out my passion for technology with strong leadership and teamwork skills.
                </p>
            </div>
        </div>
    </section>
);

// Education Component
const Education = () => (
    <section id="education" className="py-16 bg-gray-900">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center gradient-text fade-in">Education</h2>
            <div className="max-w-2xl mx-auto grid gap-6">
                {[
                    {
                        degree: 'B.E. Computer Science and Engineering',
                        institution: 'SRM Valliammai Engineering College, Chennai',
                        period: 'Expected Graduation: 2027'
                    },
                    {
                        degree: 'Senior Secondary Education',
                        institution: 'D.T.E.A Senior Secondary School, New Delhi',
                        period: 'Graduation Year: 2022'
                    },
                    {
                        degree: 'Secondary Education',
                        institution: 'Tagore Senior Secondary School, New Delhi',
                        period: 'Graduation Year: 2020'
                    }
                ].map((edu, index) => (
                    <div key={edu.degree} className="bg-gray-800 p-6 rounded-lg shadow-md slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                        <h3 className="text-xl md:text-2xl font-semibold gradient-text">{edu.degree}</h3>
                        <p className="text-base md:text-lg text-gray-300">{edu.institution}</p>
                        <p className="text-base md:text-lg text-gray-300">{edu.period}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

// Skills Component
const Skills = () => {
    const skillCategories = [
        {
            category: 'Programming',
            skills: ['C++', 'Python', 'Java', 'JavaScript']
        },
        {
            category: 'Web Development',
            skills: ['React', 'Redux', 'Next.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'Material-UI']
        },
        {
            category: 'Tools',
            skills: ['Git', 'VS Code', 'Linux', 'Postman']
        }
    ];

    return (
        <section id="skills" className="py-16 bg-gray-900">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center gradient-text fade-in">My Skills</h2>
            <div className="max-w-3xl mx-auto space-y-8">
                {skillCategories.map((category, index) => (
                    <div key={category.category} className="slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                        <h3 className="text-xl md:text-2xl font-semibold text-blue-300 mb-4">{category.category}</h3>
                        <div className="flex flex-wrap gap-2">
                            {category.skills.map(skill => (
                                <span key={skill} className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm scale-hover">{skill}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
    );
};

// Achievements Component
// Achievements Component
const Achievements = () => {
    const achievements = [
        {
            title: 'TechQuest, CIT, Chennai',
            description: 'Secured 1st Place in Coding Quest Contest, demonstrating strong problem-solving and algorithmic skills.',
            link: './techquest.jpg' // <-- TODO: Add link to your certificate
        },
        {
            title: 'BuzzFeed, SRM VEC, Chennai',
            description: 'Secured 3rd Place in Programming Contest organized by Vecoders club.',
            link: './buzzfeed.jpg' // <-- TODO: Add link to your certificate
        },
        {
            title: 'Model United Nations',
            description: 'Secured honorable mentions in MUN UNEA committee organized by MUN Club.',
            link: './mun.jpg' // <-- TODO: Add link to your certificate
        },
        {
            title: 'Sports Involvement',
            description: 'Secured 3rd Place in Inter-House Badminton Tournament.',
            link: './sports.jpg' // <-- TODO: Add link to your certificate
        },
        {
            title: 'Data Fury, SRM VEC, Chennai',
            description: 'Secured 3rd Place in IPL auction analysis (Power BI) organized by Vecoders Club.',
            link: './datafury.jpg' // <-- TODO: Add link to your certificate
        }
    ];

    return (
        <section id="achievements" className="py-16 bg-gray-800">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center gradient-text fade-in">Achievements</h2>
                <div className="max-w-2xl mx-auto grid gap-6">
                    {achievements.map((achievement, index) => (
                        // The entire card is now a link that opens in a new tab
                        <a
                            key={achievement.title}
                            href={achievement.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block bg-gray-800 p-6 rounded-lg shadow-md slide-up scale-hover" // The styling is moved to the <a> tag
                            style={{ animationDelay: `${index * 0.2}s` }}
                        >
                            <h3 className="text-xl md:text-2xl font-semibold gradient-text">{achievement.title}</h3>
                            <p className="text-base md:text-lg text-gray-300">{achievement.description}</p>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Project Card Component
const ProjectCard = ({ title, description, image, tech, link }) => (
    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden scale-hover">
        <img src={image} alt={title} className="w-full h-48 object-cover transition duration-300 group-hover:brightness-105" />
        <div className="p-6">
            <h3 className="text-xl font-bold mb-2 gradient-text">{title}</h3>
            <p className="text-base text-gray-300 mb-4">{description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
                {tech.map((t) => (
                    <span key={t} className="bg-blue-600 text-white px-2 py-1 rounded text-sm">{t}</span>
                ))}
            </div>
            <a href={link} className="text-blue-400 hover:text-blue-300 transition duration-300" target="_blank" rel="noopener noreferrer">View Project</a>
        </div>
    </div>
);

// Projects Component
const Projects = () => {
    const projects = [
        {
          title: 'MCP for Telegram',
            description: 'A robust integration that enables seamless AI-powered messaging and automated chat management on Telegram. Streamlines workflows and provides secure programmatic access through Model Context Protocol.',
            image: './tele1.png',
            tech: ['React', 'JavaScript', 'CSS'],
            link: 'https://github.com/yourusername/personal-blog'  
        },
        {
            title: 'ArtisanConnectAI',
            description: 'A vibrant marketplace platform connecting skilled artisans with global buyers. Designed to empower craftsmanship, promote unique handmade creations, and foster sustainable trade worldwide.',
            image: './artisan.jpg',
            tech: ['React', 'Firebase', 'JavaScript', 'Tailwind CSS'],
            link: 'https://github.com/yourusername/artisanconnectai'
        },
        {
            title: 'Weather predictor',
            description: 'A dynamic weather widget delivering real-time updates and accurate forecasts directly on your home screen. Built to keep users informed and prepared—anytime, anywhere.',
            image: './weather2.png',
            tech: ['html','css','React'],
            link: 'https://github.com/yourusername/task-manager'
        }
    ];

    return (
        <section id="projects" className="py-16 bg-gray-900">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center gradient-text fade-in">My Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <div key={project.title} className="slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                            <ProjectCard {...project} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Contact Component
const Contact = () => (
    <section id="contact" className="py-16 bg-gray-800">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center gradient-text fade-in">Get in Touch</h2>
            <div className="max-w-lg mx-auto slide-up">
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2" htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-white transition duration-300" 
                        placeholder="Your Name" 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2" htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-white transition duration-300" 
                        placeholder="Your Email" 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2" htmlFor="message">Message</label>
                    <textarea 
                        id="message" 
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-white transition duration-300" 
                        rows="5" 
                        placeholder="Your Message"
                    ></textarea>
                </div>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 w-full transition scale-hover">Send Message</button>
                <div className="flex justify-center gap-6 mt-6">
                    <a href="https://github.com/AKESH11" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition scale-hover">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12c0 4.41 2.86 8.14 6.84 9.47.5.09.68-.22.68-.49v-1.73c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.12-1.47-1.12-1.47-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.26.1-2.63 0 0 .84-.27 2.75 1.03A9.564 9.564 0 0112 6.8c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855v2.764c0 .271.18.514.682.475A10.005 10.005 0 0022 12c0-5.52-4.48-10-10-10z" />
                        </svg>
                    </a>
                    <a href="https://www.linkedin.com/in/s-k-pradarshan-1b05b2290" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition scale-hover">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.13 1.44-2.13 2.93v5.67H9.35V9.01h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.28zM5.34 7.45c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zm1.78 13h-3.56V9.01h3.56v11.44zM22 0H2C.9 0 0 .9 0 2v20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2z" />
                        </svg>
                    </a>
                </div>
            </div>
            <p className="text-center text-gray-400 mt-8">© 2025 - All Rights Reserved.</p>
        </div>
    </section>
);

// Main App Component
const App = () => (
    <div>
        <NavBar />
        <Home />
        <About />
        <Education />
        <Skills />
        <Achievements />
        <Projects />
        <Contact />
    </div>
);

// Render the app using createRoot
const root = createRoot(document.getElementById('root'));
root.render(<App />);