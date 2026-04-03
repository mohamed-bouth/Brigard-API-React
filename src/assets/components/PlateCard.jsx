import { Link } from "react-router-dom"
function PlateCard(props) {

  

  return (
    <>
        <div className="border-b p-4" >
            <ul>
                <li>{props.id}</li>
                <li>{props.name}</li>
                <li>{props.price} MAD</li>
                <li>{props.description}</li>
                {props.is_available ? <li className="text-green-600" >disponible</li> : <li className="text-red-600" >non disponible</li>}
                <Link className="bg-green-400 text-white p-1 rounded" to={`/plates/${props.id}`}>voir details</Link>
            </ul>
        </div>
    </>
  )
}

export default PlateCard
