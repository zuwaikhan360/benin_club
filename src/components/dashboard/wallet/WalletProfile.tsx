import { FaHistory } from "react-icons/fa";
import { currency } from "@/sections/PersonalInfo";
import { WalletDataProps } from "../Wallet";
import { useEffect, useState } from "react";
import { TransactionData } from "../Transaction";
import moment from "moment";
import Loading from "@/components/Loading";

interface WalletProfileProps {
  wallet: WalletDataProps;
}

const WalletProfile: React.FC<WalletProfileProps> = ({ wallet }) => {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTransactionData();
  }, []);

  const fetchTransactionData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/dashboard/wallets/transactions/${wallet.userId._id}`
      );
      if (!response.ok) {
        throw new Error("Unable to fetch wallet data.");
      }
      const { transactions } = await response.json();
      setTransactions(transactions);
    } catch (error: any) {
      setError(error.message);
      console.log(error);
    }
    setIsLoading(false);
  };

  const handlePrint = () => {
    const printableContent = document.getElementById("printable-content");
    if (printableContent) {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        let content = printableContent.innerHTML;

        const tailwindStyles = Array.from(
          document.getElementsByTagName("style")
        ).map((style) => style.innerHTML);

        printWindow.document.write(
          `<html><head><title> ${wallet.userId.surName} ${wallet.userId.firstName} transation history </title>`
        );

        tailwindStyles.forEach((style) => {
          printWindow.document.write(`<style>${style}</style>`);
        });

        printWindow.document.write("</head><body>");
        printWindow.document.write(content);
        printWindow.document.write("</body></html>");
        printWindow.document.close();
        printWindow.print();
        printWindow.onafterprint = () => {
          printWindow.close();
        };
      } else {
        console.log("Unable to open print window.");
      }
    }
  };

  return (
    <div
      className="bg-white px-8 pt-6 pb-8 mb-4 text-base"
      id="printable-content"
    >
      <div className="flex items-center gap-8 justify-between mb-4">
        <div className="flex items-center">
          <div>
            <div className="font-bold text-gray-900 uppercase">
              {wallet.userId.surName} {wallet.userId.firstName}
            </div>
          </div>
        </div>
        <div className="text-right ml-4">
          <div className="font-bold text-gray-900">
            <span className="mr-1">{currency}</span>
            {wallet.balance.toFixed(2)}
          </div>
          <div className="text-gray-600">Available Balance</div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-2">
            <FaHistory className="text-gray-600" />
          </div>
          <div className="text-gray-600">Transaction History</div>
        </div>
        <button
          className="text-red focus:outline-none "
          id="remove-content"
          onClick={handlePrint}
        >
          Print
        </button>
      </div>
      <div className="mt-4">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <div className="text-red">{error}</div>
        ) : !transactions.length ? (
          <div className="text-center">No subscription history</div>
        ) : (
          <ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <li key={transaction.invoiceId} className="py-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-gray-900">
                      {transaction.description}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {moment(transaction.createdAt).format("h:sa, Do MMM YY")}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">
                      <span
                        className={
                          transaction.type === "credit"
                            ? "text-green"
                            : "text-red"
                        }
                      >
                        {transaction.type === "credit" ? "+" : "-"}
                        <span className="ml-1">
                          {currency}
                          {transaction.amount.toFixed(2)}
                        </span>
                      </span>
                    </div>
                    <div className="text-gray text-xs capitalize">
                      {transaction.type}
                    </div>
                    <div className=" text-sm capitalize">
                      bal: {transaction.bal}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default WalletProfile;
