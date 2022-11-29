import { useAppSelector } from "../api/hooks";

const Home = () => {
    const tokenState = useAppSelector(state => state.token);
    return (
        <div className="home d-flex flex-column justify-content-center">
            <h1>Welcome
            </h1>
            <h2>
                {Object.keys(tokenState.data).length !== 0 &&
                    ` ${tokenState.data.firstName} ${tokenState.data.lastName}`
                }
            </h2>
        </div>
    );
}

export default Home;