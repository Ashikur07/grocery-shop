import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {

    const error = useRouteError();

    return (
        <div className="h-[100vh] items-center flex text-center border justify-center">
            {
                error.status === 404 && <div>
                   
                    <h3 className="text-5xl font-semibold">Page not found....!!!</h3>
                    <p className="py-5 text-2xl font-medium">Go back where you from</p>
                    <Link to="/"><button className="btn btn-primary hover:btn-accent px-6">Home</button></Link>

                </div>
            }
        </div>
    );
};

export default ErrorPage;