import PrivateDropDown from "./PrivateDropDown";
import ShareDropdown from "./ShareDropdown";
import UsersDropDown from "./UsersDropDown";

export default function InfoList({ listCode, listName }) {
  const listUrl = typeof window !== 'undefined' ? `${window.location.origin}/list/${listCode}` : '';

  return (
    <div className="w-4/5 z-50 flex flex-row mb-2 justify-between">
        <h2 className='text-white my-2.5 basis-3/4'>{listName}</h2>
        <PrivateDropDown />
        <UsersDropDown />
        <ShareDropdown listCode={listCode} listUrl={listUrl} />
    </div>
  )
}