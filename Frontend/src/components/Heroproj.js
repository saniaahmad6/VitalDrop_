import "./HeroprojStyles.css"

function Heroproj(props) {

    return (

        <div className="hero-img" style={{ backgroundImage: `url(${props.image})`, backgroundSize: "cover" }}>
            <div className="heading">
                <h1>
                    {props.heading}
                </h1>
                <p>
                    {props.text}
                </p>
                <div className="text-center">
                    {props.children}
                </div>
            </div>
        </div>

    );

}

export default Heroproj;