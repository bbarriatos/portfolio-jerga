import BaseLayout from '@/components/layouts/BaseLayout';
import BasePage from '@/components/BasePage';
import Masthead from '@/components/shared/Masthead';
import { Row, Col } from 'reactstrap';
import BlogItem from '@/components/BlogItem';
import BlogApi from '@/lib/api/blogs';
import { useUser } from '@auth0/nextjs-auth0';

const Blogs = ({ blogs }) => {
  const { user, isLoading } = useUser();

  return (
    <BaseLayout
      navClass="transparent"
      className="blog-listing-page"
      user={user}
      loading={isLoading}
    >
      <Masthead imagePath="/images/home-bg.jpg">
        <h1>Fresh Blogs</h1>
        <span className="subheading">Programming, travelling...</span>
      </Masthead>
      <BasePage title="Newest Blogs - Filip Jerga" className="blog-body">
        <Row>
          {blogs.map((blog) => (
            <Col key={blog._id} md="10" lg="8" className="mx-auto">
              <BlogItem blog={blog} />
              <hr></hr>
            </Col>
          ))}
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export async function getStaticProps() {
  const { data } = await new BlogApi().getAll();
  const blogs = data.map((item) => ({ ...item.blog, author: item.author }));
  return {
    props: { blogs },
    revalidate: 60,
  };
}

export default Blogs;
