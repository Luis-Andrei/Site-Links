import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import confetti from 'canvas-confetti';
import { faGithub, faLinkedin, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import LinkCard from './components/LinkCard';
import './styles/style.css';

const LinkCard = ({ href, icon, title, description }) => {
  const handleClick = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <a href={href} className="link-card" onClick={handleClick}>
      <FontAwesomeIcon icon={icon} />
      <span>{title}</span>
      <p>{description}</p>
    </a>
  );
};

function App() {
  const links = [
    {
      href: "https://github.com/Luis-Andrei",
      icon: faGithub,
      title: "GitHub",
      description: "Meus projetos"
    },
    {
      href: "https://www.linkedin.com/in/luis-andrei-258b54212",
      icon: faLinkedin,
      title: "LinkedIn",
      description: "Perfil profissional"
    },
    {
      href: "https://twitter.com/luisand36562626",
      icon: faTwitter,
      title: "Twitter",
      description: "Meus pensamentos"
    },
    {
      href: "https://www.instagram.com/luis_andrei_552/",
      icon: faInstagram,
      title: "Instagram",
      description: "Meus momentos"
    },
    {
      href: "https://card-pio-sooty.vercel.app",
      icon: faUtensils,
      title: "Cardápio",
      description: "Menu digital"
    }
  ];

  return (
    <div className="container">
      <header className="profile">
        <h1>@Luis Andrei</h1>
        <p>Olá! Bem-vindo à minha página de links</p>
      </header>

      <nav className="links" aria-label="Links importantes">
        {links.map((link, index) => (
          <LinkCard
            key={index}
            href={link.href}
            icon={link.icon}
            title={link.title}
            description={link.description}
          />
        ))}
      </nav>

      <footer>
        <p>© 2024 Luis Andrei. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
