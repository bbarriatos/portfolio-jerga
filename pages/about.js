import Header from '@/components/shared/Header';
import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import { useUser } from '@auth0/nextjs-auth0';

const About = () => {
  const { user, isLoading } = useUser();
  debugger;
  return (
    <>
      <BaseLayout user={user} loading={isLoading}>
        <BasePage>
          <h1>I am about page</h1>
        </BasePage>
      </BaseLayout>
    </>
  );
};

export default About;
