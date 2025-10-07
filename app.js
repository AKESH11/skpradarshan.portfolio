import { Experimental_CssVarsProvider } from "@mui/material";

const { useState, useEffect, useRef } = React;
const { createRoot } = ReactDOM;

const BackgroundCanvas = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let time = 0;

        const orbs = [
            { x: 0.5, y: 0.5, speedX: 0.0005, speedY: 0.0007, size: 0.8, color: 'rgba(255, 255, 255, 0.15)' }, // Soft White
            { x: 0.3, y: 0.7, speedX: -0.0006, speedY: 0.0005, size: 0.6, color: 'rgba(168, 85, 247, 0.15)' }, // Soft Purple
            { x: 0.7, y: 0.3, speedX: 0.0007, speedY: -0.0006, size: 0.7, color: 'rgba(255, 255, 255, 0.1)' } // Faint White
        ];

        const animate = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            time += 0.002;

            orbs.forEach(orb => {
                let newX = (Math.sin(time * orb.speedX * 1000) + 1) / 2;
                let newY = (Math.cos(time * orb.speedY * 1000) + 1) / 2;

                orb.x = newX;
                orb.y = newY;

                const gradient = ctx.createRadialGradient(
                    orb.x * canvas.width,
                    orb.y * canvas.height,
                    0,
                    orb.x * canvas.width,
                    orb.y * canvas.height,
                    orb.size * Math.min(canvas.width, canvas.height)
                );

                gradient.addColorStop(0, orb.color);
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
        };

        window.addEventListener('resize', handleResize);
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="background-canvas"></canvas>;
};


const useTypingEffect = (text, speed = 80) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        if (!text) return;
        setDisplayedText('');
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(prev => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, speed);

        return () => clearInterval(typingInterval);
    }, [text, speed]);

    return displayedText;
};

const useOnScreen = (options) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, options]);

    return [ref, isVisible];
};


const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`p-4 sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'navbar-scrolled' : 'bg-transparent'}`}>
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
                <div className={`absolute md:relative top-full left-0 w-full md:w-auto bg-black/80 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none rounded-b-lg md:rounded-none transition-all duration-300 ease-in-out md:flex md:space-x-6 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 md:opacity-100 md:max-h-full'} overflow-hidden md:overflow-visible`}>
                    {['Home', 'About', 'Education', 'Experience', 'Skills', 'Achievements', 'Projects', 'Contact'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            onClick={() => setIsOpen(false)}
                            className="block py-3 px-5 md:py-2 md:px-4 text-gray-300 hover:text-blue-400 rounded transition duration-300"
                        >
                            {item}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
};

const Home = () => {
    const typedTitle = useTypingEffect("  Hi, I'm S. K. Pradarshan", 80);
    const [downloadStatus, setDownloadStatus] = useState('');

    const handleDownload = () => {
        setDownloadStatus('Downloading...');

        const link = document.createElement('a');
        link.href = './Resume.pdf';
        link.setAttribute('download', 'SKP_Resume.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setTimeout(() => {
            setDownloadStatus('Downloaded!');
            setTimeout(() => setDownloadStatus(''), 3000);
        }, 2000);
    };

    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative">
            <div className="text-center px-6 z-10">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text h-20 md:h-16 flex items-center justify-center">
                    <span>{typedTitle}</span>
                    <span className="inline-block w-1 h-10 md:h-12 bg-white animate-ping ml-2 opacity-75"></span>
                </h1>
                <p className="text-lg md:text-xl mb-6 text-gray-300 reveal visible" style={{ transitionDelay: '3s' }}>
                    Aspiring Software Engineer | Full-Stack Developer | Game Development Enthusiast
                </p>
                <div className="flex justify-center gap-4 reveal visible" style={{ transitionDelay: '3.2s' }}>
                    <a href="#projects" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition scale-hover">Explore My Work</a>
                    <button 
                        onClick={handleDownload}
                        className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition scale-hover"
                    >
                        Download Resume
                    </button>
                </div>
                {downloadStatus && (
                    <p className="text-gray-400 text-sm mt-4 transition-opacity duration-300">
                        {downloadStatus}
                    </p>
                )}
            </div>
        </section>
    );
};


const Section = ({ id, title, children, className = '' }) => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
    return (
        <section id={id} className={`py-16 relative z-10 ${className}`}>
            <div ref={ref} className={`container mx-auto px-6 reveal ${isVisible ? 'visible' : ''}`}>
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center gradient-text">{title}</h2>
                {children}
            </div>
        </section>
    );
};


const About = () => (
    <Section id="about" title="About Me" className="bg-transparent">
        <div className="max-w-2xl mx-auto text-center bg-black/30 backdrop-blur-sm border border-white/10 p-8 rounded-lg shadow-lg">
            <p className="text-base md:text-lg text-gray-300 mb-6">
                I am a Computer Science and Engineering student at SRM Valliammai Engineering College, currently maintaining a CGPA of 8.54. I have hands-on experience with C++, Python, Java, and JavaScript, along with modern web development frameworks like React, Redux, Next.js, Node.js, and Express.js.
            </p>
            <p className="text-base md:text-lg text-gray-300">
                My portfolio features projects such as a Django-based timetable generator web app and a Telegram safety bot. I have achieved top placements in coding contests, played active roles in organizing collegiate events, and participated in Model United Nations and sports, rounding out my passion for technology with strong leadership and teamwork skills.
            </p>
        </div>
    </Section>
);

const Education = () => {
    const educations = [
        { degree: 'B.E. Computer Science and Engineering', institution: 'SRM Valliammai Engineering College, Chennai', period: 'Expected Graduation: 2027' },
        { degree: 'Senior Secondary Education', institution: 'D.T.E.A Senior Secondary School, New Delhi', period: 'Graduation Year: 2022' },
        { degree: 'Secondary Education', institution: 'Tagore Senior Secondary School, New Delhi', period: 'Graduation Year: 2020' }
    ];
    return (
        <Section id="education" title="Education" className="bg-transparent">
            <div className="max-w-2xl mx-auto grid gap-6">
                {educations.map((edu, index) => {
                    const [ref, isVisible] = useOnScreen({ threshold: 0.2 });
                    return (
                        <div key={edu.degree} ref={ref} className={`bg-black/30 backdrop-blur-sm border border-white/10 p-6 rounded-lg shadow-lg reveal ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: `${index * 200}ms` }}>
                            <h3 className="text-xl md:text-2xl font-semibold gradient-text">{edu.degree}</h3>
                            <p className="text-base md:text-lg text-gray-300">{edu.institution}</p>
                            <p className="text-base md:text-lg text-gray-300">{edu.period}</p>
                        </div>
                    );
                })}
            </div>
        </Section>
    );
};

const Experience = () => {
    const experiences = [
        {
            role: 'Research & Development Intern',
            company: 'Bibliotech',
            period: 'Summer 2025',
            description: 'As a Research & Development Intern, I assisted the R&D team by creating testing models and optimizing code for `focsem` autofocus and `powerfocus` systems. My contributions included managing Python Package Index (PIP) distributions, supporting senior staff with experimental model creation, and authoring technical documentation for internal tools and research findings.'
        },
        {
            role: 'Event Organizer',
            company: 'CodeRizz Club',
            period: 'College Tenure',
            description: 'Co-organized 5+ technical events, including coding contests and workshops, for over 200 participants. I was responsible for managing logistics, promotions, and overall coordination to ensure successful execution of all events.'
        }
    ];
    return (
        <Section id="experience" title="Experience" className="bg-transparent">
            <div className="max-w-2xl mx-auto grid gap-8">
                {experiences.map((exp, index) => {
                    const [ref, isVisible] = useOnScreen({ threshold: 0.2 });
                    return (
                        <div key={exp.role} ref={ref} className={`bg-black/30 backdrop-blur-sm border border-white/10 p-6 rounded-lg shadow-lg reveal ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: `${index * 200}ms` }}>
                            <div className="flex justify-between items-baseline">
                                <h3 className="text-xl md:text-2xl font-semibold gradient-text">{exp.role}</h3>
                                <p className="text-sm text-gray-400">{exp.period}</p>
                            </div>
                            <p className="text-base font-medium text-gray-300 mb-3">{exp.company}</p>
                            <p className="text-base text-gray-400">{exp.description}</p>
                        </div>
                    );
                })}
            </div>
        </Section>
    );
};

const Skills = () => {
    const skillCategories = [
        { category: 'Programming', skills: ['C++', 'Python', 'Java', 'JavaScript'] },
        { category: 'Web Development', skills: ['React', 'Redux', 'Next.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'Material-UI'] },
        { category: 'Tools', skills: ['Git', 'VS Code', 'Linux', 'Postman', 'PowerBI'] }
    ];
    return (
        <Section id="skills" title="My Skills" className="bg-transparent">
            <div className="max-w-3xl mx-auto space-y-8">
                {skillCategories.map((category, index) => {
                    const [ref, isVisible] = useOnScreen({ threshold: 0.2 });
                    return (
                        <div key={category.category} ref={ref} className={`bg-black/30 backdrop-blur-sm border border-white/10 p-6 rounded-lg shadow-lg reveal ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: `${index * 200}ms` }}>
                            <h3 className="text-xl md:text-2xl font-semibold text-blue-300 mb-4">{category.category}</h3>
                            <div className="flex flex-wrap gap-3">
                                {category.skills.map(skill => (
                                    <span key={skill} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm scale-hover transition">{skill}</span>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </Section>
    );
};


const AchievementItem = ({ achievement, isExpanded, onToggle }) => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.2 });
    const handleImageError = (e) => {
        e.target.onerror = null; 
        e.target.src = "https://placehold.co/800x600/1e293b/94a3b8?text=Certificate+Not+Found";
        console.error(`Error loading image. Path tried: ${achievement.link}`);
    };
    return (
        <div ref={ref} className={`bg-black/30 backdrop-blur-sm border border-white/10 p-6 rounded-lg shadow-lg reveal ${isVisible ? 'visible' : ''}`}>
            <h3 className="text-xl md:text-2xl font-semibold gradient-text">{achievement.title}</h3>
            <p className="text-base md:text-lg text-gray-300 mt-2 mb-4">{achievement.description}</p>
            <button
                onClick={onToggle}
                className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-300 px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-500/20 hover:text-blue-200 transition-all duration-300 scale-hover"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                {isExpanded ? 'Hide Certificate' : 'Show Certificate'}
            </button>
            <div className={`grid transition-all duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    <img 
                        src={achievement.link} 
                        alt={`${achievement.title} Certificate`} 
                        className="w-full h-auto rounded-lg shadow-md border border-gray-700" 
                        loading="lazy"
                        onError={handleImageError}
                    />
                </div>
            </div>
        </div>
    );
};


const Achievements = () => {
    const achievements = [
        { title: 'AlgoRift, Sairam, Chennai', description: 'Placed first in the Algorift coding competition at Sai Ram College', link: './Certificates/algo.jpg'},
        { title: 'TechQuest, CIT, Chennai', description: 'Secured 1st Place in Coding Quest Contest.', link: './Certificates/techquest.png' },
        { title: 'BuzzFeed, SRM VEC, Chennai', description: 'Secured 3rd Place in Programming Contest.', link: './Certificates/buzzfeed.png' },
        { title: 'Model United Nations', description: 'Secured honorable mentions in MUN UNEA committee.', link: './Certificates/mun.png' },
        { title: 'Sports Involvement', description: 'Secured 3rd Place in Inter-House Badminton Tournament.', link: './Certificates/sports.png' },
        { title: 'Data Fury, SRM VEC, Chennai', description: 'Secured 3rd Place in IPL auction analysis (Power BI).', link: './Certificates/datafury.png' }
    ];
    const [expandedAchievement, setExpandedAchievement] = useState(null);
    const handleToggle = (title) => {
        setExpandedAchievement(prev => (prev === title ? null : title));
    };
    return (
        <Section id="achievements" title="Achievements" className="bg-transparent">
            <div className="max-w-2xl mx-auto grid gap-6">
                {achievements.map((achievement) => (
                    <AchievementItem
                        key={achievement.title}
                        achievement={achievement}
                        isExpanded={expandedAchievement === achievement.title}
                        onToggle={() => handleToggle(achievement.title)}
                    />
                ))}
            </div>
        </Section>
    );
};

const ProjectCard = ({ title, description, image, tech, link }) => (
    <div className="bg-black/30 backdrop-blur-sm border border-white/10 p-6 rounded-lg shadow-lg h-full flex flex-col">
        <div className="overflow-hidden rounded-lg mb-4">
            <img src={image} alt={title} className="w-full h-48 object-cover project-card-image" />
        </div>
        <div className="flex flex-col flex-grow">
            <h3 className="text-xl font-bold mb-2 gradient-text">{title}</h3>
            <p className="text-base text-gray-300 mb-4 flex-grow">{description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
                {tech.map((t) => (
                    <span key={t} className="bg-blue-600 text-white px-2 py-1 rounded text-sm">{t}</span>
                ))}
            </div>
            <a href={link} className="text-blue-400 hover:text-blue-300 transition duration-300 self-start mt-auto" target="_blank" rel="noopener noreferrer">View Project &rarr;</a>
        </div>
    </div>
);


const Projects = () => {
    const projects = [
        { title: 'CatchTheSqaure', description: 'Catch the Square is a fast-paced web game where you click moving squares to score points.', image: './catchthesquare.png', tech: ['React', 'JavaScript', 'CSS'], link: 'https://akesh11.github.io/CatchTheSquare/' },
        { title: 'ArtisanConnectAI', description: 'A vibrant marketplace platform connecting skilled artisans with global buyers.', image: './artisan.jpg', tech: ['React', 'Firebase', 'Tailwind CSS'], link: 'https://akesh11.github.io/ArtisanConnectAI/' },
        { title: 'Weather predictor', description: 'A dynamic weather widget delivering real-time updates and accurate forecasts.', image: './weather2.png', tech: ['HTML', 'CSS', 'React'], link: 'https://akesh11.github.io/weather.widget/' },
        { title: 'Echo Check', description: 'Check out whether the news u heard is true or not!!', image: './EchoCheck.png', tech: ['HTML', 'CSS', 'React'], link: 'https://akesh11.github.io/EchoCheck/' }
    ];

    const extendedProjects = [...projects, ...projects];

    return (
        <Section id="projects" title="My Projects" className="bg-transparent">
            <div className="scrolling-wrapper">
                <div className="scrolling-content">
                    {extendedProjects.map((project, index) => {
                        const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
                        return (
                            <div 
                                key={`${project.title}-${index}`} 
                                ref={ref} 
                                className={`flex-shrink-0 w-80 md:w-96 reveal ${isVisible ? 'visible' : ''}`} 
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <ProjectCard {...project} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </Section>
    );
};

const Contact = () => {
    const FORM_ENDPOINT = "https://formspree.io/f/xnnzopvv"; 
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        if (!formData.name || !formData.email || !formData.message) {
            setStatus('Please fill out all fields.');
            return;
        }
        setIsSubmitting(true);
        setStatus('Sending...');
        fetch(FORM_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                setStatus('Message sent successfully!');
                setFormData({ name: '', email: '', message: '' }); 
                setTimeout(() => setStatus(''), 5000); 
            } else {
                return response.json().then(data => {
                    if (data.hasOwnProperty('errors')) {
                        setStatus(data.errors.map(error => error.message).join(", "));
                    } else {
                        setStatus('Oops! There was a problem submitting your form.');
                    }
                });
            }
        })
        .catch(error => {
            setStatus('Oops! There was a problem submitting your form.');
        })
        .finally(() => {
            setIsSubmitting(false);
        });
    };

    return (
        <Section id="contact" title="Get in Touch">
            <div className="max-w-lg mx-auto bg-black/30 backdrop-blur-sm border border-white/10 p-8 rounded-lg shadow-lg">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2" htmlFor="name">Name</label>
                        <input 
                            type="text" id="name" name="name"
                            value={formData.name} onChange={handleChange}
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition duration-300" 
                            placeholder="Your Name" required 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2" htmlFor="email">Email</label>
                        <input 
                            type="email" id="email" name="email" 
                            value={formData.email} onChange={handleChange}
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition duration-300" 
                            placeholder="Your Email" required 
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-300 mb-2" htmlFor="message">Message</label>
                        <textarea 
                            id="message" name="message" 
                            value={formData.message} onChange={handleChange}
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition duration-300" 
                            rows="5" placeholder="Your Message" required
                        ></textarea>
                    </div>
                    <button 
                        type="submit" disabled={isSubmitting}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 w-full transition scale-hover disabled:bg-gray-500 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                    {status && <p className="text-center text-gray-300 mt-4">{status}</p>}
                </form>
                <div className="flex justify-center gap-6 mt-8">
                    <a href="https://github.com/AKESH11" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition scale-hover"><svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.41 2.86 8.14 6.84 9.47.5.09.68-.22.68-.49v-1.73c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.12-1.47-1.12-1.47-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.26.1-2.63 0 0 .84-.27 2.75 1.03A9.564 9.564 0 0112 6.8c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855v2.764c0 .271.18.514.682.475A10.005 10.005 0 0022 12c0-5.52-4.48-10-10-10z" /></svg></a>
                    <a href="https://www.linkedin.com/in/s-k-pradarshan-1b05b2290" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition scale-hover"><svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.13 1.44-2.13 2.93v5.67H9.35V9.01h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.28zM5.34 7.45c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zm1.78 13h-3.56V9.01h3.56v11.44zM22 0H2C.g9 0 0 .9 0 2v20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2z" /></svg></a>
                </div>
            </div>
        </Section>
    );
};


const App = () => (
    <div>
        <BackgroundCanvas />
        <NavBar />
        <main>
            <Home />
            <About />
            <Education />
            <Experimence />
            <Skills />
            <Achievements />
            <Projects />
            <Contact />
        </main>
    </div>
);

const root = createRoot(document.getElementById('root'));
root.render(<App />);