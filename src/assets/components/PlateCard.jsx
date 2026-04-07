import { Link } from "react-router-dom"
function PlateCard(props) {

  

  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <ul className="space-y-2">
          <li className="text-xs font-semibold uppercase tracking-wider text-gray-400">#{props.id}</li>
          <li className="text-lg font-semibold text-gray-900">{props.name}</li>
          <li className="text-sm font-medium text-emerald-600">{props.price} MAD</li>
          <li className="text-sm text-gray-600">{props.description}</li>
          {props.is_available ? (
            <li className="inline-flex w-fit rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">disponible</li>
          ) : (
            <li className="inline-flex w-fit rounded-full bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-700">non disponible</li>
          )}
          <Link className="mt-2 inline-flex w-fit items-center gap-1 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow hover:bg-emerald-700" to={`/plates/${props.id}`}>
            voir details
          </Link>
        </ul>
      </div>
    </>
  )
}

export default PlateCard
