import { FaPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa';

interface DashboardProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}

const Dashboard: React.FC<DashboardProps> = ({ setCurrentPage }) => {
  return (
    <div className="w-full md:w-1/5 bg-white  flex flex-col items-start justify-start md:h-screen">
      <div className="my-6">
        <h1 className="text-lg font-bold w-full justify-center items-center">
          QRCode Generator
        </h1>
      </div>
      <div className="my-2 w-full px-4">
        <button
          className="flex items-center px-2 py-1 text-sm font-bold text-red hover:text-white hover:bg-red focus:outline-none w-full"
          onClick={() => setCurrentPage('create')}
        >
          <FaPlus className="mr-2" />
          Create QRCode
        </button>
      </div>
      <div className="my-2 w-full px-4">
        <button
          className="flex items-center px-2 py-1 text-sm font-bold text-red hover:text-white hover:bg-red focus:outline-none w-full"
          onClick={() => setCurrentPage('view')}
        >
          <FaEye className="mr-2" />
          View QRCode
        </button>
      </div>
      {/* <div className="my-2 w-full px-4">
        <button
          className="flex items-center px-2 py-1 text-sm font-bold text-red hover:text-white hover:bg-red focus:outline-none w-full"
          onClick={() => setCurrentPage("update")}
        >
          <FaEdit className="mr-2" />
          Update QRCode
        </button>
      </div>
      <div className="my-2 w-full px-4">
        <button
          className="flex items-center px-2 py-1 text-sm font-bold text-red hover:text-white hover:bg-red focus:outline-none w-full"
          onClick={() => setCurrentPage("delete")}
        >
          <FaTrash className="mr-2" />
          Delete QRCode
        </button>
      </div> */}
    </div>
  );
};

export default Dashboard;
