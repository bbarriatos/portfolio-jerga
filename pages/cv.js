import Header from '@/components/shared/Header';
import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import { useUser } from '@auth0/nextjs-auth0';
import { Row, Col } from 'reactstrap';

const Cv = () => {
  const { user, isLoading } = useUser();

  return (
    <>
      <BaseLayout user={user} loading={isLoading}>
        <BasePage title="My Experiences - Filip Jerga">
          <Row>
            <Col md={{ size: 8, offset: 2 }}>
              <iframe
                style={{ width: '100%', height: '800px' }}
                src="/jerga_cv.pdf"
              />
            </Col>
          </Row>{' '}
        </BasePage>
      </BaseLayout>
    </>
  );
};

export default Cv;
