import { useCallback, useEffect, useState } from "react";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import MemberTableRow from "./MemberTableRow";
import { buttonStyle } from "@/constants/styles";
import { IUser } from "@/models/user.model";
import Loading from "../Loading";
import Modal from "../Modal";
import MembershipForm from "./MembershipForm";
import NewMemberTableRow from "./NewMemberTableRow";

interface NewMembersTableProps {}
interface Sorting {
  field: string;
  order: "asc" | "desc";
}

function NewMembersTable({}: NewMembersTableProps): JSX.Element {
  const [filteredMembers, setFilteredMembers] = useState<IUser[]>([]);
  const [members, setMembers] = useState<IUser[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [membersPerPage] = useState<number>(20);
  const [numAdjacentPages] = useState<number>(3);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState(0);
  const [category, setCategory] = useState("all");
  const [error, setError] = useState("");
  const [sorting, setSorting] = useState<Sorting>({
    field: "_id",
    order: "asc",
  });
  const fetchMembers = useCallback(
    async (
      pageNumber: number,
      sort: string,
      order: "asc" | "desc",
      search: string = ""
    ) => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/dashboard/members/new?page=${pageNumber}&pageSize=${membersPerPage}&sort=${sort}&order=${order}&search=${search}`
        );
        if (response.ok) {
          const { members, totalMembers } = await response.json();
          setMembers(members);
          setTotalPages(Math.ceil(totalMembers / membersPerPage));
        } else {
          setError("Encounter an error fetching member");
        }
        setIsLoading(false);
      } catch (error) {
        setError("Encounter an error fetching member");
        console.error(error);
        setIsLoading(false);
      }
    },
    [membersPerPage]
  );

  useEffect(() => {
    fetchMembers(currentPage, sorting.field, sorting.order);
  }, [currentPage, fetchMembers]);

  useEffect(() => {
    fetchMembers(1, sorting.field, sorting.order);
  }, [, fetchMembers, sorting]);

  useEffect(() => {
    setFilteredMembers(members);
  }, [members]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    fetchMembers(1, sorting.field, sorting.order, searchTerm);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handleSorting = (field: string) => {
    const order =
      sorting.field === field && sorting.order === "asc" ? "desc" : "asc";
    setSorting({ field, order });
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    fetchMembers(pageNumber, sorting.field, sorting.order);
  };

  const handleAddMember = () => {
    setShowModal(true); // <-- update state variable to show modal
  };
  const onClose = () => {
    setShowModal(false); // <-- update state variable to show modal
    handleUpdateMemberTable();
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/dashboard/members/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setMembers(members.filter((member) => member._id !== id));
    }
  };
  const handleUpdateMemberTable = async () => {
    fetchMembers(currentPage, sorting.field, sorting.order);
  };

  const isMobile = window.matchMedia("(max-width: 640px)").matches;

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h2 className="text-xl font-bold mb-4 md:mb-0 text-left w-full">
          Members
        </h2>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search members"
            className="border border-gray-200 rounded py-2 px-4 w-full md:w-64 focus:outline-none focus:border-red mb-0 md:ml-4"
            onChange={handleSearch}
          />
          {isMobile ? (
            <div className="bg-red text-white mx-4 p-2 rounded">
              <FiPlus
                className="text-2xl cursor-pointer"
                onClick={handleAddMember}
              />
            </div>
          ) : (
            <button className={`${buttonStyle} mx-4`} onClick={handleAddMember}>
              Add Member
            </button>
          )}
        </div>
      </div>
      <Modal isOpen={showModal} onClose={onClose}>
        <MembershipForm onClose={onClose} />
      </Modal>
      {isLoading ? (
        <div className="w-full justify-center items-center">
          <Loading />
        </div>
      ) : error ? (
        <div className="text-red">{error}</div>
      ) : filteredMembers.length === 0 ? (
        <div className="text-center">No members</div>
      ) : (
        <div className="w-[calc(100vw_-_75px)] md:w-auto text-xs">
          <div className="overflow-x-scroll">
            <table className="w-full border-collapse">
              <Header handleSorting={handleSorting} sorting={sorting} />
              <tbody>
                {filteredMembers.map((member) => (
                  <NewMemberTableRow
                    key={member.id}
                    member={member}
                    onDelete={handleDelete}
                    handleUpdateMemberTable={handleUpdateMemberTable}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <Pagnation
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        numAdjacentPages={numAdjacentPages}
        pageNumbers={pageNumbers}
        totalPages={totalPages}
      />
    </div>
  );
}

export default NewMembersTable;

interface HeaderProps {
  handleSorting: (header: string) => void;
  sorting: Sorting;
}

const Header = ({ handleSorting, sorting }: HeaderProps) => (
  <thead>
    <tr className=" whitespace-nowrap">
      {membersTableHeader.map((header) => (
        <th
          className="py-2 px-4 text-left cursor-pointer"
          onClick={() => handleSorting(header.name)}
          key={header.label}
        >
          {sorting.field === header.name ? (
            <>
              <span>{header.label}</span>
              <span>{sorting.order === "asc" ? "▲" : "▼"}</span>
            </>
          ) : (
            <span>{header.label}</span>
          )}
        </th>
      ))}
    </tr>
  </thead>
);

interface PagnationProps {
  currentPage: number;
  handlePageChange: (v: number) => void;
  numAdjacentPages: number;
  totalPages: number;
  pageNumbers: number[];
}

const Pagnation = ({
  currentPage,
  handlePageChange,
  totalPages,
  numAdjacentPages,
  pageNumbers,
}: PagnationProps) => (
  <div className="flex items-center mt-4">
    <ul className="flex">
      {currentPage > 1 && (
        <li>
          <button
            className="text-red py-2 px-4 rounded"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Prev
          </button>
        </li>
      )}
      {currentPage > numAdjacentPages + 1 && (
        <li>
          <button
            className="text-red py-2 px-4 rounded"
            onClick={() => handlePageChange(1)}
          >
            1
          </button>
        </li>
      )}
      {currentPage > numAdjacentPages + 2 && (
        <li>
          <span className="text-gray-500 py-2 px-4 rounded">...</span>
        </li>
      )}
      {pageNumbers
        .filter(
          (number) =>
            number >= currentPage - numAdjacentPages &&
            number <= currentPage + numAdjacentPages
        )
        .map((number) => (
          <li key={number}>
            <button
              className={`${
                currentPage === number ? "bg-red text-white" : " text-red"
              } py-2 px-4 rounded`}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </button>
          </li>
        ))}
      {currentPage < totalPages - numAdjacentPages - 1 && (
        <li>
          <span className="text-gray-500 py-2 px-4 rounded">...</span>
        </li>
      )}
      {currentPage < totalPages - numAdjacentPages && (
        <li>
          <button
            className="text-red py-2 px-4 rounded"
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        </li>
      )}

      {currentPage < totalPages && (
        <li>
          <button
            className="text-red py-2 px-4 rounded"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </li>
      )}
    </ul>
  </div>
);

const membersTableHeader = [
  { label: "Member ID", name: "memberId" },
  { label: "Member Name", name: "surName" },
  { label: "Category", name: "category" },
  { label: "Subcription Fee Bal.", name: "subcriptionBal" },
  { label: "Email", name: "email" },
  { label: "Phone Number", name: "tel" },
  { label: "Gender", name: "gender" },
  { label: "Step", name: "signupStep" },
  { label: "Actions", name: "_id" },
];
