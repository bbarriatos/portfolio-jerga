import Header from '@/components/shared/Header';
import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import { useUser } from '@auth0/nextjs-auth0';

const Blogs = () => {
  const { user, isLoading } = useUser();

  return (
    <>
      <Header />
      <BaseLayout user={user} loading={isLoading}>
        <h1>I am blogs page</h1>
        <BasePage>
          <h1>I am blogs page</h1>
        </BasePage>
      </BaseLayout>
    </>
  );
};

export default Blogs;
