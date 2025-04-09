import ky from 'ky';
import type { Route } from './+types/countries';
import type { Country } from 'common/types/api';
import { Container } from 'components/ui/container';
import { Link, useLoaderData, useRouteLoaderData } from 'react-router';
import { TextField } from 'components/ui/text-field';
import { IconSearch } from 'justd-icons';
import { useState } from 'react';
import { Select } from 'components/ui/select';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'All countries', content: 'Info country database' }];
}

export async function clientLoader(params: Route.ClientLoaderArgs) {
  const result = await ky
    .get('https://restcountries.com/v3.1/all')
    .json<Country[]>();

  return result.sort((a, b) => a.name.common.localeCompare(b.name.common));
}

const searchCountry = (
  countries: Country[],
  str: string,
  filterRegion: string,
) => {
  const regionFilter =
    filterRegion === 'all'
      ? countries ?? []
      : countries?.filter(
          ({ region }) => region.toLowerCase() === filterRegion,
        );

  return regionFilter.filter(
    ({ name, translations }) =>
      name.common.toLowerCase().includes(str.toLowerCase()) ||
      name.official.toLowerCase().includes(str.toLowerCase()) ||
      translations.rus.common.toLowerCase().includes(str.toLowerCase()) ||
      translations.rus.official.toLowerCase().includes(str.toLowerCase()),
  );
};

const regions = [
  { id: 'all', name: 'Все', description: 'Все страны' },
  { id: 'europe', name: 'Европа', description: 'Страны Европы' },
  { id: 'asia', name: 'Азия', description: 'Страны Азии' },
  { id: 'americas', name: 'Америка', description: 'Страны Америки' },
  { id: 'africa', name: 'Африка', description: 'Страны Африки' },
  { id: 'oceania', name: 'Океания', description: 'Страны Океании' },
];

type Key = keyof typeof regions;

const Countries = ({ loaderData }: Route.ComponentProps) => {
  const [search, setSearch] = useState('');
  const [activeRegion, setActiveRegion] = useState('all');

  const searchCounry = searchCountry(loaderData, search, activeRegion);

  const handleSearchChange = (e: string) => setSearch(e);

  return (
    <Container className='w-full h-full flex flex-col gap-3 py-10'>
      <div className='flex w-full justify-between items-center'>
        <h1 className='text-3xl font-bold'>Все страны</h1>
        <div className='flex gap-2'>
          <Select
            placeholder='Выберите регион'
            selectedKey={activeRegion}
            onSelectionChange={(key) => setActiveRegion(key as string)}
            aria-label='select-country-region'
            aria-labelledby='select-country-region'
          >
            <Select.Trigger />
            <Select.List items={regions}>
              {(item) => (
                <Select.Option id={item.id} textValue={item.name}>
                  <Select.OptionDetails
                    label={item.name}
                    description={item.description}
                  />
                </Select.Option>
              )}
            </Select.List>
          </Select>
          <TextField
            placeholder='Найти'
            value={search}
            onChange={handleSearchChange}
            suffix={<IconSearch />}
            style={{ minWidth: 200 }}
          />
        </div>
      </div>
      <ul className='w-full grid grid-cols-3 gap-3 pb-7'>
        {searchCounry.length ? (
          searchCounry.map(
            ({ name, flags, capital, population, region }, key) => (
              <li
                key={key}
                className='p-4 border dark:border-white border-gray-600 rounded-md relative'
              >
                <Link
                  className='flex flex-col gap-1'
                  to={`/countries/${name.common}`}
                >
                  <h3 className='font-bold text-xl'>{name.common}</h3>
                  <p className='text-md text-gray-400 pr-20'>{name.official}</p>
                  <p>
                    Регион: {region} | Население: {population.toLocaleString()}
                  </p>
                  <p>Столица: {capital}</p>
                  <img
                    src={flags.svg}
                    className='border border-gray-500 dark:border-white w-16 h-10 object-cover rounded-md absolute top-4 right-4'
                  />
                </Link>
              </li>
            ),
          )
        ) : (
          <p>Ничего не найдено</p>
        )}
      </ul>
    </Container>
  );
};

export default Countries;
