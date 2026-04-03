
import { useNavigate } from "react-router-dom"

function PlateForm(props) {

  
  const navigate = useNavigate()


  function handleClick(e) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)


    const plate = {id: props.tableNextID + 1 , name: formData.get('name') , price: formData.get('price') , description: formData.get('description') , is_available: true}
    props.addPlate(plate);
    props.idCalcul()
    navigate("/home")
  }


  return (
    <>
      <div className="flex justify-center items-center mt-10">
        <form onSubmit={handleClick} className="flex flex-col m-4 p-4 bg-gray-100 rounded w-100">
          <div className="flex flex-col gap-4 py-4">
            <input className="border border-gray-200 pl-4 bg-white rounded" name="name" placeholder="name" type="text"/>
            <input className="border border-gray-200 pl-4 bg-white rounded" name="price" placeholder="price" type="number"/>
            <input className="border border-gray-200 pl-4 bg-white rounded" name="description" placeholder="description" type="text"/>
          </div>
          <button className="bg-green-400 text-white p-1 rounded" type="submit">
            save
          </button>
        </form>
      </div>
    </>
  )
}

export default PlateForm