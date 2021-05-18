import Header from '@/components/shared/Header';
import { useUser } from '@auth0/nextjs-auth0';
import { ToastContainer } from 'react-toastify';

const BaseLayout = (props) => {
  const { user, error, isLoading } = useUser();
  const { className, navClass = 'with-bg', loading, children } = props;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="layout-container">
      <Header className={navClass} user={user} loading={loading} />
      <main className={`cover ${className}`}>
        <div className="wrapper">{children}</div>
      </main>
      <ToastContainer />
    </div>
  );
};

export async function getServerSideProps({ query }) {
  const json = await new PortfolioApi().getById(query.id);
  const portfolio = json.data;

  return { props: { portfolio } };
}

export default BaseLayout;
