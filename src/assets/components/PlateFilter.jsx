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
    <div className="flex bg-gray-100 w-100% h-10 items-center px-4">
        <input className="rounded border border-gray-100 w-150 bg-white" type="text" placeholder="search" onChange={filter}/>
    </div>
        
    </>
  )
}

export default PlateFilter