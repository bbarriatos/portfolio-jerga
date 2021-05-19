import PortfolioApi from '@/lib/api/portfolios';
import { getAccessToken } from '@auth0/nextjs-auth0';

export default async function handlePortfolio(req, res) {
  if (req.method === 'GET') {
    const json = await new PortfolioApi().getById(req.query.id);
    return res.json(json.data);
  }

  if (req.method === 'PATCH') {
    try {
      const { accessToken } = await getAccessToken(req, res);
      const json = await new PortfolioApi(accessToken).update(
        req.query.id,
        req.body
      );
      return res.json(json.data);
    } catch (e) {
      return res.status(e.status || 422).json(e.response.data);
    }
  }

  if (req.method === 'DELETE') {
    const { accessToken } = await getAccessToken(req, res);
    const json = await new PortfolioApi(accessToken).delete(req.query.id);
    return res.json(json.data);
  }
}
