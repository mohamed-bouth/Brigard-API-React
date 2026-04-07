function PlateFilter(props) {

    

    function filter(e){
        if(e.target.value == ''){
            props.filtredPlate(false , e.target.value)
        }else{
            props.filtredPlate(true , e.target.value)
        }
    }

  return (
    <>
    <div className="mx-auto flex w-full max-w-6xl items-center px-6 py-4">
        <input className="w-full rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200" type="text" placeholder="Search plates" onChange={filter}/>
    </div>
        
    </>
  )
}

export default PlateFilter