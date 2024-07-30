import PrivateDropDown from "./PrivateDropDown";
import ShareDropdown from "./ShareDropdown";
import UsersDropDown from "./UsersDropDown";

export default function InfoList() {
  return (
    <div className="w-4/5 z-50 flex flex-row">
        <h2 className='text-white my-2.5 basis-3/4'>Nombre de la lista</h2>
        <PrivateDropDown />
        <UsersDropDown />
        <ShareDropdown />
    </div>
  )
}
