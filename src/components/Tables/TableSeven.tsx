
import { useState, useEffect } from "react";
import axios from "axios";
import dynamic from 'next/dynamic';

interface Joblisting {
  jobid:number;
  companyid:number;
  role: string;
  title: string;
  city: string;
  country: string;                       
  created_at: Date;
  salary: string;
  application_deadline: string;
  type:string;
  description:string;
  experience_level:string;

}

const TableThree = () => {
  const url = "http://localhost:8000/joblisting";
  const [joblisting, setjoblisting] = useState<Joblisting[]>([]);
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [editedCompanyid, setEditedCompanyid] = useState<number>(0);
  const [editedRole, setEditedRole] = useState("");
  const [editedTitle, setEditedTitle] = useState("");
  const [editedCity, setEditedCity] = useState("");
  const [editedCountry, setEditedCountry] = useState("");
  const [editedCreated_at, setEditedCreated_at] = useState<Date | null>(null);
  const [editedSalary, setEditedSalary] = useState("");
  const [editedApplication_deadline, setEditedApplication_deadline] = useState("");
  const [editedType, setEditedType] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedExperience_level, setEditedExperience_level] = useState("");
   // New states for pop-up
   const [isAddUserPopupOpen, setAddUserPopupOpen] = useState(false);
   const [newUserCompanyid, setNewUserCompanyid] = useState<number>(0);
   const [newUserRole, setNewUserRole] = useState("");
   const [newUserTitle, setNewUserTitle] = useState("");
   const [newUserCity, setNewUserCity] = useState("");
   const [newUserCountry, setNewUserCountry] = useState("");
   const [newUserCreated_at, setNewUserCreated_at] = useState<Date | null>(null);
   const [newUserSalary, setNewUserSalary] = useState("");
   const [newUserApplication_deadline, setNewUserApplication_deadline] = useState("");
   const [newUserType, setNewUserType] = useState("");
   const [newUserDescription, setNewUserDescription] = useState("");
   const [newUserExperience_level, setNewUserExperience_level] = useState("");
  useEffect(() => {
  axios
  .get(url)
  .then((res) => {
  setjoblisting(res.data);
  console.log(res);
  })
  .catch((err) => {
  console.log(err);
  });
  }, []);

  const handleDeleteJoblisting = async (seekerName: number) => {
    try {
      // Make a DELETE request to the server using the name
      await axios.delete(`http://localhost:8000/joblisting/${encodeURIComponent(seekerName)}`);
      // Update the local state to remove the deleted provider
      setjoblisting((prevJoblisting) => prevJoblisting.filter((joblisting) => joblisting.jobid !== seekerName));
    } catch (error) {
      console.error(error);
    }
  };
  const handleEditClick = (index: number) => {
    setEditingRow(index);
   
    setEditedCompanyid(joblisting[index].companyid);
    setEditedRole(joblisting[index].role);
    setEditedTitle(joblisting[index].title);
    setEditedCity(joblisting[index].city);
    setEditedCountry(joblisting[index].country);
    setEditedCreated_at(joblisting[index].created_at);
    setEditedSalary(joblisting[index].salary);
    setEditedApplication_deadline(joblisting[index].application_deadline);
    setEditedType(joblisting[index].type);
    setEditedDescription(joblisting[index].description);
    setEditedExperience_level(joblisting[index].experience_level);
  };

  const handleSaveClick = async (index: number) => {
    // Save the edited data to the server 
    try {
      // Make a PUT request to update the provider data on the server
      await axios.put(`http://localhost:8000/joblisting/${encodeURIComponent(joblisting[index].jobid)}`, {
        
        companyid: editedCompanyid,
        role: editedRole,
        title: editedTitle,
        city: editedCity,
        country: editedCountry,
        created_at: editedCreated_at,
        salary: editedSalary,
        application_deadline: editedApplication_deadline,
        type: editedType,
        description: editedDescription,
        experience_level: editedExperience_level,
      });
  
      // Update the local state with the edited values
      setjoblisting((prevJoblisting) =>
        prevJoblisting.map((joblisting, i) =>
          i === index
            ? {
                ...joblisting,
                companyid: editedCompanyid,
                role: editedRole,
                title: editedTitle,
                city: editedCity,
                country: editedCountry,
                created_at: editedCreated_at as Date,
                salary: editedSalary,
                application_deadline: editedApplication_deadline,
                type: editedType,
                description: editedDescription,
                experience_level: editedExperience_level,
              }
            : joblisting
        )
      );
      
      setEditingRow(null); // Reset editing state after saving
    } catch (error) {
      console.error(error);
    }
  };

// Function to handle opening the pop-up
const handleOpenPopup = () => {
  setAddUserPopupOpen(true);
};

// Function to handle closing the pop-up
const handleClosePopup = () => {
  setAddUserPopupOpen(false);
  // Reset input fields when closing the pop-up
  setNewUserCompanyid(0);
  setNewUserRole("");
  setNewUserTitle("");
  setNewUserCity("");
  setNewUserCountry("");
  setNewUserCreated_at(null);
  setNewUserSalary("");
  setNewUserApplication_deadline("");
  setNewUserType("");
  setNewUserDescription("");
  setNewUserExperience_level("");
};

// Function to handle adding a new user
const handleAddUser = async () => {
  try {
    // Make a POST request to add a new user to the server
    await axios.post("http://localhost:8000/joblisting", {
      companyid:newUserCompanyid,
      role: newUserRole,
      title: newUserTitle,
      city: newUserCity,
      country: newUserCountry,
      created_at: newUserCreated_at,
      salary: newUserSalary,
      application_deadline: newUserApplication_deadline,
      type: newUserType,
      description: newUserDescription,
      experience_level: newUserExperience_level,
    });
    
    // Refresh the list of providers
    const res = await axios.get(url);
    setjoblisting(res.data);

    // Close the pop-up
    handleClosePopup();
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      
      <div className="max-w-full overflow-x-auto">
      <div className="flex justify-between items-center mb-6">
  <h4 className="text-xl font-semibold text-black dark:text-white">
    Job Listing
  </h4>
  <button onClick={handleOpenPopup} className="bg-primary text-white px-4 py-2 rounded">
    Add New Job Offer
  </button>
</div>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
            <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Jobid
              </th>
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                companyid
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                role
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                title
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                City
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                country
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Created At
              </th>
  
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Salary
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Application Deadline
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Type
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Description
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Experience Level
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {joblisting.map((item, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {item.jobid}
                  </h5>
                  
                </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {item.companyid}
                  </h5>
                  
                </td>
               <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
        {editingRow === key ? (
          <input
            type="text"
            value={editedRole}
            onChange={(e) => setEditedRole(e.target.value)}
          />
        ) : (
          <h5 className="font-medium text-black dark:text-white">{item.role}</h5>
        )}
      </td>
      <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
        {editingRow === key ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        ) : (
          <h5 className="font-medium text-black dark:text-white">{item.title}</h5>
        )}
      </td>
      <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
        {editingRow === key ? (
          <input
            type="text"
            value={editedCity}
            onChange={(e) => setEditedCity(e.target.value)}
          />
        ) : (
          <h5 className="font-medium text-black dark:text-white">{item.city}</h5>
        )}
      </td>     
      <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
        {editingRow === key ? (
          <input
            type="text"
            value={editedCountry}
            onChange={(e) => setEditedCountry(e.target.value)}
          />
        ) : (
          <h5 className="font-medium text-black dark:text-white">{item.country}</h5>
        )}
      </td>      
      <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
  {editingRow === key ? (
    

    <input
    type="date" // Assuming you only need the date part
    value={newUserCreated_at ? newUserCreated_at.toISOString().split('T')[0] : ''} // Convert Date to string
    onChange={(e) => setNewUserCreated_at(new Date(e.target.value))}
    className="border p-2 w-full"
  />
  
  ) : (
    <h5 className="font-medium text-black dark:text-white">{item.created_at.toLocaleString()}</h5>
  )}
</td>
<td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
        {editingRow === key ? (
          <input
            type="text"
            value={editedSalary}
            onChange={(e) => setEditedSalary(e.target.value)}
          />
        ) : (
          <h5 className="font-medium text-black dark:text-white">{item.salary}</h5>
        )}
      </td> 
<td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
        {editingRow === key ? (
          <input
            type="text"
            value={editedApplication_deadline}
            onChange={(e) => setEditedApplication_deadline(e.target.value)}
          />
        ) : (
          <h5 className="font-medium text-black dark:text-white">{item.application_deadline}</h5>
        )}
      </td> 
      <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
        {editingRow === key ? (
          <input
            type="text"
            value={editedType}
            onChange={(e) => setEditedType(e.target.value)}
          />
        ) : (
          <h5 className="font-medium text-black dark:text-white">{item.type}</h5>
        )}
      </td>  
      <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
        {editingRow === key ? (
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
        ) : (
          <h5 className="font-medium text-black dark:text-white">{item.description}</h5>
        )}
      </td> 
      <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
        {editingRow === key ? (
          <input
            type="text"
            value={editedExperience_level}
            onChange={(e) => setEditedExperience_level(e.target.value)}
          />
        ) : (
          <h5 className="font-medium text-black dark:text-white">{item.experience_level}</h5>
        )}
      </td> 
{isAddUserPopupOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto" >
            <div className="bg-white p-6 rounded-md shadow-md max-h-[80vh] overflow-y-auto">
              <h2 className="text-lg font-semibold mb-4">Add New Job Offer</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Companyid</label>
                <input
                  type="number"
                  value={newUserCompanyid}
                  onChange={(e) => setNewUserCompanyid(parseInt(e.target.value))}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <input
                  type="text"
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value)}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={newUserTitle}
                  onChange={(e) => setNewUserTitle(e.target.value)}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  value={newUserCity}
                  onChange={(e) => setNewUserCity(e.target.value)}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Country</label>
                <input
                  type="text"
                  value={newUserCountry}
                  onChange={(e) => setNewUserCountry(e.target.value)}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Creation Date</label>
                <input
                type="date" // Assuming you only need the date part
                value={newUserCreated_at ? newUserCreated_at.toISOString().split('T')[0] : ''} // Convert Date to string
                onChange={(e) => setNewUserCreated_at(new Date(e.target.value))}
                className="border p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Salary</label>
                <input
                  type="text"
                  value={newUserSalary}
                  onChange={(e) => setNewUserSalary(e.target.value)}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Application Deadline</label>
                <input
                  type="text"
                  value={newUserApplication_deadline}
                  onChange={(e) => setNewUserApplication_deadline(e.target.value)}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <input
                  type="text"
                  value={newUserType}
                  onChange={(e) => setNewUserType(e.target.value)}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  value={newUserDescription}
                  onChange={(e) => setNewUserDescription(e.target.value)}
                  className="border p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Experience Level</label>
                <input
                  type="text"
                  value={newUserExperience_level}
                  onChange={(e) => setNewUserExperience_level(e.target.value)}
                  className="border p-2 w-full"
                />
              </div>

              <div className="flex justify-end">
                <button onClick={handleClosePopup} className="mr-2 bg-gray-300 px-4 py-2 rounded">
                  Cancel
                </button>
                <button onClick={handleAddUser} className="bg-primary text-white px-4 py-2 rounded">
                  Add Job Offer
                </button>
              </div>
            </div>
          </div>
        )}
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                  {editingRow === key ? (
                      <>
                        <button onClick={() => handleSaveClick(key)} className="hover:text-primary">
                          Save
                        </button>
                        {/* ... (other buttons) */}
                      </>
                    ) : (
                      <button onClick={() => handleEditClick(key)} className="hover:text-primary">
                        {/* Edit icon SVG goes here */}
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                          d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                          fill=""
                        />
                        <path
                          d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                          fill=""
                        />
                      </svg>
                    </button>
                    )}
                    <button className="hover:text-primary" onClick={() => handleDeleteJoblisting(item.jobid)}>
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                          fill=""
                        />
                        <path
                          d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                          fill=""
                        />
                        <path
                          d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                          fill=""
                        />
                        <path
                          d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                          fill=""
                        />
                      </svg>
                    </button>
                    
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(TableThree), {
  ssr: false,
});
