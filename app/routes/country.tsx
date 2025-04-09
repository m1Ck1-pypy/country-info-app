import ky from 'ky';
import type { Route } from './+types/country';
import type { Country } from 'common/types/api';
import { Container } from 'components/ui/container';

export function meta({ params }: Route.MetaArgs) {
  return [{ title: `Info ${params.countryName}`, content: 'Info country' }];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const country = params.countryName.toLocaleLowerCase();

  try {
    const result = await ky
      .get(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
      .json<Country[]>();

    return result[0];
  } catch (error) {
    console.error('Error fetching country data:', error);
    return null;
  }
}

const Country = ({ loaderData }: Route.ComponentProps) => {
  if (loaderData === null) {
    return (
      <Container>
        Что-то пошло не так, попробуйте перезагрузить страницу
      </Container>
    );
  }

  const handleMapsClick = () => {
    window.open(loaderData.maps.googleMaps, '_blank');
  };

  return (
    <Container className='w-full h-fit flex gap-3 mt-10 py-5 border border-black dark:border-white rounded-2xl'>
      <div className='flex-3/4 flex flex-col gap-7 py-10 '>
        <h1 className='text-6xl font-bold'>
          {loaderData.translations.rus.common || 'N/A'}
        </h1>
        <p className='text-2xl text-gray-500'>
          {loaderData.translations.rus.official || 'N/A'}
        </p>
        <p className='text-xl'>Регион: {loaderData.region || 'N/A'}</p>
        <p className='text-xl'>
          Временная зона: {loaderData.timezones.join(', ') || 'N/A'}
        </p>
        <p className='text-xl'>
          Население: {loaderData.population.toLocaleString() || 'N/A'} человек
        </p>
        <p className='text-xl'>Столица: {loaderData.capital || 'N/A'}</p>
        <p className='text-xl'>FIFA: {loaderData.fifa || 'N/A'}</p>
        <p className='text-md'>
          Google Maps:
          <span
            className='text-blue-300 cursor-pointer'
            onClick={handleMapsClick}
          >
            {' '}
            {loaderData.maps.googleMaps || 'N/A'}
          </span>
        </p>
      </div>
      <div className='flex-1/4'>
        <div className='py-14'>
          <img
            src={loaderData.flags.svg}
            alt='flag'
            className='border border-gray-500 dark:border-white h-full w-full object-cover rounded-md'
          />
        </div>
      </div>
    </Container>
  );
};

export default Country;
