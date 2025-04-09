import { Container } from 'components/ui/container';

const About = () => {
  return (
    <Container className='py-10 flex flex-col gap-7'>
      <h1 className='text-5xl font-bold'>О нас</h1>
      <p className='text-2xl text-gray-500'>Информация о нас</p>
    </Container>
  );
};

export default About;
