import { FaLinkedin, FaInstagram, FaYoutube, FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

type LinkItem = { label: string; href: string };

const business: LinkItem[] = [
  { label: 'Mission Technologies', href: 'https://www.hii.com/mission-technologies' },
];
const connect: LinkItem[] = [
  { label: 'Contact', href: '/contact' }, //CHANGE THIS PLEASE
];
const addresses = [
  { name: 'Mission Technologies', l1: 'Change Me', l2: 'Honolulu, HI' },
];
const socials = [
  { label: 'linkedin', href: 'https://www.linkedin.com/company/wearehii', Icon: FaLinkedin },
  { label: 'twitter', href: 'https://www.x.com/wearehii', Icon: FaXTwitter },
  { label: 'instagram', href: 'https://www.instagram.com/wearehii', Icon: FaInstagram },
  { label: 'youtube', href: 'https://www.youtube.com/c/HIIYouTube', Icon: FaYoutube },
  { label: 'facebook', href: 'https://www.facebook.com/TeamHII', Icon: FaFacebook },
];

const LinkList = ({ items }: { items: LinkItem[] }) => (
  <div className="hii-links">
    {items.map((l) => (
      <a key={l.href} href={l.href} className="hii-link">{l.label}</a>
    ))}
  </div>
);

const Footer = () => (
  <footer className="hii-footer mt-auto">
    <div className="hii-footer__inner">
      <div className="hii-footer__top">
        <div className="hii-brand">
          <img src={"./logo-full.svg"} alt="HII" width={188} height={84} />
          <p className="hii-tagline">Delivering the Advantage.</p>
        </div>

        <div className="hii-cols">
          <div className="hii-col">
            <p className="hii-label hii-label--lg">About</p>
            <div className="hii-stack">
              <div>
                <LinkList items={business} />
              </div>
            </div>
          </div>

          <div className="hii-col">
            <p className="hii-label hii-label--lg hii-label--gap-top">Connect</p>
            <LinkList items={connect} />
          </div>

          <div className="hii-col hii-col--wide">
            <p className="hii-label hii-label--lg">Addresses</p>
            <div className="hii-addresses">
              {addresses.map((a) => (
                <div key={a.name}>
                  <p className="hii-address">{a.l1}</p>
                  <p className="hii-address">{a.l2}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="hii-footer__bottom">
        <div className="hii-socials">
          {socials.map(({ label, href, Icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
               className="hii-social" aria-label={`Visit our ${label} page`}>
              <Icon size={20} />
            </a>
          ))}
        </div>
        <p className="hii-copy">© {new Date().getFullYear()} HII. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;