export const ROUTES = {
  ACCOUNT_DETAILS: '/address/:address',
  CREATE_EVENT: '/events/create',
  DELEGATES: '/delegates',
  EVENT_DETAILS: '/events/:id',
  HOME: '/',
  INITIALISE: '/initialise',
  LOGIN: '/login',
  LOGOUT: '/logout',
  GAMES: '/games',
  SETTINGS: '/settings',
  SUBSCRIPTION: '/subscription',
  TOURNAMENT_PAGE: '/:gameId/tournaments/:id',
  TREASURY: '/treasury',
  TRANSACTION_DETAILS: '/tx/:txId',
  VOTING: '/voting'
};

export const getEventDetailsRoute = (id: string) => {
  return ROUTES.EVENT_DETAILS.replace(':id', id);
};

export const getAccountDetailsRoute = (address: string) => {
  return ROUTES.ACCOUNT_DETAILS.replace(':address', address);
};

export const getTransactionDetailsRoute = (txId: string) => {
  return ROUTES.TRANSACTION_DETAILS.replace(':txId', txId);
};
