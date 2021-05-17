import PortfolioApi from '@/lib/api/portfolios';
import { getAccessToken } from '@auth0/nextjs-auth0';

export default async function createPortfolio(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res);
    const json = await new PortfolioApi(accessToken).createPortfolio(req.body);
    return res.json(json.data);
  } catch (e) {
    return res.status(e.status || 422).json(e.response.data);
  }
}
