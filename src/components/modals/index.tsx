import { FC } from 'react';
import { TransferModal } from 'src/components/modals/TransferModal';
import { AccessDeniedModal } from 'src/components/modals/AccessDeniedModal';
import { Modal } from 'antd';
import { RegisterUsernameModal } from './RegisterUsernameModal';
import { TxConfirmAndProcessModal } from './TxConfirmAndProcessModal';
import { PublishToEventModal } from './PublishToEventModal';
import { useWallet } from '@lisk-react/use-lisk';
import { ActiveModalContext } from '../../typings';

export enum ModalType {
  ACCESS_DENIED = 'ACCESS_DENIED',
  CONTRIBUTE_TO_EVENT = 'CONTRIBUTE_TO_EVENT',
  REGISTER_USERNAME = 'REGISTER_USERNAME',
  TRANSACTION_CONFIRM = 'TRANSACTION_CONFIRM',
  TRANSFER = 'TRANSFER'
}

export type TransferProps = {
  from: string;
  to: string;
};

export type ContributeToEventProps = {
  eventId: string;
};

export type TxConfirmationProps = {
  transaction: Record<string, unknown>;
  transactionCost: number;
};

export type DataProps = TransferProps | TxConfirmationProps;

export type ModalProps<T = {}> = {
  onSubmit?(transaction?: Record<string, any>): void;
  close?(): void;
  shouldBeAuthenticated?: boolean;
  data?: T;
};

export interface Props {
  isOpen: boolean;
  activeModal: ActiveModalContext;
  close(): void;
}

const modals = {
  [ModalType.TRANSFER]: TransferModal,
  [ModalType.ACCESS_DENIED]: AccessDeniedModal,
  [ModalType.CONTRIBUTE_TO_EVENT]: PublishToEventModal,
  [ModalType.REGISTER_USERNAME]: RegisterUsernameModal,
  [ModalType.TRANSACTION_CONFIRM]: TxConfirmAndProcessModal
};

export const UniversalModal: FC<Props> = ({ close, activeModal, isOpen }) => {
  const { isAuthenticated } = useWallet();

  if (!activeModal || !activeModal?.modalType) return <></>;
  const ActiveModal =
    activeModal?.data?.shouldBeAuthenticated && !isAuthenticated
      ? modals[ModalType.ACCESS_DENIED]
      : modals[activeModal.modalType];
  return (
    <Modal
      footer={null}
      bodyStyle={{ padding: 0, margin: 0 }}
      onCancel={close}
      visible={isOpen}>
      <ActiveModal {...(activeModal.data as any)} close={close} />
    </Modal>
  );
};
