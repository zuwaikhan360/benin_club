import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import FundWallet from "./wallet/FundWallet";
import Modal from "../Modal";
import { currency } from "@/sections/PersonalInfo";
import WithdrawWallet from "./wallet/WithdrawWallet";
import { WalletDataProps } from "./Wallet";
import WalletProfile from "./wallet/WalletProfile";

interface WalletRowProps {
  handleUpdateWalletTable: () => void;
  member: WalletDataProps;
}
function WalletRow({ handleUpdateWalletTable, member }: WalletRowProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalW, setShowModalW] = useState<boolean>(false);
  const [showModalP, setShowModalP] = useState<boolean>(false);

  const onClose = () => {
    setShowModal(false); // <-- update state variable to show modal
    handleUpdateWalletTable();
  };

  const onOpen = () => {
    setShowModal(true); // <-- update state variable to show modal
  };

  const onCloseW = () => {
    setShowModalW(false); // <-- update state variable to show modal
    handleUpdateWalletTable();
  };

  const onOpenW = () => {
    setShowModalW(true); // <-- update state variable to show modal
  };

  const onCloseP = () => {
    setShowModalP(false); // <-- update state variable to show modal
  };

  const onOpenP = () => {
    setShowModalP(true); // <-- update state variable to show modal
  };

  return (
    <tr key={member._id} className="border-t">
      <td className="py-2 px-4 cursor-pointer" onClick={onOpenP}>
        {member.userId?.surName} {member.userId?.firstName}
      </td>
      <td
        className={`py-2 px-4 ${
          member.balance > 0
            ? "text-green"
            : member.balance < 0
            ? "text-red"
            : ""
        }`}
      >
        {currency}
        {member.balance}
      </td>
      <td className="py-2 px-4 flex">
        <FaPlus className="mr-3 cursor-pointer" onClick={onOpen} />
        <FaMinus className="cursor-pointer" onClick={onOpenW} />
      </td>

      <Modal isOpen={showModal} onClose={onClose}>
        <FundWallet onClose={onClose} member={member} />
      </Modal>

      <Modal isOpen={showModalW} onClose={onCloseW}>
        <WithdrawWallet onClose={onCloseW} member={member} />
      </Modal>

      <Modal isOpen={showModalP} onClose={onCloseP}>
        <WalletProfile wallet={member} />
      </Modal>
    </tr>
  );
}

export default WalletRow;
