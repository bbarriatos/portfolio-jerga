import BlogApi from '@/lib/api/blogs';
import { getAccessToken } from '@auth0/nextjs-auth0';

export default async function createBlog(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res);
    const json = await new BlogApi(accessToken).create(req.body);
    return res.json(json.data);
  } catch (e) {
    return res.status(e.status || 422).json(e.response.data);
  }
}
