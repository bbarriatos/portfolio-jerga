import { useState } from 'react';
import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import { Row, Col, Button } from 'reactstrap';
import { useRouter } from 'next/router';
import PortfolioApi from '@/lib/api/portfolios';
import PortfolioCard from '@/components/PortfolioCard';
import { useUser } from '@auth0/nextjs-auth0';
import { isAuthorized } from '@/utils/auth0';
import { useDeletePortfolio } from '@/actions/portfolios';

const Portfolios = ({ portfolios: initialPortfolios }) => {
  const router = useRouter();
  const [portfolios, setPortfolios] = useState(initialPortfolios);
  const [deletePortfolio, { data, error }] = useDeletePortfolio();
  const { user, isLoading } = useUser();

  const _deletePortfolio = async (e, portfolioId) => {
    e.stopPropagation();
    const isConfirm = confirm(
      'Are you sure you want to delete this portfolio?'
    );
    if (isConfirm) {
      await deletePortfolio(portfolioId);
      setPortfolios(portfolios.filter((p) => p._id !== portfolioId));
    }
  };

  return (
    <>
      <BaseLayout user={user} loading={isLoading}>
        <BasePage
          title="Newest Portfolios - Filip Jerga"
          header="Portfolios"
          className="portfolio-page"
        >
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
                <PortfolioCard portfolio={portfolio}>
                  {user && isAuthorized(user, 'admin') && (
                    <>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(
                            '/portfolios/[id]/edit',
                            `/portfolios/${portfolio._id}/edit`
                          );
                        }}
                        className="mr-2"
                        color="warning"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={(e) => _deletePortfolio(e, portfolio._id)}
                        color="danger"
                      >
                        Delete
                      </Button>{' '}
                    </>
                  )}
                </PortfolioCard>
              </Col>
            ))}
          </Row>
        </BasePage>
      </BaseLayout>
    </>
  );
};

export async function getStaticProps() {
  const json = await new PortfolioApi().getAll();
  const portfolios = json.data;
  return {
    props: { portfolios },
  };
}

export default Portfolios;
