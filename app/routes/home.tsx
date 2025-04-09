import { Container } from 'components/ui/container';
import type { Route } from './+types/home';
import { Link } from 'react-router';
import { IconArrowRight } from 'justd-icons';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'TerraView' },
    {
      name: 'Search country and Enjoy Read!',
      content: 'Info country database',
    },
  ];
}

export default function Home() {
  return (
    <Container className='h-full'>
      <div className='w-full h-full'>
        <div className='w-full h-full flex lg:flex-row flex-col justify-center items-center gap-10'>
          <div className='flex flex-1/2 flex-col gap-10 pt-30 lg:pt-0'>
            <h1 className='text-5xl leading-18'>
              <span>Взгляд на планету 🌍: </span>
              <span className='dark:text-blue-300 text-blue-400 font-bold'>
                исследуй мир онлайн 🖥️!
              </span>
            </h1>
            <p className='text-gray-500 text-2xl text-ellipsis'>
              Подробный справочник по странам мира с акцентом на актуальные
              данные и интересные факты. Исследуйте мир с нами.
            </p>
            <div className='flex gap-3'>
              <Link
                to='/countries'
                className='flex items-center p-3 dark:bg-blue-400 bg-blue-300 rounded-md w-fit'
              >
                <p className='text-black'>Посмотреть страны</p>
                <IconArrowRight className='ml-2 text-black' />
              </Link>

              <Link
                to='/about'
                className='flex items-center p-3 dark:bg-white bg-blue-200 rounded-md w-fit'
              >
                <p className='text-gray-500'>Узнать больше о нас</p>
              </Link>
            </div>
          </div>
          <div className='flex-1/2'>
            <div className='grid grid-rows-2 gap-2.5 h-full max-h-130'>
              <div className='grid grid-cols-2 gap-2.5'>
                <div className='bg-white overflow-hidden border dark:border-white border-black rounded-2xl animate-left-image'>
                  <img
                    src='https://frontenacarchbiosphere.ca/wp-content/uploads/2023/02/young-friends-with-backpacks-enjoying-view-traveling-canyon-2048x1367.jpg'
                    alt=''
                    className='w-full h-full'
                  />
                </div>
                <div className='bg-white overflow-hidden border dark:dark:border-white border-black rounded-2xl animate-right-image'>
                  <img
                    src='https://24minus.ru/800/600/https/caianomundo-prod.imgix.net/2015/02/mitos.jpg?fit=scale&fm=pjpg&h=683&ixlib=php-1.2.1&w=1024&wpsize=large'
                    alt=''
                    className='w-full h-full'
                  />
                </div>
              </div>
              <div className='bg-white overflow-hidden border dark:border-white border-black rounded-2xl animate-bottom-image'>
                <img
                  src='https://turkistan.citypass.kz/wp-content/uploads/banner13.jpg'
                  alt=''
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
