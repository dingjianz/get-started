import http from '@utils/http';

/**
 * @param params
 */
// eslint-disable-next-line import/prefer-default-export
export const getGiftInfo = () => {
  return http.get('/cms/page-data/process-new');
};
