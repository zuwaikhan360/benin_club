import React, { useState } from "react";
import {
  FaCheck,
  FaMinus,
  FaPaperPlane,
  FaPlus,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import FundWallet from "./wallet/FundWallet";
import Modal from "../Modal";
import { currency } from "@/sections/PersonalInfo";
import WithdrawWallet from "./wallet/WithdrawWallet";
import { WalletDataProps } from "./Wallet";
import WalletProfile from "./wallet/WalletProfile";
import { NewsletterDataProps } from "./Newsletter";
import PdfUpload from "../PdfUpload";
import Loading from "../Loading";

interface NewsletterRowProps {
  handleUpdateNewsletterTable: () => void;
  member: NewsletterDataProps;
}
function NewsletterRow({
  handleUpdateNewsletterTable,
  member,
}: NewsletterRowProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalW, setShowModalW] = useState<boolean>(false);
  const [showModalP, setShowModalP] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const onClose = () => {
    setShowModal(false); // <-- update state variable to show modal
    handleUpdateNewsletterTable();
  };

  const onOpen = () => {
    setShowModal(true); // <-- update state variable to show modal
  };

  const onCloseW = () => {
    setShowModalW(false); // <-- update state variable to show modal
    handleUpdateNewsletterTable();
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

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/dashboard/newsletter/${member._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // File uploaded successfully
        setLoading(false);
        handleUpdateNewsletterTable();
      } else {
        // Handle upload error
        const data = await response.json();
        setLoading(false);
      }
    } catch (error) {
      console.error("Error uploading PDF file:", error);
      setLoading(false);
    }
  };

  return (
    <tr key={member._id} className="border-t">
      <td className="py-2 px-4 cursor-pointer" onClick={onOpenP}>
        {member.email}
      </td>
      {/* <td>
        {member.isMember ? (
          <span className="flex items-center gap-4 ml-4">
            <FaCheck className="text-green" /> <span>Yes</span>{" "}
          </span>
        ) : (
          <span className="flex items-center gap-4 ml-4 ">
            <FaTimes className="text-red" />
            <span>No</span>{" "}
          </span>
        )}
      </td> */}
      {/* <td className="py-2 px-4 flex hover:text-red">
        <FaPaperPlane className="cursor-pointer" onClick={onOpen} />
      </td> */}
      <td>
        {loading ? (
          <Loading />
        ) : (
          <FaTrash onClick={handleDelete} className="text-red cursor-pointer" />
        )}{" "}
      </td>

      <Modal isOpen={showModal} onClose={onClose}>
        <div></div>
      </Modal>
    </tr>
  );
}

export default NewsletterRow;
