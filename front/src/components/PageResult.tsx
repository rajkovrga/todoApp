const PageResult = ({message = "Page not found!"}) => {

        return (
            <div>
                <h1>{message}</h1>
            </div>
        );
}

export default PageResult;