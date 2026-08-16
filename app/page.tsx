"use client";

import { useEffect, useMemo, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Mail,
  Menu,
  Maximize2,
  MessageCircle,
  MoveRight,
  Quote,
  Sparkles,
  X,
  Instagram,
  Home,
  ClipboardCheck,
} from 'lucide-react';

type GalleryItem = {
  title: string;
  src: string;
  alt: string;
  description: string;
};

const navItems = [
  ['Início', 'hero'],
  ['Sobre', 'sobre'],
  ['Projetos', 'projetos'],
  ['Especialidades', 'especialidades'],
  ['Qualificações', 'qualificacoes'],
  ['Contato', 'contato'],
] as const;

const specialties = [
  { title: 'SketchUp', image: '/especialidades/sketchup.webp', text: 'Modelagem precisa e leitura espacial clara para apresentar intenção com elegância.' },
  { title: 'AutoCAD', image: '/especialidades/autocad.webp', text: 'Documentação técnica precisa para transformar conceito em execução confiável.' },
  { title: 'Enscape', image: '/especialidades/enscape1.webp', text: 'Visualização imersiva para validar atmosfera, materialidade e luz.' },
  { title: 'Photoshop', image: '/especialidades/photoshop.webp', text: 'Pós-produção e composição visual para apresentações refinadas e consistentes.' },
];

const qualifications = [
  { title: 'Designer de Interiores', place: 'School of Lisbon of Design' },
  { title: 'Técnica em Edificações', place: 'SENAI Brasil' },
  { title: 'Desenho Arquitetônico', place: 'SENAI' },
  { title: 'E-commerce e Gestão Comercial', place: 'Formação complementar' },
];

const differentiators = [
  { title: 'Projetos Personalizados', icon: Home, text: 'Cada proposta nasce da rotina, do gosto e da memória do cliente.' },
  { title: 'Criatividade', icon: Sparkles, text: 'Soluções autorais com presença visual e equilíbrio funcional.' },
  { title: 'Planejamento Técnico', icon: ClipboardCheck, text: 'Processo claro, detalhado e seguro em cada etapa do projeto.' },
  { title: 'Atendimento Personalizado', icon: MessageCircle, text: 'Acompanhamento próximo, humano e alinhado ao perfil de cada cliente.' },
];

const projectImages: GalleryItem[] = [
  {
    title: 'Cozinha',
    src: '/projetos/cozinha.webp',
    alt: 'Projeto de cozinha com design de interiores',
    description: 'A cozinha foi pensada como um ambiente funcional, elegante e acolhedor, com soluções que valorizam a circulação, o armazenamento e a integração com a rotina da casa.',
  },
  {
    title: 'Área de serviço',
    src: '/projetos/area-servico.webp',
    alt: 'Projeto de área de serviço planejada',
    description: 'A área de serviço foi organizada para unir praticidade e estética, aproveitando melhor o espaço e mantendo uma linguagem visual limpa e integrada ao projeto.',
  },
  {
    title: 'Banheiro',
    src: '/projetos/banheiro.webp',
    alt: 'Projeto de banheiro sofisticado',
    description: 'O banheiro recebeu uma proposta sofisticada e funcional, com atenção aos revestimentos, iluminação e detalhes que tornam o uso diário mais confortável.',
  },
  {
    title: 'Escada',
    src: '/projetos/escada.webp',
    alt: 'Projeto de escada em ambiente residencial',
    description: 'A escada foi tratada como elemento arquitetônico de destaque, equilibrando circulação, proporção e presença visual dentro do ambiente.',
  },
  {
    title: 'Pia do banheiro',
    src: '/projetos/pia-banheiro.webp',
    alt: 'Detalhe da pia do banheiro planejado',
    description: 'A pia do banheiro valoriza o desenho dos detalhes, combinando funcionalidade, proporção e acabamentos que reforçam a identidade do ambiente.',
  },
  {
    title: 'Sala',
    src: '/projetos/sala2.webp',
    alt: 'Projeto de sala com design de interiores',
    description: 'A sala foi criada para transmitir conforto e sofisticação, com composição equilibrada, boa distribuição dos elementos e uma atmosfera acolhedora para receber e viver.',
  },
];

function scrollToSection(id: string) {
  const target = document.getElementById(id);
  target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function handleActivate(event: ReactKeyboardEvent<HTMLElement>, action: () => void) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    action();
  }
}

function SectionHeading({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <div>
      <div className="eyebrow">
        <span>{eyebrow}</span>
        <span aria-hidden>•</span>
      </div>
      <h2 className="section-title">{title}</h2>
      <div className="section-rule" />
      {lead ? <p className="section-lead">{lead}</p> : null}
    </div>
  );
}

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showWhatsapp, setShowWhatsapp] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showInstagram, setShowInstagram] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const whatsappNumber = '+351 932 284 772';
  const whatsappUrl = 'https://wa.me/351932284772?text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es.';
  const email = 'pamrosat@gmail.com';
  const instagramHandle = '@pamelaroosaa';
  const instagramUrl = 'https://www.instagram.com/pamelaroosaa?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveImage(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const activeProject = useMemo(() => {
    if (activeImage === null) return null;
    return projectImages[activeImage];
  }, [activeImage]);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    window.setTimeout(() => setCopiedEmail(false), 1800);
  };

  const imageThumbLayout = [
    'thumb-wide',
    'thumb-tall',
    'thumb-small',
    'thumb-mid',
    'thumb-small',
    'thumb-wide',
  ];

  return (
    <div className="page">
      <header className={`nav-shell ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container nav">
          <div className="nav-top">
            <button type="button" className="brand button-ghost button" onClick={() => { scrollToSection('hero'); setMobileMenuOpen(false); }} aria-label="Ir para o topo">
              <strong>Pamela Rosa Tardem</strong>
            </button>
            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen((value) => !value)}
              aria-label="Abrir menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu size={22} />
            </button>
          </div>
          <nav className={`nav-links ${mobileMenuOpen ? 'is-open' : ''}`} aria-label="Menu principal">
            {navItems.map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={(event) => { event.preventDefault(); scrollToSection(id); setMobileMenuOpen(false); }}>
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section id="hero" className="hero">
          <div className="hero-media" />
          <div className="hero-inner container">
            <motion.div
              className="hero-copy"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.18 } },
              }}
            >
              <motion.p
                className="hero-kicker"
                variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.7 }}
              >
                portfólio
              </motion.p>
              <motion.h1
                className="hero-name"
                variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.8 }}
              >
                PAMELA ROSA TARDEM
              </motion.h1>
              <motion.p
                className="hero-role"
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.75 }}
              >
                Designer de Interiores
              </motion.p>
              <motion.p
                className="hero-text"
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.75 }}
              >
                Transformando espaços em experiências únicas através do design, da funcionalidade e da sofisticação.
              </motion.p>
              <motion.div
                className="hero-actions"
                variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.75 }}
              >
                <button type="button" className="button button-primary" onClick={() => scrollToSection('projetos')}>
                  Ver Projetos <MoveRight size={16} />
                </button>
                <button type="button" className="button button-ghost" onClick={() => scrollToSection('sobre')}>
                  Conhecer a Pamela
                </button>
              </motion.div>
            </motion.div>
          </div>
          <div className="scroll-indicator" aria-hidden>
            <span />
            Scroll
          </div>
        </section>

        <section id="sobre" className="section">
          <div className="container grid-2">
            <motion.div
              className="panel portrait"
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
            </motion.div>

            <motion.div
              className="about-copy"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7 }}
            >
              <div className="about-heading">
                <SectionHeading eyebrow="Sobre" title="Design com repertório, técnica e sensibilidade." />
              </div>
              <div className="about-text">
                <p>
                  Sou Designer de Interiores, formada pela School of Lisbon of Design, e Técnica em Edificações pelo SENAI Brasil.
                </p>
                <p>
                  Busco unir criatividade, funcionalidade e conhecimento técnico em cada projeto.
                </p>
                <p>
                  Também possuo formação em Desenho Arquitetônico pelo SENAI e em E-commerce e Gestão Comercial, ampliando minha visão sobre planejamento, organização e atendimento ao cliente.
                </p>
                <p>
                  Apaixonada por viagens, encontro na arquitetura e no design de diferentes países inspiração para criar ambientes únicos, funcionais e cheios de personalidade.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="especialidades" className="section">
          <div className="container">
            <SectionHeading
              eyebrow="Especialidades"
              title="Ferramentas que sustentam uma entrega precisa."
              lead="A estética só funciona quando a técnica está resolvida. O processo aqui combina clareza, repertório e execução consistente."
            />
            <div className="cards-4" style={{ marginTop: '2rem' }}>
              {specialties.map(({ title, image, text }, index) => (
                <motion.article
                  key={title}
                  className="panel info-card"
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <div className="specialty-icon">
                    <Image src={image} alt={`Ícone ${title}`} width={44} height={44} />
                  </div>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="qualificacoes" className="section">
          <div className="container grid-2">
            <div>
              <SectionHeading
                eyebrow="Qualificações"
                title="Formação construída para unir visão e rigor."
                lead="Com mais de 10 anos de estudo na área, a trajetória reúne arquitetura, interiores e gestão para oferecer uma experiência mais completa do conceito à entrega."
              />
            </div>
            <div className="timeline">
              {qualifications.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="timeline-item"
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.55, delay: index * 0.07 }}
                >
                  <strong>{item.title}</strong>
                  <span>{item.place}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="projetos" className="section">
          <div className="container project-shell">
            <SectionHeading
              eyebrow="Projetos"
              title="Uma galeria pensada para imagens grandes e presença editorial."
              lead="O primeiro projeto já nasce com a estrutura pronta para crescer: grandes imagens, zoom suave, parallax discreto e lightbox ao clique."
            />

            <motion.article
              className="panel project-feature"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.28 }}
              transition={{ duration: 0.7 }}
            >
              <div
                className="project-image"
                onClick={() => setActiveImage(0)}
                onKeyDown={(event) => handleActivate(event, () => setActiveImage(0))}
                role="button"
              tabIndex={0}
            >
                <Image src={projectImages[0].src} alt={projectImages[0].alt} fill priority sizes="(max-width: 1080px) 100vw, 58vw" />
                <div className="project-overlay" />
              </div>
              <div className="project-copy">
                <div>
                  <div className="eyebrow">
                    <span>Projeto em destaque</span>
                    <span aria-hidden>•</span>
                  </div>
                  <h3>Entre Dois Mundos, Um Só Lar</h3>
                </div>
                <p>
                  Entre Dois Mundos, Um Só Lar é um projeto que explora o encontro entre a cultura brasileira e a portuguesa através do design de interiores.
                </p>
                <p>
                  A proposta transforma referências afetivas, materiais naturais e elementos da arquitetura tradicional em uma linguagem contemporânea, marcada pela simplicidade, pelo conforto e pela sofisticação.
                </p>
                <p>
                  A combinação entre madeira, pedra natural, azulejos, vegetação e uma paleta inspirada nas paisagens dos dois países cria ambientes acolhedores, onde identidade, memória e funcionalidade coexistem de forma equilibrada.
                </p>
                <p>
                  Cada espaço foi concebido para traduzir a história da família, fazendo da casa um lugar de pertencimento e conexão entre origens e novos começos.
                </p>
                <div className="project-stats">
                  <span className="project-stat">Madeira e pedra natural</span>
                  <span className="project-stat">Paleta luso-brasileira</span>
                  <span className="project-stat">Layout afetivo</span>
                </div>
              </div>
            </motion.article>

            <div className="gallery-grid">
              {projectImages.map((image, index) => (
                <motion.div
                  key={image.title}
                  className={`project-thumb ${imageThumbLayout[index]}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.22 }}
                  transition={{ duration: 0.55, delay: index * 0.05 }}
                  onClick={() => setActiveImage(index)}
                  onKeyDown={(event) => handleActivate(event, () => setActiveImage(index))}
                  role="button"
                  tabIndex={0}
                >
                  <Image src={image.src} alt={image.alt} fill sizes="(max-width: 1080px) 100vw, 50vw" />
                  <div className="project-overlay" />
                  <span className="thumb-label">
                    <Maximize2 size={14} /> {image.title}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <SectionHeading
              eyebrow="Diferenciais"
              title="Atendimento e processo que sustentam confiança."
              lead="A base do projeto é técnica; o que o cliente percebe é a calma de um processo bem conduzido."
            />
            <div className="features-grid" style={{ marginTop: '2rem' }}>
              {differentiators.map(({ title, icon: Icon, text }, index) => (
                <motion.article
                  key={title}
                  className="feature-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.55, delay: index * 0.05 }}
                >
                  <Icon size={22} className="feature-icon" />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <SectionHeading
              eyebrow="Depoimentos"
              title="Espaço reservado para provas sociais futuras."
              lead="Estrutura pronta para receber avaliações, com leitura premium e cartões discretos."
            />
            <div className="testimonials-grid" style={{ marginTop: '2rem' }}>
              {['Em breve', 'Em breve', 'Em breve'].map((label, index) => (
                <motion.article
                  key={index}
                  className="testimonial-card"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <div className="quote-mark">
                    <Quote size={16} />
                  </div>
                  <h3>{label}</h3>
                  <p>
                    Este espaço foi preparado para inserir depoimentos reais de clientes, com destaque para experiências e resultados.
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="contato" className="section">
          <div className="container contact-wrap">
            <motion.div
              className="panel contact-panel"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65 }}
            >
              <SectionHeading eyebrow="Contato" title="Vamos transformar seu ambiente?" />
              <p className="section-lead" style={{ marginTop: '1rem' }}>
                Entre em contato para conversar sobre o seu espaço e entender como o projeto pode ganhar forma com sofisticação e clareza.
              </p>
              <div className="contact-links">
                <button type="button" className="contact-link contact-button" onClick={() => setShowWhatsapp((value) => !value)}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem' }}>
                    <MessageCircle size={18} color="#b68d40" /> WhatsApp
                  </span>
                  <ArrowRight size={16} />
                </button>
                {showWhatsapp ? (
                  <div className="email-reveal social-reveal">
                    <span>{whatsappNumber}</span>
                    <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer">
                      Abrir WhatsApp <ArrowRight size={16} />
                    </a>
                  </div>
                ) : null}
                <button type="button" className="contact-link contact-button" onClick={() => setShowInstagram((value) => !value)}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem' }}>
                    <Instagram size={18} color="#b68d40" /> Instagram
                  </span>
                  <ArrowRight size={16} />
                </button>
                {showInstagram ? (
                  <div className="email-reveal social-reveal">
                    <span>{instagramHandle}</span>
                    <a className="button button-primary" href={instagramUrl} target="_blank" rel="noreferrer">
                      Abrir Instagram <ArrowRight size={16} />
                    </a>
                  </div>
                ) : null}
                <button type="button" className="contact-link contact-button" onClick={() => setShowEmail((value) => !value)}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem' }}>
                    <Mail size={18} color="#b68d40" /> E-mail
                  </span>
                  <ArrowRight size={16} />
                </button>
                {showEmail ? (
                  <div className="email-reveal">
                    <span>{email}</span>
                    <button type="button" className="button button-primary" onClick={copyEmail}>
                      {copiedEmail ? <Check size={16} /> : <Copy size={16} />}
                      {copiedEmail ? 'Copiado' : 'Copiar e-mail'}
                    </button>
                  </div>
                ) : null}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <h3 className="section-title" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>Pamela Rosa Tardem</h3>
            <p>Designer de Interiores</p>
            <small>Copyright © {new Date().getFullYear()}</small>
          </div>
          <div>
            <div className="eyebrow">
              <span>Menu rápido</span>
              <span aria-hidden>•</span>
            </div>
            <div className="footer-links" style={{ marginTop: '0.9rem' }}>
              {navItems.map(([label, id]) => (
                <a key={id} href={`#${id}`} onClick={(event) => { event.preventDefault(); scrollToSection(id); }}>
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="eyebrow">
              <span>Contato</span>
              <span aria-hidden>•</span>
            </div>
            <div className="footer-links" style={{ marginTop: '0.9rem' }}>
              <a href={instagramUrl} target="_blank" rel="noreferrer">Instagram</a>
              <a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp</a>
              <a href={`mailto:${email}`}>E-mail</a>
            </div>
          </div>
        </div>
      </footer>

      <a className="floating-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Abrir conversa no WhatsApp">
        <MessageCircle size={22} />
        <span>WhatsApp</span>
      </a>

      <AnimatePresence>
        {activeProject ? (
          <motion.div
            className="modal-backdrop"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
          >
            <motion.div
              className="modal"
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              transition={{ duration: 0.28 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="modal-image">
                <Image src={activeProject.src} alt={activeProject.alt} fill sizes="100vw" />
              </div>
              <div className="modal-copy">
                <button type="button" className="button modal-close" onClick={() => setActiveImage(null)}>
                  Fechar <X size={16} />
                </button>
                <div>
                  <div className="eyebrow">
                    <span>Galeria</span>
                    <span aria-hidden>•</span>
                  </div>
                  <h3>{activeProject.title}</h3>
                </div>
                <p>
                  {activeProject.description}
                </p>
                <p className="subtle-note">Clique fora ou pressione Esc para fechar.</p>
                <div className="modal-nav">
                  <button type="button" className="button button-ghost" onClick={() => setActiveImage((current) => (current === null ? 0 : (current - 1 + projectImages.length) % projectImages.length))}>
                    <ChevronLeft size={16} /> Anterior
                  </button>
                  <button type="button" className="button button-primary" onClick={() => setActiveImage((current) => (current === null ? 0 : (current + 1) % projectImages.length))}>
                    Próxima <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
