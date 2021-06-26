import spinner from "../../images/spinner.gif";
function Spinner(){
    return(
        <div>
            <img 
                src={spinner} style={{width: '200px', margin: 'auto', display: 'block'}} 
                alt="Loading..."
            />
        </div>
    );
}

export default Spinner;