import spinner from "../../images/spinner.gif";
function Spinner(){
    console.log(spinner);
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