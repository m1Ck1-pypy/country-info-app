import { IconBrandApple, IconLoader2 } from 'justd-icons';
import { Navbar } from '../components/ui/navbar';
import { NavLink } from 'react-router';
import { Separator } from './ui/separator';
import { ThemeSwitcher } from './theme-switcher';

export default function MyNavbar() {
  const navItems = [
    { name: 'Главная', to: '/' },
    { name: 'Страны', to: '/countries' },
    { name: 'О нас', to: '/about' },
  ];

  return (
    <Navbar>
      <Navbar.Nav>
        <Navbar.Logo className='flex gap-4'>
          <IconLoader2 className='size-6 animate-ping dark:text-[#bdc6f4] text-blue-300' />
          <p className='dark:text-white text-gray-500 text-xl font-bold'>
            Terra<span className='uppercase text-blue-300'>View</span>
          </p>
        </Navbar.Logo>
        <Separator orientation='vertical' className='h-6 sm:mx-1' />
        <Navbar.Section>
          {navItems.map(({ name, to }) => (
            <Navbar.Item key={name}>
              <NavLink
                to={to}
                style={({ isActive }) => ({
                  color: isActive ? 'oklch(80.9% 0.105 251.813)' : '#737375',
                  transition: 'color 0.3s ease-in-out',
                  fontWeight: 'bold',
                })}
              >
                {name}
              </NavLink>
            </Navbar.Item>
          ))}
        </Navbar.Section>
        <Navbar.Section className='ml-auto'>
          <Navbar.Item>
            <ThemeSwitcher />
          </Navbar.Item>
        </Navbar.Section>
      </Navbar.Nav>
    </Navbar>
  );
}
