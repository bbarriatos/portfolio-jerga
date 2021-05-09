import axios from 'axios';

export function createPortfolio(data) {
  // data = {
  //   company: 'undefined',
  //   companyWebsite: 'undefined',
  //   description: 'undefined',
  //   endDate: 'undefined',
  //   location: 'undefined',
  //   startDate: 'Thu May 27 2021 00:00:00 GMT+0800 (Philippine Standard Time)',
  //   title: 'undefined',
  // };
  console.log('actions', data);
  return axios.post('/api/v1/portfolios', data);
}
