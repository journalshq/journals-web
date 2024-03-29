import { cryptography } from '@liskhq/lisk-client';

const genesisBlockID = Buffer.from(
  'c0d70cea060c9d1c18060e5a83f62be99fdd98ed1a7dc8720c97809e7a54914c',
  'hex'
);
export const networkIdentifier = cryptography.getNetworkIdentifier(
  genesisBlockID,
  'LSK'
);

export const TRANSACTION_COSTS = {
  REGISTER_DELEGATE: 2500000000,
  CREATE_SUBSCRIPTION: 2500000000
};
