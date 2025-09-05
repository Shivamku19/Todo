function Item1(){
    return(
        <div className="container">
             <div className="row kg-row">
          <div className="col-6">
            <input type="text" className="todo" placeholder="Enter Todo Here" />
          </div>
          <div className="col-4">
            <input type="date" className="inputdate" />
          </div>
          <div className="col-2">
            <button type="button" className="btn btn-success btns ">
              Add
            </button>
          </div>
          </div>
        </div>
       

    )
};
export default Item1;