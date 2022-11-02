import { CSSProperties } from "react";
import { DotLoader} from "react-spinners";

const Loading = ({size = 150}) => {
    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "white",
      };

    return (
        <DotLoader cssOverride={override} size={size}/>
    );
}

export default Loading;