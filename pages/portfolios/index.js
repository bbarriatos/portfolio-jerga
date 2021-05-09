import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import { Row, Col } from 'reactstrap';
import { useRouter } from 'next/router';
import PortfolioApi from '@/lib/api/portfolios';
import PortfolioCard from '@/components/PortfolioCard';
import { useUser } from '@auth0/nextjs-auth0';

const Portfolios = ({ portfolios }) => {
  const router = useRouter();
  const { user, isLoading } = useUser();

  // const renderPortfolios = (portfolios) => {
  //   return portfolios.map((portfolio) => (
  //     <li key={portfolio._id} style={{ fontSize: '20px' }}>
  //       <Link as={`/portfolios/${portfolio._id}`} href="/portfolios/[id]">
  //         <a>{portfolio.title}</a>
  //       </Link>
  //     </li>
  //   ));
  // };

  return (
    <>
      <BaseLayout user={user} loading={isLoading}>
        <BasePage header="Portfolios" className="portfolio-page">
          <Row>
            {portfolios.map((portfolio) => (
              <Col
                key={portfolio._id}
                onClick={() => {
                  router.push(
                    '/portfolios/[id]',
                    `/portfolios/${portfolio._id}`
                  );
                }}
                md="4"
              >
                <PortfolioCard portfolio={portfolio} />
              </Col>
            ))}
          </Row>
        </BasePage>
      </BaseLayout>
    </>
  );
};

// This function is called during the build time
// Improved performance of page,
// It will create static page with dynamic data
export async function getStaticProps() {
  const json = await new PortfolioApi().getAll();
  const portfolios = json.data;
  return {
    props: { portfolios },
  };
}

export default Portfolios;
