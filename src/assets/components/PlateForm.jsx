
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PlatesContext } from "../context/platesContext";

function PlateForm() {

  const navigate = useNavigate()
  const { addPlate } = useContext(PlatesContext)


  function handleClick(e) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const plate = {
      name: formData.get('name'),
      price: formData.get('price'),
      description: formData.get('description'),
      is_available: true,
    }
    addPlate(plate)
    navigate("/home")
  }


  return (
    <>
      <div className="mx-auto flex max-w-3xl justify-center px-6 py-10">
        <form onSubmit={handleClick} className="flex w-full flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
          <div className="flex flex-col gap-4">
            <input className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200" name="name" placeholder="Plate name" type="text"/>
            <input className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200" name="price" placeholder="Price" type="number"/>
            <input className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200" name="description" placeholder="Short description" type="text"/>
          </div>
          <button className="w-full rounded-xl bg-emerald-600 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700" type="submit">
            Save
          </button>
        </form>
      </div>
    </>
  )
}

export default PlateForm