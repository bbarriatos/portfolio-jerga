import PortfolioApi from '@/lib/api/portfolios';
// import auth0 from '@/utils/auth0';

export default async function createPortfolio(req, res) {
  try {
    const data = req.body;
    console.log('api/v1', data);
    await new PortfolioApi().createPortfolio();
    return res.json({ message: 'Portfolio was created!' });
  } catch (e) {
    return res.status(e.status || 400).end(e.message);
  }
}
